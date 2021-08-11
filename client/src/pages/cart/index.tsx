import React, { useState } from 'react';
import styled from '@emotion/styled';
import { normalContainerWidth } from '@/static/style/common';

import { CartHeader, CartContent } from '@/components/cart';

const cartProducts = [
  {
    productId: 5,
    name: '똑똑똑 실내홥니다',
    quantity: 1,
    price: 6000,
    totalPrice: 6000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
  {
    productId: 3,
    name: 'ㅋㅋ 슬리퍼',
    quantity: 2,
    price: 12000,
    totalPrice: 24000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
];

const CartPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

  const handleClickCheckbox = (id) => {
    if (selectedProducts.has(id)) {
      setSelectedProducts((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    } else {
      setSelectedProducts((prev) => new Set(prev.add(id)));
    }
  };

  const handleToggleSelectAllBtn = (e) => {
    const { target } = e;
    const curProductId = cartProducts.map(({ productId }) => productId);
    if (target.checked) {
      setSelectedProducts(new Set(curProductId));
    } else {
      setSelectedProducts(new Set());
    }
  };

  return (
    <CartPageContainer>
      <CartHeader />
      <CartContent
        cartProducts={cartProducts}
        onCheck={handleClickCheckbox}
        onCheckAll={handleToggleSelectAllBtn}
        selectedProduct={selectedProducts}
      />
    </CartPageContainer>
  );
};

const CartPageContainer = styled.div`
  width: ${normalContainerWidth};
  margin: 0 auto;
  padding-top: 40px;
`;

export default CartPage;
