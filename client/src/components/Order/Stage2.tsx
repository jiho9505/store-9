import React from 'react';
import styled from '@emotion/styled';

import Input from '@/components/base/Input';
import InputLabel from '@/components/base/InputLabel';

import useValidate from '@/hooks/customHooks/useValidate';

type Stage2Props = {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  form: { recName: string; recPlace: string; recPhoneNumber: string };
};

const Stage2 = ({ form, onChange }: Stage2Props) => {
  const { isValid: recNameCheck, check: handleNameCheck } = useValidate(form.recName);
  const { isValid: recPlaceCheck, check: handlePlaceCheck } = useValidate(form.recPlace);
  const { isValid: recPhoneCheck, check: handlePhoneCheck } = useValidate(form.recPhoneNumber);

  return (
    <StageContainer>
      <InputLabel labelName="받을실 분" />
      <Input
        name="recName"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        value={form.recName}
        validate={{
          isValid: recNameCheck,
          onCheck: handleNameCheck,
          message: '받을실 분을 입력해 주세요.',
        }}
        placeholder="받을실 분을 입력해 주세요."
      />
      <InputLabel labelName="받으실 곳" />
      <Input
        name="recPlace"
        required={true}
        variant="outlined"
        size="large"
        onChange={onChange}
        value={form.recPlace}
        validate={{
          isValid: recPlaceCheck,
          onCheck: handlePlaceCheck,
          message: '받으실 곳을 입력해 주세요.',
        }}
        placeholder="받으실 곳을 입력해 주세요."
      />
      <InputLabel labelName="휴대폰" />
      <Input
        name="recPhonenumber"
        required
        variant="outlined"
        size="large"
        onChange={onChange}
        value={form.recPhoneNumber}
        validate={{
          isValid: recPhoneCheck,
          onCheck: handlePhoneCheck,
          message: '휴대폰 번호를 입력해 주세요.',
        }}
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
