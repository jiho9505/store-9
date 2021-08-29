import styled from '@emotion/styled';
import React from 'react';

import { calculateDiscount } from '@/utils/calculateDiscount';
import { baeminFont, red2 } from '@/static/style/common';
import { Link } from '@/core/Router';

/**
 * Type 적용
 */
type ContentProps = {
  item;
};

const ItemContent = ({ item }: ContentProps) => {
  if (item.stock) {
    item.discountPrice = item.discountRate ? calculateDiscount(item.price, item.discountRate) : '';
    return (
      <ItemContentContainer>
        {item.discountRate ? <Discount>{item.discountRate}%</Discount> : ``}
        <Link to={`/detail?id=${item.productId}`}>
          <ProductName>{item.name}</ProductName>
        </Link>
        <ProductOriginalPrice isDiscount={item.discountRate ? true : false}>
          {item.price.toLocaleString()}원
        </ProductOriginalPrice>
        <ProductDiscountPrice isDiscount={item.discountRate ? true : false}>
          {item.discountPrice}원
        </ProductDiscountPrice>
      </ItemContentContainer>
    );
  } else {
    return (
      <ItemContentContainer>
        <Link to={`/detail?id=${item.productId}`}>
          <ProductName>{item.name}</ProductName>
        </Link>
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
