import React, { useState } from 'react';
import styled from '@emotion/styled';

import { normalContainerWidth, greyLine } from '@/static/style/common';

type PricePannelProps = {
  totalProductNumber: number;
  productTotalPrice: number;
};

const PricePannel = ({ totalProductNumber, productTotalPrice }: PricePannelProps) => {
  const deliveryCost = productTotalPrice < 30000 ? 2500 : 0;
  return (
    <PricePannelContainer>
      <ProductTotalPrice>
        <span>총 {totalProductNumber}개의 상품금액</span>
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
    </PricePannelContainer>
  );
};

const PricePannelContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: ${normalContainerWidth};
  height: 130px;
  border: 2px solid ${greyLine};
  padding: 20px;
`;

const ProductTotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DeliveryTotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default PricePannel;
