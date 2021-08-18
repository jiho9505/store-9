import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { baeminThickFont } from '@/static/style/common';
import ItemLists from '@/components/base/ItemLists/ItemLists';
import Datas from '@/dummy';

const sampleData = [Datas[0], Datas[1], Datas[2]];

/**
 * TODO:
 * 추후 Back에서 데이터 3개만 받아와야 합니다.
 * 예상 : 랜덤으로 / 추천알고리즘에 의해서
 */
const DetailInfoRecommend = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(sampleData);
  }, []);

  return (
    <DetailInfoRecommendContainer>
      <Title>이건 어때요?</Title>
      <br />
      <br />
      <br />
      <ItemLists products={products} />
    </DetailInfoRecommendContainer>
  );
};

export default DetailInfoRecommend;

const DetailInfoRecommendContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
`;
