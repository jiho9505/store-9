import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import useInput from '@/hooks/customHooks/useInput';
import OrderApi from '@/apis/OrderApi';

import DurationFilter from '@/components/common/DurationFilter';
import { OrderContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const OrderPage = () => {
  const { refreshToken } = RefreshStore;
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
      setOrderedProducts(result);
    })();
  }, [refreshToken]);

  return (
    <OrderPageContainer>
      <DurationFilter form={form} onChange={onChange} onSetForm={onSetForm} />
      <OrderContent orderProducts={orderedProducts} />
    </OrderPageContainer>
  );
};

const OrderPageContainer = guguStyled.div``;

export default observer(OrderPage);
