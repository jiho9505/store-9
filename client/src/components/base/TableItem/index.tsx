import React from 'react';
import styled from '@emotion/styled';

import { greyLine, greySpan, normalRadius } from '@/static/style/common';

const TableItem = ({ product }) => {
  const { productId, name, thumbNail, price, quantity, totalPrice } = product;
  return (
    <TableItemContainer>
      <ProductBasicInfo>
        <ProductImg src={thumbNail} />
        <ProductName>{name}</ProductName>
      </ProductBasicInfo>
      <ProductPriceInfo>
        <ProductPrice>
          {price.toLocaleString()} 원 / <span>{quantity} 개</span>
        </ProductPrice>
        <Button>옵션/수량 변경</Button>
      </ProductPriceInfo>
      <ProductTotalPrice>{totalPrice.toLocaleString()} 원</ProductTotalPrice>
    </TableItemContainer>
  );
};

const TableItemContainer = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;

const ProductBasicInfo = styled.div`
  grid-column: 1 / 7;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const ProductName = styled.span`
  font-size: 14px;
`;

const ProductPriceInfo = styled.div`
  grid-column: 8 / 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & div {
    text-align: center;
  }
`;

const ProductPrice = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const Button = styled.button`
  border: 1px solid ${greyLine};
  border-radius: ${normalRadius};
  color: ${greySpan};
  padding: 4px;
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export default TableItem;
