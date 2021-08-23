import React from 'react';
import styled from '@emotion/styled';

import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import { OrderForm } from '@/components/Order';

const Order = () => {
  return (
    <OrderContainer>
      <OrderStageHeader title="주문하기" />
      <OrderBody>
        <OrderForm />
        <PricePannel productTotalPrice={100000} />
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
