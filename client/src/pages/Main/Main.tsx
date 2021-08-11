import React from 'react';
import styled from '@emotion/styled';

import Carousel from '@/components/Main/Carousel/Carousel';
import Best from '@/components/Main/Best/Best';

const Main = () => {
  return (
    <MainContainer>
      <Carousel></Carousel>
      <Best></Best>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
