import React, { useState } from 'react';
import styled from '@emotion/styled';

import { normalButtonRadius, primary1, white } from '@/static/style/common';

type PricePannelProps = {
  totalProductNumber: number;
  productTotalPrice: number;
};

const PricePannel = ({ totalProductNumber, productTotalPrice }: PricePannelProps) => {
  const deliveryCost = productTotalPrice < 30000 ? 2500 : 0;
  return (
    <PricePannelContainer>
      <ProductTotalPrice>
        <span>상품금액</span>
        <span>{productTotalPrice.toLocaleString()}원</span>
      </ProductTotalPrice>
      <DeliveryTotalPrice>
        <span>배송비</span>
        <span>{deliveryCost.toLocaleString()}원</span>
      </DeliveryTotalPrice>
      <TotalPrice>
        <span>합계</span>
        <span>{(productTotalPrice + deliveryCost).toLocaleString()}원</span>
      </TotalPrice>
      <OrderButton>주문하기</OrderButton>
    </PricePannelContainer>
  );
};

const PricePannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  padding: 20px;
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeliveryTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OrderButton = styled.button`
  background-color: ${primary1};
  color: ${white};
  margin-top: 15px;
  width: 100%;
  height: 40px;
  border-radius: ${normalButtonRadius};
`;

export default PricePannel;
