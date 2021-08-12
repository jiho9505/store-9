import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type InputProps = {
  name: string;
  required: boolean;
  size: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ name, required, onChange, size, value, placeholder }: InputProps) => {
  return (
    <InputContainer size={size}>
      <CustomInput
        value={value}
        name={name}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default Input;

type InputContainerProps = {
  size: string;
};

const getInputSize = (size: string) => {
  if (size === 'large') {
    return css`
      width: 25rem;
    `;
  } else if (size === 'medium') {
    return css`
      width: 18rem;
    `;
  } else if (size === 'small') {
    return css`
      width: 15rem;
    `;
  }
};

const InputContainer = styled.div<InputContainerProps>`
  ${({ size }) => getInputSize(size)}
  height: 2.5rem;
  padding: 0 10px;
`;

const CustomInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 10px;
  border-bottom: 1px solid #c0c0c0;
  outline: none;
  font-size: 1rem;
`;
