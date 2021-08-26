import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';

import Stepper from './Stepper';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Button from '@/components/common/Button';

import { FormContext } from '@/hooks/context';
import useInput from '@/hooks/customHooks/useInput';
import Validation from '@/utils/validation';

import { normalRadius } from '@/static/style/common';

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

const OrderForm = () => {
  const { form, error, onChange, onBlur, check } = useContext(FormContext);
  const { orderName, phoneNumber, email, recName, recPlace, recPhoneNumber } = form;

  const [stage, setStage] = useState(1);

  const handleClickNext = () => {
    const pass = check('orderName', 'phoneNumber', 'email');
    if (!pass) {
      return;
    }
    setStage((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    setStage((prev) => prev - 1);
  };

  const Forms = () => {
    if (stage === 1) {
      return (
        <Stage1
          onChange={onChange}
          onBlur={onBlur}
          form={{ orderName, email, phoneNumber }}
          error={error}
        />
      );
    } else if (stage === 2) {
      return (
        <Stage2
          onChange={onChange}
          onBlur={onBlur}
          form={{ recName, recPlace, recPhoneNumber }}
          error={error}
        />
      );
    }
  };

  const FormButtons = () => {
    if (stage === 1) {
      return (
        <Button size="small" theme="white" value="next" type="button" onClick={handleClickNext} />
      );
    } else if (stage === 2) {
      return (
        <>
          <Button size="small" theme="white" value="prev" type="button" onClick={handleClickPrev} />
          <Button
            size="small"
            theme="white"
            value="submit"
            type="button"
            onClick={() => console.log('a')}
          />
        </>
      );
    }
  };

  return (
    <OrderFormContainer>
      <Stepper steps={2} curStep={stage} />
      {Forms()}
      <PageAction>
        <FormButtons />
      </PageAction>
    </OrderFormContainer>
  );
};

const OrderFormContainer = styled.form`
  width: fit-content;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: ${normalRadius};
  overflow: hidden;
`;

const PageAction = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default OrderForm;
