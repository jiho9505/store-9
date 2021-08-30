import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ItemLists from '@/components/common/ItemLists/ItemLists';
import ItemFilterBar from '@/components/ProductList/ItemFilterBar';

import RefreshStore from '@/stores/RefreshStore';
import { baemin, baeminFont, normalContainerWidth } from '@/static/style/common';
import { getQueryStringValue } from '@/utils/getQueryStringValue';
import ProductApi from '@/apis/ProductApi';

const sortByObj = {
  0: 'RECOMMEND',
  1: 'BEST',
  2: 'NEW',
  3: 'HIGH_PRICE',
  4: 'LOW_PRICE',
};
const size = 16;

const ProductList = () => {
  const [sortByIdx, setSortByIdx] = useState<number>(0);
  const [totalProductCount, setTotalProductCount] = useState<number>(0);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState<number>(0);
  const { refreshComponent } = RefreshStore;
  const [showLoadMore, setShowLoadMore] = useState(false);

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
        const result = await ProductApi.getList(filter);

        if (result.ok) {
          if (result.data.totalCount < 20) setShowLoadMore(false);
          else setShowLoadMore(true);
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

  const handleFilter = (index: number) => {
    setSortByIdx(index);
  };

  const handleClickButton = async () => {
    const result = await ProductApi.getList(filter);
    if (result.ok) {
      if (result.data.products.length) {
        setProduct([...product, ...result.data.products]);
        setPage(page + 1);
      } else {
        setShowLoadMore(false);
      }
    }
  };

  return (
    <WholeContainer>
      <ElementContainer>
        <ItemFilterBar
          handleFilter={handleFilter}
          totalProductCount={totalProductCount}
          sortByIdx={sortByIdx}
        ></ItemFilterBar>
        <ItemLists products={product}></ItemLists>
        {showLoadMore && (
          <LoadMoreContainer>
            <LoadMore onClick={handleClickButton}>상품 더보기</LoadMore>
          </LoadMoreContainer>
        )}
      </ElementContainer>
    </WholeContainer>
  );
};

export default observer(ProductList);

const LoadMoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const LoadMore = styled.button`
  border-radius: 50px;
  font-family: ${baeminFont};
  font-size: 20px;
  background-color: ${baemin};
  color: white;
  width: 150px;
  height: 50px;
`;

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
