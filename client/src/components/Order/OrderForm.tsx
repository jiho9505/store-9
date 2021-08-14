import React, { useState } from 'react';
import styled from '@emotion/styled';

import Input from '@/components/base/Input';
import InputLabel from '@/components/base/InputLabel';
import Button from '@/components/base/Button';

import useInput from '@/hooks/customHooks/useInput';
import useValidate from '@/hooks/customHooks/useValidate';

import { normalRadius } from '@/static/style/common';

const OrderForm = () => {
  const { form, onChange, reset } = useInput({
    orderName: '',
    phoneNumber: '',
    email: '',
  });
  const [stage, setStage] = useState(1);

  const { isValid: orderNameCheck, check: handleNameCheck } = useValidate(form.orderName);
  const { isValid: phoneCheck, check: handlePhoneCheck } = useValidate(form.phoneNumber);
  const { isValid: emailCheck, check: handleEmailCheck } = useValidate(form.email);

  return (
    <OrderFormContainer>
      <Stage1>
        <InputLabel labelName="주문자 명" />
        <Input
          name="orderName"
          required={true}
          variant="outlined"
          size="large"
          onChange={onChange}
          value={form.orderName}
          validate={{
            isValid: orderNameCheck,
            onCheck: handleNameCheck,
            message: '주문자 명을 입력해 주세요.',
          }}
          placeholder="주문자명을 입력해 주세요."
        />
        <InputLabel labelName="전화번호" />
        <Input
          name="phoneNumber"
          required={true}
          variant="outlined"
          size="large"
          onChange={onChange}
          value={form.phoneNumber}
          validate={{
            isValid: phoneCheck,
            onCheck: handlePhoneCheck,
            message: '전화번호를 입력해 주세요',
          }}
          placeholder="전화번호를 입력해 주세요."
        />
        <InputLabel labelName="이메일" />
        <Input
          name="email"
          required={true}
          variant="outlined"
          size="large"
          onChange={onChange}
          value={form.email}
          validate={{
            isValid: emailCheck,
            onCheck: handleEmailCheck,
            message: '이메일을 입력해 주세요.',
          }}
          placeholder="이메일을 입력해 주세요."
        />
      </Stage1>
      <PageAction>
        <Button
          size="small"
          theme="white"
          value="next"
          type="button"
          onClick={() => console.log('a')}
        />
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

const Stage1 = styled.div`
  & div {
    margin-bottom: 20px;
  }
`;

const PageAction = styled.div``;

export default OrderForm;
