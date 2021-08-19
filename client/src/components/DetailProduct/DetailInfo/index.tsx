import React from 'react';
import styled from '@emotion/styled';

import DetailInfoTable from '../DetailInfoTable';
import DetailInfoRecommend from '../DetailInfoRecommend';

import { baeminThickFont } from '@/static/style/common';
type DetailInfo = {
  images: string[];
};

const DetailInfo = ({ images }: DetailInfo) => {
  const createInfoImages = () => {
    return images.map((image, idx) => (
      <img key={idx} referrerPolicy="no-referrer" src={image}></img>
    ));
  };
  return (
    <DetailInfoContainer>
      <Title>상품상세정보</Title>
      {images && createInfoImages()}
      <DetailInfoTable />
      <DetailInfoRecommend />
    </DetailInfoContainer>
  );
};

const DetailInfoContainer = styled.div`
  width: 900px;
  margin: 100px auto 0px auto;
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
`;

export default DetailInfo;
