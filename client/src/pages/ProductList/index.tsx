import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ItemLists from '@/components/common/ItemLists/ItemLists';
import ItemFilterBar from '@/components/ProductList/ItemFilterBar';
import Loading from '@/components/common/Loading';

import RefreshStore from '@/stores/RefreshStore';
import datas from '@/dummy';
import { normalContainerWidth } from '@/static/style/common';

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
const ProductList = () => {
  const [filter, setFilter] = useState({
    skip: 0,
    limit: 20,
    productFilterIndex: -1,
    categoryId: 0,
  });
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActiveInfiniteScroll, setIsActiveInfiniteScroll] = useState<boolean>(true);
  const { refreshComponent } = RefreshStore;

  /**
   * TODO:
   * api 요청 (let url 과 Filter 이용)
   * setProduct()
   * setTotalProductCount()
   * setFilter() : skip = skip + limit
   *
   * 가져온 데이터가 0일때 스탑
   */
  useEffect(() => {
    setProduct(datas);
    setIsActiveInfiniteScroll(true);
  }, [refreshComponent, filter]);

  useEffect(() => {
    setTotalProductCount(datas.length);
  }, [refreshComponent]);

  const handleFilter = (index: number) => {
    const newFilter = { ...filter, productFilter: index };
    setFilter(newFilter);
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
            const data = await api 요청
            if (data.success) {
              if (data.length > 0) {
                setSkip
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
