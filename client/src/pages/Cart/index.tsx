import React, { useState } from 'react';
import styled from '@emotion/styled';
import { normalContainerWidth, greyLine, greySpan, normalRadius } from '@/static/style/common';

import { CartContent } from '@/components/Cart';
import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';

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

  const calTotalProductPrice = () => {
    return cartProducts.reduce((acc, { productId, totalPrice }) => {
      if (selectedProducts.has(productId)) {
        return acc + totalPrice;
      }
      return acc;
    }, 0);
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
      <OrderStageHeader title="장바구니" />
      <CartContent
        cartProducts={cartProducts}
        onCheck={handleClickCheckbox}
        onCheckAll={handleToggleSelectAllBtn}
        selectedProduct={selectedProducts}
      />
      <CartFooter>
        <SelectProductAction>
          <Button>선택상품 삭제</Button>
          <Button>선택상품 찜</Button>
        </SelectProductAction>
        <PricePannel productTotalPrice={calTotalProductPrice()} />
      </CartFooter>
    </CartPageContainer>
  );
};

const CartPageContainer = styled.div`
  width: ${normalContainerWidth};
  margin: 0 auto;
  padding-top: 40px;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
`;

const SelectProductAction = styled.div``;

const Button = styled.button`
  width: 120px;
  height: 30px;
  border: 1px solid ${greyLine};
  border-radius: ${normalRadius};
  color: ${greySpan};
  &:first-child {
    margin-right: 10px;
  }
`;

export default CartPage;
