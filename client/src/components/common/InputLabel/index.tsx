import React from 'react';
import guguStyled from '@emotion/styled';

type InputLabelProps = {
  labelName: string;
};

const InputLabel = ({ labelName }: InputLabelProps) => {
  return <Label>{labelName}</Label>;
};

const Label = guguStyled.label`
  display: block;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export default InputLabel;
