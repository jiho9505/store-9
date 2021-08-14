import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { greyLine, normalRadius, red2 } from '@/static/style/common';

type inputSize = 'large' | 'medium' | 'small';
type inputVariant = 'normal' | 'outlined';
type validate = { isValid: boolean; onCheck(): void; message: string };

type InputProps = {
  name: string;
  required: boolean;
  size: inputSize;
  value: string;
  placeholder: string;
  variant: inputVariant;
  validate?: validate;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  name,
  required,
  onChange,
  size,
  value,
  placeholder,
  variant,
  validate,
}: InputProps) => {
  const handleBlur = () => {
    if (!validate?.onCheck) {
      return;
    }
    validate.onCheck();
  };

  return (
    <InputContainer size={size}>
      <CustomInput
        value={value}
        name={name}
        required={required}
        onChange={onChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        variant={variant}
        valid={validate?.isValid}
      />
      {validate?.isValid === false && <ErrorMessage>{validate.message}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;

type InputContainerProps = {
  size: inputSize;
};

type InputVariantProps = {
  variant: inputVariant;
  valid?: boolean;
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
  padding: 0 10px;
`;

const CustomInput = styled.input<InputVariantProps>`
  width: 100%;
  height: 2.5rem;
  padding: 0 10px;
  ${(props) =>
    props.variant === 'outlined'
      ? `border: 1px solid ${greyLine};`
      : `border-bottom: 1px solid ${greyLine};`}
  border-radius: ${(props) => (props.variant === 'outlined' ? `${normalRadius}` : '0px')};
  border-color: ${(props) => (props.valid === false ? `${red2}` : `${greyLine}`)};
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  color: ${red2};
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 10px;
`;

Input.defaultProps = {
  variant: 'normal',
};
