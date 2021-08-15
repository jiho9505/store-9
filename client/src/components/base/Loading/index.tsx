import React from 'react';

import styled from '@emotion/styled';
import { baeminFont } from '@/static/style/common';
import '@/static/assets/img/loading.gif';

const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingTitle>Loading...</LoadingTitle>
      <LoadingImg src="images/sample.gif"></LoadingImg>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const LoadingTitle = styled.h3`
  font-family: ${baeminFont};
  font-size: 20px;
`;
const LoadingImg = styled.img`
  width: 100px;
  height: 100px;
`;
