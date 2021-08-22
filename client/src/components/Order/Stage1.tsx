import React from 'react';
import styled from '@emotion/styled';

import Input from '@/components/common/Input';
import InputLabel from '@/components/common/InputLabel';

import useValidate from '@/hooks/customHooks/useValidate';

type Stage1Props = {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  form: { orderName: string; phoneNumber: string; email: string };
};

const Stage1 = ({ form, onChange }: Stage1Props) => {
  const { isValid: orderNameCheck, check: handleNameCheck } = useValidate(form.orderName);
  const { isValid: phoneCheck, check: handlePhoneCheck } = useValidate(form.phoneNumber);
  const { isValid: emailCheck, check: handleEmailCheck } = useValidate(form.email);

  return (
    <StageContainer>
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
        required
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
    </StageContainer>
  );
};

const StageContainer = styled.div`
  & div {
    margin-bottom: 30px;
  }
`;

export default Stage1;
