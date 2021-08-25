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
  const { refreshComponent, refresh } = RefreshStore;
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      await getOrderProducts();
    })();
  }, [refreshComponent]);

  const getOrderProducts = useCallback(
    async (startDate?: string, endDate?: string, page?: number) => {
      const query: { start?: string; end?: string; page?: number } = {};
      if (startDate && endDate) {
        query.start = startDate;
        query.end = endDate;
      }
      if (page) {
        query.page = page;
      }
      const orderProducts = await OrderApi.getList(query);
      console.log(orderProducts);
      setOrderedProducts(orderProducts);
    },
    []
  );

  const handleSubmitFilter = async () => {
    const { start, finish } = form;
    if (!start || !finish) {
      return;
    }
    getOrderProducts(start, finish);
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
