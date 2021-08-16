import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Carousel from '@/components/Main/Carousel/Carousel';
import FeatureSection from '@/components/Main/FeatureSection/FeatureSection';
import GiftSection from '@/components/Main/GiftSection/GiftSection';
import Datas from '@/dummy';

/**
 * TODO:
 * 데이터 한번에 가져온후
 * best,new,discount에 맞게 뿌려줄 것 (랜덤하게 주는것도 괜찮을듯)
 * Gift는 일단 고정
 */
const Main = () => {
  const [products, setProducts] = useState({
    best: [],
    new: [],
    discount: [],
  });

  useEffect(() => {
    let bestProducts = [];
    let newProducts = [];
    let discountProducts = [];

    Datas.filter((data) => data.quantity).forEach((data) => {
      if (data.badge.indexOf('best') > -1) bestProducts.push(data);
      if (data.badge.indexOf('new') > -1) newProducts.push(data);
      if (data.badge.indexOf('sale') > -1) discountProducts.push(data);
    });

    bestProducts = extractRandomlyProduct(bestProducts, 4);
    newProducts = extractRandomlyProduct(newProducts, 8);
    discountProducts = extractRandomlyProduct(discountProducts, 8);

    setProducts({
      best: bestProducts,
      new: newProducts,
      discount: discountProducts,
    });
  }, []);

  /**
   * best, new , sale 각각 진열될 갯수보다 많기때문에
   * 매번 랜덤하게 다른 상품들을 보여준다.
   * 다만 최소 진열될 갯수만큼의 아이템이 필요하다!
   */
  const extractRandomlyProduct = (productArray, extractNum) => {
    const randomItems = [];
    const totalLength = productArray.length;
    while (productArray.length > totalLength - extractNum) {
      let target = productArray.splice(Math.floor(Math.random() * productArray.length), 1)[0];
      randomItems.push(target);
    }
    return randomItems;
  };

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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
