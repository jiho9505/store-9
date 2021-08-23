import styled from '@emotion/styled';
import React from 'react';

import { baemin, baeminThickFont, baeminFont, greySpan } from '@/static/style/common';

type TotalPriceProps = {
  price: number;
  selectedStock: number;
};

const TotalPrice = ({ price, selectedStock }: TotalPriceProps) => {
  return (
    <TotalPriceContainer>
      <TotalPriceText>총 합계금액</TotalPriceText>
      <TotalPriceValue>{(price * selectedStock).toLocaleString()}원</TotalPriceValue>
    </TotalPriceContainer>
  );
};

const TotalPriceContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TotalPriceText = styled.span`
  font-family: ${baeminFont};
  font-size: 20px;
  color: ${greySpan};
`;

const TotalPriceValue = styled.span`
  font-family: ${baeminThickFont};
  font-size: 28px;
  color: ${baemin};
`;
export default TotalPrice;
