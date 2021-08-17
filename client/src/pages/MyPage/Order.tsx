import React from 'react';
import guguStyled from '@/core/styled';

import DurationFilter from '@/components/base/DurationFilter';
import { OrderContent } from '@/components/MyPage';

const orderedProducts = [
  {
    productId: 5,
    name: '똑똑똑 실내홥니다',
    createdAt: new Date('2021-11-11'),
    quantity: 1,
    price: 6000,
    totalPrice: 6000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
  {
    productId: 3,
    name: 'ㅋㅋ 슬리퍼',
    createdAt: new Date('2021-10-11'),
    quantity: 2,
    price: 12000,
    totalPrice: 24000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
];

const OrderPage = () => {
  return (
    <OrderPageContainer>
      <DurationFilter />
      <OrderContent orderProducts={orderedProducts} />
    </OrderPageContainer>
  );
};

const OrderPageContainer = guguStyled.div``;

export default OrderPage;
