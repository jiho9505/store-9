import styled from '@emotion/styled';
import React from 'react';

import { calculateDiscount } from '@/utils/calculateDiscount';
import { baeminFont, red2 } from '@/static/style/common';
import { Link } from '@/core/Router';

type ContentProps = {
  item: {
    quantity: number;
    price: string;
    discount_rate: string;
    discount_price?: string;
    title: string;
  };
};

const ItemContent = ({ item }: ContentProps) => {
  if (item.quantity) {
    item.discount_price = item.discount_rate
      ? calculateDiscount(item.price, item.discount_rate)
      : '';
    return (
      <ItemContentContainer>
        {item.discount_rate ? <Discount>{item.discount_rate}</Discount> : ``}
        <Link to="/detail">
          <ProductName>{item.title}</ProductName>
        </Link>
        <ProductOriginalPrice isDiscount={item.discount_rate ? true : false}>
          {item.price}원
        </ProductOriginalPrice>
        <ProductDiscountPrice isDiscount={item.discount_rate ? true : false}>
          {item.discount_price}원
        </ProductDiscountPrice>
      </ItemContentContainer>
    );
  } else {
    return (
      <ItemContentContainer>
        <ProductName>{item.title}</ProductName>
        <ProductOriginalPrice isDiscount={false}>품절</ProductOriginalPrice>
      </ItemContentContainer>
    );
  }
};

export default ItemContent;

const ItemContentContainer = styled.div``;

const ProductName = styled.span`
  display: block;
  margin-bottom: 6px;
  cursor: pointer;
  font-family: ${baeminFont};
`;

type PriceProps = {
  isDiscount: boolean;
};

const ProductOriginalPrice = styled.strong<PriceProps>`
  font-size: ${(props) => (props.isDiscount ? '12px' : '17px')};
  font-weight: ${(props) => (props.isDiscount ? 'normal' : 'bold')};
  color: ${(props) => (props.isDiscount ? '#888' : 'black')};
  text-decoration: ${(props) => (props.isDiscount ? 'line-through' : 'none')};
  font-family: ${baeminFont};
`;

const ProductDiscountPrice = styled.strong<PriceProps>`
  font-size: '18px';
  font-weight: 'bold';
  color: black;
  display: ${(props) => (props.isDiscount ? 'block' : 'none')};
  font-family: ${baeminFont};
`;

const Discount = styled.div`
  color: ${red2};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  font-family: ${baeminFont};
`;
