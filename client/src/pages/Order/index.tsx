import React from 'react';
import styled from '@emotion/styled';

import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import { OrderForm } from '@/components/Order';

import { normalContainerWidth } from '@/static/style/common';

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
  width: ${normalContainerWidth};
  margin: 0 auto;
`;

const OrderBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Order;
