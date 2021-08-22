import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import Input from '@/components/base/Input';
import InputLabel from '@/components/base/InputLabel';

type Stage1Props = {
  onBlur(e: ChangeEvent<HTMLInputElement>): void;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  form: { orderName: string; phoneNumber: string; email: string };
  error: { [key: string]: string };
};

const Stage1 = ({ form, onChange, onBlur, error }: Stage1Props) => {
  return (
    <StageContainer>
      <InputLabel labelName="주문자 명" />
      <Input
        name="orderName"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.orderName}
        error={error}
        placeholder="주문자명을 입력해 주세요."
      />
      <InputLabel labelName="전화번호" />
      <Input
        name="phoneNumber"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.phoneNumber}
        error={error}
        placeholder="전화번호를 입력해 주세요."
      />
      <InputLabel labelName="이메일" />
      <Input
        name="email"
        required
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.email}
        error={error}
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
