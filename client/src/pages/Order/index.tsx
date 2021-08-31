import React from 'react';
import styled from '@emotion/styled';

import OrderStageHeader from '@/components/common/OrderStageHeader';
import { OrderForm } from '@/components/Order';
import OrderSummary from '@/components/Order/OrderSummary';

const Order = () => {
  return (
    <OrderContainer>
      <OrderStageHeader title="주문하기" />
      <OrderBody>
        <OrderForm />
        <OrderSummary />
      </OrderBody>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  width: 1050px;
  margin: 0 auto;
  margin-top: 10px;
`;

const OrderBody = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export default Order;
