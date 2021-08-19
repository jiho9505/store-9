import { baeminFont, greyLine } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

const Cart = () => {
  /**
   * TODO:
   * POST (userid,productid,stock ...etc)
   */
  const handleClickText = () => {
    history.push('/cart');
  };

  return (
    <CartContainer onClick={handleClickText}>
      <span>장바구니</span>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 52px;
  border: 1px solid ${greyLine};
  cursor: pointer;
  span {
    font-size: 18px;
    font-family: ${baeminFont};
  }
`;

export default Cart;
