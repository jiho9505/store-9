import React from 'react';
import styled from '@emotion/styled';

import Carousel from '@/components/Main/Carousel/Carousel';
import FeatureSection from '@/components/Main/FeatureSection/FeatureSection';
import GiftSection from '@/components/Main/GiftSection/GiftSection';

const Main = () => {
  return (
    <MainContainer>
      <Carousel></Carousel>
      <FeatureSection mode="best"></FeatureSection>
      <FeatureSection mode="new"></FeatureSection>
      <GiftSection></GiftSection>
      <FeatureSection mode="discount"></FeatureSection>
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
