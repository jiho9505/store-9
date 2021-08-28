import React, { useEffect, useState, memo } from 'react';
import styled from '@emotion/styled';

import { greyButton, normalRadius, primary1 } from '@/static/style/common';

let totalPrice = 0;
let shipmentPrice = 0;
const OrderSummary = () => {
  const [curOrderProducts, setCurOrderProducts] = useState([]);

  useEffect(() => {
    const { products } = JSON.parse(localStorage.getItem('cartInfo'));
    setCurOrderProducts(products);
    return () => {
      totalPrice = 0;
      shipmentPrice = 0;
    };
  }, []);

  return (
    <OrderSummaryContainer>
      <ProductList>
        {curOrderProducts.map(({ amount, product }) => {
          const [totalAmount, curPrice] = [Number(amount), Number(product.price)];
          totalPrice += totalAmount * curPrice;
          shipmentPrice = totalPrice >= 30000 ? 0 : 3000;
          return (
            <Product key={product.name}>
              <img src={product.thumbnail} />
              <ProductInfo>
                <span>{product.name}</span>
                <span>
                  {amount} X ₩{curPrice.toLocaleString()}
                </span>
              </ProductInfo>
              <PriceTotalPrice>{(totalAmount * curPrice).toLocaleString()} 원</PriceTotalPrice>
            </Product>
          );
        })}
      </ProductList>
      <PaymentInfo>
        <SubTotal>
          <span>합계</span>
          {totalPrice.toLocaleString()} 원
        </SubTotal>
        <ShipmentPrice>
          <span>배송비</span>
          {shipmentPrice.toLocaleString()} 원
        </ShipmentPrice>
        <TotalPrice>
          <span>총 합계</span>
          {(totalPrice + shipmentPrice).toLocaleString()} 원
        </TotalPrice>
      </PaymentInfo>
    </OrderSummaryContainer>
  );
};

export default memo(OrderSummary);

const OrderSummaryContainer = styled.div`
  width: 500px;
  height: 500px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: ${normalRadius};
  overflow: hidden;
`;

const ProductList = styled.ul`
  overflow: auto;
  height: 75%;
  border-bottom: 1px solid ${greyButton};
`;

const Product = styled.li`
  display: flex;
  align-items: center;
  height: 100px;
  padding: 10px;
  border-bottom: 1px solid;
  border-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 10%,
    rgba(245, 243, 243, 1) 20%,
    rgba(210, 210, 210, 1) 50%,
    rgba(245, 243, 243, 1) 80%,
    rgba(255, 255, 255, 1) 90%
  );
  border-image-slice: 1;
  & > img {
    height: 100%;
    margin-right: 10px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
  & > span:first-of-type {
    font-weight: bold;
    margin-bottom: 10px;
  }
  & > span:last-child {
    color: ${greyButton};
  }
`;

const PriceTotalPrice = styled.div`
  color: ${greyButton};
`;

const PaymentInfo = styled.div`
  display: flex;
  height: 25%;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

const SubTotal = styled.div``;

const ShipmentPrice = styled.div``;

const TotalPrice = styled.div`
  color: ${primary1};
  font-weight: bold;
`;
