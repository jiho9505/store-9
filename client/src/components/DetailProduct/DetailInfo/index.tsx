import React, { useContext } from 'react';
import styled from '@emotion/styled';

import DetailInfoTable from '../DetailInfoTable';
import DetailInfoRecommend from '../DetailInfoRecommend';

import { ProductContext } from '@/hooks/context';
import { baeminThickFont } from '@/static/style/common';

const DetailInfo = () => {
  const { info } = useContext(ProductContext);

  const createInfoImages = () => {
    return info.content_urls.map((image, idx) => (
      <img key={image} referrerPolicy="no-referrer" src={image}></img>
    ));
  };

  return (
    <DetailInfoContainer>
      <Title>상품상세정보</Title>
      {info.content_urls && createInfoImages()}
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
