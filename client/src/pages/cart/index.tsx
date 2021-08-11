import React from 'react';
import styled from '@emotion/styled';
import { normalContainerWidth } from '@/static/style/common';

import { CartHeader } from '@/components/cart';

const CartPage = () => {
  return (
    <CartPageContainer>
      <CartHeader />
    </CartPageContainer>
  );
};

const CartPageContainer = styled.div`
  width: ${normalContainerWidth};
  margin: 0 auto;
  padding-top: 40px;
`;

export default CartPage;
