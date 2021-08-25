import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import useInput from '@/hooks/customHooks/useInput';
import OrderApi from '@/apis/OrderApi';

import DurationFilter from '@/components/common/DurationFilter';
import { OrderContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const OrderPage = () => {
  const { refreshToken, refresh } = RefreshStore;
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      const orderProducts = await getOrderProducts(form.start, form.finish);
      setOrderedProducts(orderProducts);
    })();
  }, [refreshToken]);

  const getOrderProducts = useCallback(async (startDate, endDate) => {
    const query: { start?: string; end?: string } = {};
    if (startDate && endDate) {
      query.start = startDate;
      query.end = endDate;
    }
    return await OrderApi.getList(query);
  }, []);

  const handleSubmitFilter = async () => {
    const { start, finish } = form;
    if (!start || !finish) {
      return;
    }
    refresh();
  };

  return (
    <OrderPageContainer>
      <DurationFilter
        form={form}
        onChange={onChange}
        onSetForm={onSetForm}
        onSubmit={handleSubmitFilter}
      />
      <OrderContent orderProducts={orderedProducts} />
    </OrderPageContainer>
  );
};

const OrderPageContainer = guguStyled.div``;

export default observer(OrderPage);
