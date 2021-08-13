import React from 'react';
import styled from '@emotion/styled';

import Carousel from '@/components/main/Carousel/Carousel';
import FeatureSection from '@/components/main/FeatureSection/FeatureSection';
import GiftSection from '@/components/main/GiftSection/GiftSection';

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
