import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { greyLine, normalRadius } from '@/static/style/common';

type inputSize = 'large' | 'medium' | 'small';
type inputVariant = 'normal' | 'outlined';

type InputProps = {
  name: string;
  required: boolean;
  size: inputSize;
  value: string;
  placeholder: string;
  variant: inputVariant;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ name, required, onChange, size, value, placeholder, variant }: InputProps) => {
  return (
    <InputContainer size={size}>
      <CustomInput
        value={value}
        name={name}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
      />
    </InputContainer>
  );
};

export default Input;

type InputContainerProps = {
  size: inputSize;
};

type InputVariantProps = {
  variant: inputVariant;
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

const CustomInput = styled.input<InputVariantProps>`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  border-bottom: ${(props) => (props.variant === 'outlined' ? 'none' : `1px solid ${greyLine}`)};
  border: ${(props) => (props.variant === 'outlined' ? `1px solid ${greyLine}` : 'none')};
  border-radius: ${(props) => (props.variant === 'outlined' ? `${normalRadius}` : '0px')};
  font-size: 1rem;
`;

Input.defaultProps = {
  variant: 'normal',
};
