import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ItemLists from '@/components/common/ItemLists/ItemLists';
import ItemFilterBar from '@/components/ProductList/ItemFilterBar';
import Loading from '@/components/common/Loading';

import RefreshStore from '@/stores/RefreshStore';
import { normalContainerWidth } from '@/static/style/common';
import { getQueryStringValue } from '@/utils/getQueryStringValue';
import ProductApi from '@/apis/ProductApi';

type ProductSortBy = 'RECOMMEND' | 'BEST' | 'NEW' | 'LOW_PRICE' | 'HIGH_PRICE';
const sortByObj = {
  0: 'RECOMMEND',
  1: 'BEST',
  2: 'NEW',
  3: 'LOW_PRICE',
  4: 'HIGH_PRICE',
};
const size = 20;
const alertMsg = '상품 목록을 가져오는데 실패하였습니다';

const ProductList = () => {
  const [sortBy, setSortBy] = useState<ProductSortBy>('RECOMMEND');
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActiveInfiniteScroll, setIsActiveInfiniteScroll] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const { refreshComponent } = RefreshStore;

  const filter = {
    page,
    size,
    sortBy,
    categoryId: Number(getQueryStringValue('categoryId')),
    search: getQueryStringValue('word'),
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductApi.getList(filter);
        if (result.ok) {
          setProduct(result.data.products);
          setTotalProductCount(result.data.totalCount);
        }
      } catch (e) {
        alert(alertMsg);
      }
    })();

    setIsActiveInfiniteScroll(true);
    setPage(0);
  }, [refreshComponent, sortBy]);

  useEffect(() => {
    setSortBy('RECOMMEND');
  }, [refreshComponent]);

  const handleFilter = (index: string) => {
    setSortBy(sortByObj[index]);
  };

  const observeTag = () => {
    if (!isActiveInfiniteScroll) return;
    const observerCallback = (entries, observer) => {
      entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.id === 'end') {
          try {
            setIsLoading(true);
            const result = await ProductApi.getList(filter);
            if (result.ok) {
              if (result.data.products.length > 0) {
                setPage(page + 1);
                setProduct([...product, ...result.data.products]);
              } else {
                setIsActiveInfiniteScroll(false);
              }
            }
          } catch (e) {
            alert(alertMsg);
          } finally {
            setIsLoading(false);
          }
        }
        observer.unobserve(entry.target);
      });
    };
    const items = document.querySelectorAll('.item');
    const observer = new IntersectionObserver(observerCallback);
    items.forEach((item) => observer.observe(item));
  };

  return (
    <WholeContainer>
      <ElementContainer>
        <ItemFilterBar
          handleFilter={handleFilter}
          totalProductCount={totalProductCount}
        ></ItemFilterBar>
        <ItemLists observeTag={observeTag} products={product}></ItemLists>
        {isLoading && <Loading size="small" />}
      </ElementContainer>
    </WholeContainer>
  );
};

export default observer(ProductList);

const WholeContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ElementContainer = styled.div`
  width: ${normalContainerWidth};
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
