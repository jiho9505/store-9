import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import ItemLists from '@/components/base/ItemLists/ItemLists';
import ItemFilterBar from '@/components/base/ItemFilterBar/ItemFilterBar';

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
    productFilter: -1,
    categoryId: 0,
  });
  const [totalProductCount, setTotalProductCount] = useState(77);
  const [product, setProduct] = useState([]);

  /**
   * TODO:
   * api 요청 (let url 과 Filter 이용)
   * setProduct()
   * setTotalProductCount()
   * setFilter() : skip = skip + limit
   */
  useEffect(() => {
    console.log(filter);
  }, [filter]);

  let path = window.location.pathname;
  let qs = window.location.search;
  let url = path + qs;

  const handleFilter = (index) => {
    const newFilter = { ...filter };
    newFilter.productFilter = index;
    setFilter(newFilter);
  };

  return (
    <WholeContainer>
      <ElementContainer>
        <ItemFilterBar
          handleFilter={handleFilter}
          totalProductCount={totalProductCount}
        ></ItemFilterBar>
        <ItemLists></ItemLists>
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
  width: 1200px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export default ProductList;
