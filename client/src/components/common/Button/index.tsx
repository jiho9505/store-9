import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { baeminFont } from '@/static/style/common';

type ButtonTheme = 'normal' | 'github' | 'dark' | 'white';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';

type ButtonProps = {
  size: ButtonSize;
  value: string;
  type: ButtonType;
  onClick?(e: React.MouseEvent): void;
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

const getButtonSize = ({ size }: ButtonContainerProps) => {
  if (size === 'xlarge') {
    return css`
      width: 25rem;
      height: 5rem;
      button {
        font-size: 1.5rem;
      }
    `;
  } else if (size === 'large') {
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
      button {
        font-size: 0.9rem;
      }
    `;
  } else if (size === 'xsmall') {
    return css`
      width: 10rem;
      height: 40px;
      button {
        font-size: 0.8rem;
      }
    `;
  }
};

const ButtonContainer = styled.div<ButtonContainerProps>`
  ${getButtonSize}
  i {
    margin-right: 5px;
  }
`;

const getButtonTheme = ({ theme }: CustomButtonProps) => {
  if (theme === 'github') {
    return css`
      background-color: ${buttonWhite};
      color: ${buttonBlack};
      border: 1px solid ${borderGrey};
      &:hover {
        color: ${buttonWhite};
        background-color: ${buttonDarkBlack};
        border: 1px solid ${buttonDarkBlack};
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

const CustomButton = styled.button<CustomButtonProps>`
  width: 100%;
  height: 100%;
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.2s;
  font-size: 1.2rem;
  font-family: ${baeminFont};
  ${getButtonTheme}
`;
