import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import ItemLists from '@/components/base/ItemLists/ItemLists';
import ItemFilterBar from '@/components/base/ItemFilterBar/ItemFilterBar';
import Loading from '@/components/base/Loading';
import useLocation from '@/hooks/customHooks/useLocation';
import datas from '@/dummy';
import { normalContainerWidth } from '@/static/style/common';

/**
 * @params categoryId
 * url pathname에 따라 key value 식으로 정해줄 것
 * 하위 category search로 얻어 낼 것
 *
 * @params productFilter
 * -1 일때 필터 선택 x
 * 0 추천순
 * 1 인기순
 * 2 최신순
 * 3 낮은 가격 순
 * 4 높은 가격 순
 * 서버에서 처리할 것
 * TODO:
 * api를 이용해 데이터 호출
 * categoryId , pagenation , filter , intersectionObserver 고려
 *
 * TODO:
 * ItemFilterBar Total Number 관리 어떻게 할지 회의
 * 1. 전체 렝스를 들고온다.
 *
 * TODO:
 * Category table에서 부모 카테고리, 자식 카테고리 다 이렇게 하나씩만 생긴다면
 * 그럼 CategoryId를 State로 관리할것
 */
const ProductList = () => {
  const [filter, setFilter] = useState({
    skip: 0,
    limit: 20,
    productFilterIndex: -1,
    categoryId: 0,
  });
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveInfiniteScroll, setIsActiveInfiniteScroll] = useState(true);
  const currPath = useLocation();

  /**
   * TODO:
   * api 요청 (let url 과 Filter 이용)
   * setProduct()
   * setTotalProductCount()
   * setFilter() : skip = skip + limit
   *
   * DB에서 stock > 0 이상만 부르기
   * 가져온 데이터가 0일때 stock = 0 요청
   */
  useEffect(() => {
    setProduct(datas);
  }, [filter]);

  useEffect(() => {
    setTotalProductCount(datas.length);
  }, []);

  // let qs = window.location.search;

  const handleFilter = (index) => {
    const newFilter = { ...filter, productFilter: index };
    setFilter(newFilter);
  };

  const observeTag = () => {
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

export default ProductList;
