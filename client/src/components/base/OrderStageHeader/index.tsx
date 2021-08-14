import React from 'react';
import styled from '@emotion/styled';

import BreadCrumbs from '../BreadCrumbs';

import { baeminFont } from '@/static/style/common';

type OrderStageHeaderProps = {
  title: string;
};

const OrderStageHeader = ({ title }: OrderStageHeaderProps) => {
  return (
    <OrderStageContainer>
      <Title>{title}</Title>
      <BreadCrumbs />
    </OrderStageContainer>
  );
};

const OrderStageContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-family: ${baeminFont};
`;

export default OrderStageHeader;
