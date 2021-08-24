import React, { useEffect, useState } from 'react';
import guguStyled from '@/core/styled';

import useInput from '@/hooks/customHooks/useInput';
import OrderApi from '@/apis/OrderApi';

import DurationFilter from '@/components/common/DurationFilter';
import { OrderContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const orderedProductsT = [
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
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      const result = await OrderApi.getList();
      console.log(result);
      setOrderedProducts(result);
    })();
  }, []);

  return (
    <OrderPageContainer>
      <DurationFilter form={form} onChange={onChange} onSetForm={onSetForm} />
      <OrderContent orderProducts={orderedProducts} />
    </OrderPageContainer>
  );
};

const OrderPageContainer = guguStyled.div``;

export default OrderPage;
