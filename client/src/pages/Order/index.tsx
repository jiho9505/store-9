import React, { createContext } from 'react';
import styled from '@emotion/styled';

import { FormContext } from '@/hooks/context';
import useInput from '@/hooks/customHooks/useInput';
import Validation from '@/utils/validation';

import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import { OrderForm } from '@/components/Order';

const stage1InitialForm = {
  orderName: '',
  phoneNumber: '',
  email: '',
};

const stage2InitialForm = {
  recName: '',
  recPlace: '',
  recPhoneNumber: '',
};

const validationSchema = {
  orderName: Validation().require('주문자명을 입력해 주세요.'),
  phoneNumber: Validation().require('휴대폰 번호를 입력해 주세요.'),
  email: Validation().require('이메일을 입력해 주세요.'),
  recName: Validation().require('받는 사람이름을 입력해 주세요.'),
  recPlace: Validation().require('받는 장소를 입력해 주세요.'),
  recPhoneNumber: Validation().require('받는 사람 휴대폰 번호를 입력해 주세요.'),
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
          <PricePannel productTotalPrice={100000} />
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
