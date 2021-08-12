import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

import { baemin, green, red1, red2 } from '@/static/style/common';
import '@/static/assets/img/sampleItem.jpeg';
import '@/static/assets/img/soldout.png';

/**
 * TODO:
 * 현재는 테스트용 더미데이터이므로
 * array, feature, getColor 는 추후 데이터가 확정되면
 * 바꿀 예정
 */
const array = [
  { discount: true, quantity: 0 },
  { discount: false, quantity: 1 },
  { discount: true, quantity: 0 },
  { discount: false, quantity: 1 },
  { discount: true, quantity: 1 },
  { discount: false, quantity: 0 },
];

const feature = ['NEW', 'BEST', 'SALE', 'GREEN'];

const ItemLists = () => {
  const getColor = (feature) => {
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
      <Feature color={getColor(item)} key={idx}>
        <span>{item}</span>
      </Feature>
    ));
  };

  const createItem = () => {
    return array.map((item, idx) => {
      return (
        <Item key={idx}>
          <ImageContainer>
            <ProductImg src="images/sampleItem.jpeg"></ProductImg>
            {item.quantity ? <SoldOutImg src="images/soldout.png"></SoldOutImg> : ``}
          </ImageContainer>

          {haveQuantity(item.quantity, item.discount)}
        </Item>
      );
    });
  };

  const haveQuantity = (quantity: number, discount: boolean): ReactElement => {
    if (quantity) {
      return (
        <div>
          <ProductName>반반휴지. 물반휴지반</ProductName>
          <ProductOriginalPrice isDiscount={false}>품절</ProductOriginalPrice>
        </div>
      );
    }

    return (
      <div>
        <Discount>10%</Discount>
        <ProductName>반반휴지. 물반휴지반</ProductName>
        <ProductOriginalPrice isDiscount={discount}>1,500원</ProductOriginalPrice>
        <ProductDiscountPrice isDiscount={discount}>1,000원</ProductDiscountPrice>
        <FeatureContainer>{createFeature()}</FeatureContainer>
      </div>
    );
  };

  return (
    <>
      <ItemContainer>{createItem()}</ItemContainer>
    </>
  );
};

const bestFeatureColor = '#000';
const newFeatureColor = baemin;
const saleFeatureColor = red1;
const greenFeatureColor = green;

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
  color: ${red2};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 285px;
  height: 350px;
  margin-bottom: 12px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const SoldOutImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
`;

const ProductName = styled.span`
  display: block;
  margin-bottom: 6px;
  cursor: pointer;
`;

type PriceProps = {
  isDiscount: boolean;
};

const ProductOriginalPrice = styled.strong<PriceProps>`
  font-size: ${(props) => (props.isDiscount ? '12px' : '17px')};
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
