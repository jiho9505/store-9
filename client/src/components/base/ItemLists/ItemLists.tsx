import React from 'react';
import styled from '@emotion/styled';

/**
 * 테스트용 더미데이터
 */
const array = [
  { discount: true },
  { discount: false },
  { discount: true },
  { discount: false },
  { discount: true },
  { discount: false },
];

const feature = ['NEW', 'BEST', 'SALE', 'GREEN'];

const ItemLists = () => {
  const setColor = (feature) => {
    switch (feature) {
      case 'NEW':
        return newFeatureColor;

      case 'BEST':
        return bestFeatureColor;

      case 'SALE':
        return saleFeatureColor;

      case 'GREEN':
        return greenFeatureColor;
    }
  };

  const createFeature = () => {
    return feature.map((item, idx) => (
      <Feature color={setColor(item)} key={idx}>
        <span>{item}</span>
      </Feature>
    ));
  };

  const createItem = () => {
    return array.map((item, idx) => {
      return (
        <Item key={idx}>
          <ImageContainer></ImageContainer>
          <Discount>10%</Discount>
          <ProductName>반반휴지. 물반휴지반</ProductName>
          <ProductOriginalPrice isDiscount={item.discount}>1,500원</ProductOriginalPrice>
          <ProductDiscountPrice isDiscount={item.discount}>1,000원</ProductDiscountPrice>
          <FeatureContainer>{createFeature()}</FeatureContainer>
        </Item>
      );
    });
  };
  return (
    <>
      <ItemContainer>{createItem()}</ItemContainer>
    </>
  );
};

const bestFeatureColor = '#000';
const newFeatureColor = '#4bc2cb';
const saleFeatureColor = '#ed2e3f';
const greenFeatureColor = '#3e8d28';

const Item = styled.article`
  position: relative;
`;

const FeatureContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  left: 5px;
  top: 5px;
`;

const Feature = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 5px;
  height: 25px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #fff;
`;

const ItemContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Discount = styled.div`
  color: #ff6350;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const ImageContainer = styled.div`
  width: 285px;
  height: 350px;
  background-color: #e0e0e0;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProductName = styled.span`
  display: block;
  margin-bottom: 6px;
`;

type PriceProps = {
  isDiscount: boolean;
};

const ProductOriginalPrice = styled.strong<PriceProps>`
  font-size: ${(props) => (props.isDiscount ? '12px' : '18px')};
  font-weight: ${(props) => (props.isDiscount ? 'normal' : 'bold')};
  color: ${(props) => (props.isDiscount ? '#888' : 'black')};
  text-decoration: ${(props) => (props.isDiscount ? 'line-through' : 'none')};
`;

const ProductDiscountPrice = styled.strong<PriceProps>`
  font-size: '18px';
  font-weight: 'bold';
  color: black;
  display: ${(props) => (props.isDiscount ? 'block' : 'none')};
`;

export default ItemLists;
