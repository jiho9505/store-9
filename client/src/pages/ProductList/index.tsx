import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ItemLists from '@/components/common/ItemLists/ItemLists';
import ItemFilterBar from '@/components/ProductList/ItemFilterBar';
import Loading from '@/components/common/Loading';

import RefreshStore from '@/stores/RefreshStore';
import datas from '@/dummy';
import { normalContainerWidth } from '@/static/style/common';
import { getQueryStringValue } from '@/utils/getQueryStringValue';

/**
 * TODO:
 * @params productFilter
 * 필터의 인덱스로 key value 매칭을 통해
 * 변환 후 인자로 넣어 보낸다.
 * 컨트롤러에 대부분 있어서 Filter 간단할듯?
 *
 * TODO:
 * api를 이용해 데이터 호출
 * categoryId , pagenation , filter , intersectionObserver 고려
 */

type ProductSortBy = 'RECOMMEND' | 'BEST' | 'NEW' | 'LOW_PRICE' | 'HIGH_PRICE';
const sortByObj = {
  0: 'RECOMMEND',
  1: 'BEST',
  2: 'NEW',
  3: 'LOW_PRICE',
  4: 'HIGH_PRICE',
};
const size = 20;

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
    categoryId: getQueryStringValue('categoryId'),
    searchQuery: getQueryStringValue('word'),
  };

  /**
   * TODO:
   * api 요청
   * getQueryStringValue('categoryId'), getQueryStringValue('word')에 빈값 넣을 시
   * redirect 시켜야할듯 (에러처리)
   */
  useEffect(() => {
    setProduct(datas);
    setTotalProductCount(datas.length);
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
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.id === 'end') {
          setIsLoading(true);
          setTimeout(() => {
            const newProduct = [...product, ...datas];
            setProduct(newProduct);
            setIsLoading(false);
          }, 2000);
          /*
            const data = await ProductApi.getList(filter);
            if (data.success) {
              if (data.length > 0) {
                setPage(page+1)
                setProduct([...product,...data])
              } else {
                setIsActiveInfiniteScroll(false)
              }
            } else {
            	alert(data.message);
            }
             setIsLoading(false);
            */
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
