import React, { ChangeEvent, FocusEvent } from 'react';
import styled from '@emotion/styled';

import Input from '@/components/common/Input';
import InputLabel from '@/components/common/InputLabel';

type Stage2Props = {
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  form: { recName: string; recPlace: string; recPhoneNumber: string };
  error?: { [key: string]: string };
};

const Stage2 = ({ form, onChange, error, onBlur }: Stage2Props) => {
  return (
    <StageContainer>
      <InputLabel labelName="받을실 분" />
      <Input
        name="recName"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.recName}
        error={error}
        placeholder="받을실 분을 입력해 주세요."
      />
      <InputLabel labelName="받으실 곳" />
      <Input
        name="recPlace"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.recPlace}
        error={error}
        placeholder="받으실 곳을 입력해 주세요."
      />
      <InputLabel labelName="휴대폰" />
      <Input
        name="recPhoneNumber"
        required
        variant="outlined"
        size="large"
        onChange={onChange}
        onBlur={onBlur}
        value={form.recPhoneNumber}
        error={error}
        placeholder="휴대폰 번호를 입력해 주세요."
      />
    </StageContainer>
  );
};

const StageContainer = styled.div`
  & div {
    margin-bottom: 30px;
  }
`;

export default Stage2;
