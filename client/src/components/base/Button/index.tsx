import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type ButtonTheme = 'normal' | 'github' | 'dark' | 'white';
type ButtonType = 'button' | 'submit' | 'reset';

type ButtonProps = {
  size: string;
  value: string;
  type: ButtonType;
  onClick: (e: React.MouseEvent) => void;
  theme: ButtonTheme;
};

const Button = ({ size, value, type, onClick, theme }: ButtonProps) => {
  return (
    <ButtonContainer size={size}>
      <CustomButton theme={theme} onClick={onClick} type={type}>
        {theme === 'github' ? <i className="fab fa-github"></i> : ''}
        {value}
      </CustomButton>
    </ButtonContainer>
  );
};

export default Button;

type ButtonContainerProps = {
  size: string;
};

type CustomButtonProps = {
  theme: string;
};

type Color = string;
const buttonBlack: Color = '#333';
const buttonDarkBlack: Color = '#000';
const buttonWhite: Color = '#fff';
const borderGrey: Color = '#cccccc';

const ButtonContainer = styled.div<ButtonContainerProps>`
  ${({ size }) => getButtonSize(size)}
  i {
    margin-right: 5px;
  }
`;

const getButtonSize = (size: string) => {
  if (size === 'large') {
    return css`
      width: 25rem;
      height: 3rem;
    `;
  } else if (size === 'medium') {
    return css`
      width: 18rem;
      height: 3rem;
    `;
  } else if (size === 'small') {
    return css`
      width: 10rem;
      height: 3rem;
    `;
  }
};

const CustomButton = styled.button<CustomButtonProps>`
  width: 100%;
  height: 100%;
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.2s;
  ${({ theme }) => getButtonTheme(theme)};
`;

const getButtonTheme = (theme: string) => {
  if (theme === 'github') {
    return css`
      background-color: ${buttonWhite};
      color: ${buttonBlack};
      border: 1px solid ${borderGrey};
      &:hover {
        color: ${buttonWhite};
        background-color: ${buttonDarkBlack};
        border: none;
      }
    `;
  } else if (theme === 'dark') {
    return css`
      background-color: ${buttonDarkBlack};
      &:hover {
        background-color: ${buttonBlack};
      }
    `;
  } else if (theme === 'normal') {
    return css`
      background-color: ${buttonBlack};
      &:hover {
        background-color: ${buttonDarkBlack};
      }
    `;
  } else if (theme === 'white') {
    return css`
      background-color: ${buttonWhite};
      border: 1px solid ${borderGrey};
      color: ${buttonBlack};
    `;
  }
};
