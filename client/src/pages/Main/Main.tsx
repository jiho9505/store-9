import React from 'react';
import styled from '@emotion/styled';

import Carousel from '../../components/Main/Carousel/Carousel';

const Main = () => {
  return (
    <MainContainer>
      <Carousel></Carousel>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default Main;
