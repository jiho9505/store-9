import React from 'react';
import styled from '@emotion/styled';

import BreadCrumbs from '../base/BreadCrumbs';

import { baeminFont } from '@/static/style/common';

const CartHeader = () => {
  return (
    <CartHeaderContainer>
      <Title>장바구니</Title>
      <BreadCrumbs />
    </CartHeaderContainer>
  );
};

const CartHeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-family: ${baeminFont};
`;

export default CartHeader;
