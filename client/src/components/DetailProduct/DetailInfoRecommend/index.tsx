import React from 'react';
import styled from '@emotion/styled';

import { baeminThickFont } from '@/static/style/common';
import ItemLists from '@/components/common/ItemLists/ItemLists';
import DetailProductStore from '@/stores/DetailProductStore';

const DetailInfoRecommend = () => {
  return (
    <DetailInfoRecommendContainer>
      <Title>이건 어때요?</Title>
      <ItemLists products={DetailProductStore.product.recommends} />
    </DetailInfoRecommendContainer>
  );
};

export default DetailInfoRecommend;

const DetailInfoRecommendContainer = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
  margin-bottom: 30px;
`;
