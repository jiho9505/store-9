import React, { FocusEvent, ChangeEvent } from 'react';
import styled from '@emotion/styled';

import Input from '@/components/common/Input';
import InputLabel from '@/components/common/InputLabel';
import { baeminFont } from '@/static/style/common';

type Stage1Props = {
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  form: { buyerName: string; phone: string; email: string };
  error?: { [key: string]: string };
};

const Stage1 = ({ form, onChange, onBlur, error }: Stage1Props) => {
  return (
    <StageContainer>
      <InputLabel labelName="주문자 명" />
      <Input
        name="buyerName"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.buyerName}
        error={error}
        placeholder="주문자명을 입력해 주세요."
      />
      <InputLabel labelName="전화번호" />
      <Input
        name="phone"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.phone}
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
  Input {
    font-family: ${baeminFont};
  }
  label {
    font-family: ${baeminFont};
  }
`;

export default Stage1;
