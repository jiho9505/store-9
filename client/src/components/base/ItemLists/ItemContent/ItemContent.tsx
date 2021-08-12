import styled from '@emotion/styled';
import React from 'react';

import { red2 } from '@/static/style/common';

type ContentProps = {
  quantity: number;
  discount: boolean;
};

const ItemContent = ({ quantity, discount }: ContentProps) => {
  if (!quantity) {
    return (
      <div>
        <ProductName>반반휴지. 물반휴지반</ProductName>
        <ProductOriginalPrice isDiscount={false}>품절</ProductOriginalPrice>
      </div>
    );
  }

  return (
    <div>
      {discount ? <Discount>10%</Discount> : ``}
      <ProductName>반반휴지. 물반휴지반</ProductName>
      <ProductOriginalPrice isDiscount={discount}>1,500원</ProductOriginalPrice>
      <ProductDiscountPrice isDiscount={discount}>1,000원</ProductDiscountPrice>
    </div>
  );
};

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

const Discount = styled.div`
  color: ${red2};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export default ItemContent;
