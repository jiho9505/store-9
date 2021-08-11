import React from 'react';
import styled from '@emotion/styled';

const TableItem = ({ cartProduct }) => {
  const { productId, name, thumbNail, price, quantity, totalPrice } = cartProduct;
  return (
    <TableItemContainer>
      <ProductBasicInfo>
        <ProductImg src={thumbNail} />
        <ProductName>{name}</ProductName>
      </ProductBasicInfo>
      <ProductPriceInfo>
        <div>
          {price} / <span>{quantity} 개</span>
        </div>
        <button>옵션/수량 변경</button>
      </ProductPriceInfo>
      <ProductTotalPrice>{totalPrice}</ProductTotalPrice>
    </TableItemContainer>
  );
};

const TableItemContainer = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  /* padding: 15px 10px; */
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

const ProductName = styled.span``;

const ProductPriceInfo = styled.div`
  grid-column: 8 / 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  & div {
    text-align: center;
  }
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TableItem;
