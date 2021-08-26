import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import useInput from '@/hooks/customHooks/useInput';
import OrderApi from '@/apis/OrderApi';

import DurationFilter from '@/components/common/DurationFilter';
import Pagination from '@/components/common/Pagination';
import { OrderContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const OrderPage = () => {
  const { refreshComponent, refresh } = RefreshStore;

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      const { start, finish } = form;
      await getOrderProducts(start, finish, curPage - 1);
    })();
  }, [refreshComponent]);

  const getOrderProducts = useCallback(
    async (startDate?: string, endDate?: string, page: number = 0) => {
      const query: { startDate?: string; endDate?: string; page?: number } = {};
      if (startDate && endDate) {
        query.startDate = startDate;
        query.endDate = endDate;
      }
      if (page) {
        query.page = page;
      }
      const orderProducts = await OrderApi.getList(query);
      const { data } = orderProducts;
      setOrderedProducts(data.orders);
      setTotalCount(data.totalCount);
    },
    []
  );

  const handleSubmitFilter = async () => {
    const { start, finish } = form;
    if (!start || !finish) {
      return;
    }
    getOrderProducts(start, finish, 0);
  };

  const handlePageChange = async (page: number) => {
    const { start, finish } = form;
    await getOrderProducts(start, finish, page - 1);
    setCurPage(page);
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
      <Pagination totalCount={totalCount} curPage={curPage} onChange={handlePageChange} />
    </OrderPageContainer>
  );
};

const OrderPageContainer = guguStyled.div``;

export default observer(OrderPage);
