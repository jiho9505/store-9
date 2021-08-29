import React from 'react';
import styled from '@emotion/styled';

import DetailInfoTable from '../DetailInfoTable';
import DetailInfoRecommend from '../DetailInfoRecommend';

import { baeminThickFont } from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';

const DetailInfo = () => {
  const { contentImages } = DetailProductStore.product;

  const createInfoImages = () => {
    return contentImages.map((image) => (
      <img key={image} referrerPolicy="no-referrer" src={image}></img>
    ));
  };

  return (
    <DetailInfoContainer>
      <Title>상품상세정보</Title>
      {contentImages && createInfoImages()}
      <DetailInfoTable />
      <DetailInfoRecommend />
    </DetailInfoContainer>
  );
};

export default DetailInfo;

const DetailInfoContainer = styled.div`
  width: 900px;
  margin: 100px auto 0px auto;
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
`;
