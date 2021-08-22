import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { greyLine, normalRadius, red2 } from '@/static/style/common';

type inputSize = 'large' | 'medium' | 'small';
type inputVariant = 'normal' | 'outlined';

type InputProps = {
  id?: string;
  name: string;
  required: boolean;
  size: inputSize;
  value: string;
  placeholder?: string;
  variant: inputVariant;
  error?: any;
  type?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
  onKeyPress?(e: React.KeyboardEvent): void;
};

const Input = ({
  name,
  required,
  onBlur,
  onChange,
  size,
  value,
  type,
  placeholder,
  variant,
  error,
  ...otherProps
}: InputProps) => {
  return (
    <InputContainer size={size}>
      <CustomInput
        value={value}
        name={name}
        type={type}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || ''}
        variant={variant}
        error={error}
        {...otherProps}
      />
      {error?.[name] && <ErrorMessage>{error[name]}</ErrorMessage>}
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
  error?: {};
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
  border-color: ${({ error, name }) => (error?.[name] ? `${red2}` : `${greyLine}`)};
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
  type: 'text',
};
