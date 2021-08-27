import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { getMainList } from '@/remotes/ProductRemote';
import Carousel from '@/components/Main/Carousel/Carousel';
import FeatureSection from '@/components/Main/FeatureSection/FeatureSection';
import GiftSection from '@/components/Main/GiftSection/GiftSection';
import Datas from '@/dummy';

const Main = () => {
  const [products, setProducts] = useState({
    best: [],
    new: [],
    discount: [],
  });

  /**
   * useEffect에는 하위 주석만 있으면 됩니다.
   */
  useEffect(() => {
    // (async () => {
    //   const data = await getMainList();
    //   setProducts({
    //     best: data.bestProducts,
    //     new: data.newProducts,
    //     discount: data.discountProducts,
    //   });
    // })();

    let bestProducts = [];
    let newProducts = [];
    let discountProducts = [];

    Datas.filter((data) => data.stock).forEach((data) => {
      if (data.badges.includes('best')) bestProducts.push(data);
      if (data.badges.includes('new')) newProducts.push(data);
      if (data.badges.includes('sale')) discountProducts.push(data);
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Main;
