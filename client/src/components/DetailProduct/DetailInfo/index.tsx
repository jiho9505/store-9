import { baeminThickFont } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

type DetailInfo = {
  images: string[];
};

const DetailInfo = ({ images }: DetailInfo) => {
  console.log('images: ', images);
  const createInfoImages = () => {
    return images.map((image, idx) => (
      <img key={idx} referrerPolicy="no-referrer" src={image}></img>
    ));
  };
  return (
    <DetailInfoContainer>
      <Title>상품상세정보</Title>
      {images && createInfoImages()}
    </DetailInfoContainer>
  );
};

const DetailInfoContainer = styled.div`
  margin-top: 50px;
  width: 900px;
`;

const Title = styled.span`
  font-family: ${baeminThickFont};
  font-size: 17px;
`;

export default DetailInfo;
