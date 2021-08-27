import React, { createContext } from 'react';
import styled from '@emotion/styled';

import { FormContext } from '@/hooks/context';
import useInput from '@/hooks/customHooks/useInput';
import Validation from '@/utils/validation';

import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import { OrderForm } from '@/components/Order';
import OrderSummary from '@/components/Order/OrderSummary';

const stage1InitialForm = {
  buyerName: '',
  phone: '',
  email: '',
};

const stage2InitialForm = {
  receiverName: '',
  receiverAddress: '',
  receiverPhone: '',
};

const validationSchema = {
  buyerName: Validation().require().isName(),
  phone: Validation().require().isPhone(),
  email: Validation().require().isEmail(),
  receiverName: Validation().require().isName(),
  receiverAddress: Validation().require(),
  receiverPhone: Validation().require().isPhone(),
};

const Order = () => {
  const { form, onChange, onBlur, check, error } = useInput({
    initialState: { ...stage1InitialForm, ...stage2InitialForm },
    validationSchema,
  });

  return (
    <OrderContainer>
      <OrderStageHeader title="주문하기" />
      <OrderBody>
        <FormContext.Provider value={{ form, onChange, onBlur, check, error }}>
          <OrderForm />
          <OrderSummary />
        </FormContext.Provider>
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
