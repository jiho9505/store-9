import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ItemLists from '@/components/common/ItemLists/ItemLists';
import ItemFilterBar from '@/components/ProductList/ItemFilterBar';
import Loading from '@/components/common/Loading';

import RefreshStore from '@/stores/RefreshStore';
import { normalContainerWidth } from '@/static/style/common';
import { getQueryStringValue } from '@/utils/getQueryStringValue';
import ProductApi from '@/apis/ProductApi';

const sortByObj = {
  0: 'RECOMMEND',
  1: 'BEST',
  2: 'NEW',
  3: 'HIGH_PRICE',
  4: 'LOW_PRICE',
};
const size = 8;

const ProductList = () => {
  const [sortByIdx, setSortByIdx] = useState<number>(0);
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const { refreshComponent } = RefreshStore;
  const filter = {
    page,
    size,
    sortBy: sortByObj[sortByIdx],
    categoryId: Number(getQueryStringValue('categoryId')),
    search: getQueryStringValue('word'),
  };

  useEffect(() => {
    (async () => {
      try {
        filter.page = 0;
        setPage(0);
        const result = await ProductApi.getList(filter);
        if (result.ok) {
          setProduct(result.data.products);
          setTotalProductCount(result.data.totalCount);
          setPage(1);
        }
      } catch (e) {
        alert(e.response.data.message);
      }
    })();
  }, [refreshComponent, sortByIdx]);

  useEffect(() => {
    setSortByIdx(0);
  }, [refreshComponent]);

  useEffect(() => {
    if (page > 0) observeTag();
  }, [page]);

  const handleFilter = (index: number) => {
    setSortByIdx(index);
  };

  const observerCallback = useCallback(
    (entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          try {
            setIsLoading(true);
            const result = await ProductApi.getList(filter);
            if (result.ok) {
              if (result.data.products.length > 0) {
                setProduct([...product, ...result.data.products]);
                setPage(page + 1);
              }
            }
          } catch (e) {
            alert(e.response.data.message);
          } finally {
            setIsLoading(false);
            observer.unobserve(entry.target);
          }
        }
      });
    },
    [page]
  );

  const observeTag = useCallback(() => {
    const options = {
      rootMargin: '250px',
      threshold: 0.5,
    };
    const target = document.querySelector('#end');
    const observer = new IntersectionObserver(observerCallback, options);
    observer.observe(target);
  }, [page]);

  return (
    <WholeContainer>
      <ElementContainer>
        <ItemFilterBar
          handleFilter={handleFilter}
          totalProductCount={totalProductCount}
          sortByIdx={sortByIdx}
        ></ItemFilterBar>
        <ItemLists products={product}></ItemLists>
        {isLoading && <Loading size="small" />}
      </ElementContainer>
    </WholeContainer>
  );
};

export default observer(ProductList);

const WholeContainer = styled.div`
  width: 100vw;
  min-height: 1200px;
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
