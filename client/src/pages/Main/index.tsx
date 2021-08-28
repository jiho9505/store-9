import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Carousel from '@/components/Main/Carousel/Carousel';
import FeatureSection from '@/components/Main/FeatureSection/FeatureSection';
import GiftSection from '@/components/Main/GiftSection/GiftSection';
import ProductApi from '@/apis/ProductApi';

const alertMsg = '아이템을 불러오는데 실패하였습니다.';

const Main = () => {
  const [products, setProducts] = useState({
    best: [],
    new: [],
    discount: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await ProductApi.getMain();
        setProducts({
          best: result.data.bestProducts,
          new: result.data.newProducts,
          discount: result.data.discountProducts,
        });
      } catch (e) {
        alert(alertMsg);
      }
    })();
  }, []);

  return (
    <MainContainer>
      <Carousel></Carousel>
      <FeatureSection mode="best" product={products.best}></FeatureSection>
      <FeatureSection mode="new" product={products.new}></FeatureSection>
      <GiftSection></GiftSection>
      <FeatureSection mode="discount" product={products.discount}></FeatureSection>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
