import React from 'react';
import styled from '@emotion/styled';

import { greyBg1, greyLine, baeminFont, baeminThickFont, greyButton } from '@/static/style/common';

type StockSelectorComponentProps = {
  title: string;
  price: number;
  refreshStock: (number) => void;
  selectedStock: number;
  currStock: number;
};

const StockSelectorComponent = ({
  title,
  price,
  refreshStock,
  selectedStock,
  currStock,
}: StockSelectorComponentProps) => {
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    refreshStock(e.currentTarget.value);
  };

  const handleBlurInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.currentTarget.value);
    if (inputValue < 1 || inputValue > 100) {
      refreshStock(1);
    }
  };

  const handleClickButton = (e: React.MouseEvent) => {
    if (e.currentTarget.className === 'fas fa-sort-up') {
      selectedStock < 100 && refreshStock(Number(selectedStock) + 1);
    } else if (e.currentTarget.className === 'fas fa-sort-down') {
      selectedStock > 1 && refreshStock(Number(selectedStock) - 1);
    }
  };

  return (
    <StockSelectorContainer haveCurrStock={currStock}>
      {currStock ? (
        <>
          <span>{title}</span>
          <span>{(price * selectedStock).toLocaleString()}원</span>
          <StockSelector>
            <input
              type="number"
              onChange={handleChangeInput}
              onBlur={handleBlurInput}
              value={selectedStock}
            />
            <StockSelectorButtonContainer>
              <StockSelectorUpButton>
                <i className="fas fa-sort-up" onClick={handleClickButton}></i>
              </StockSelectorUpButton>
              <StockSelectorDownButton>
                <i className="fas fa-sort-down" onClick={handleClickButton}></i>
              </StockSelectorDownButton>
            </StockSelectorButtonContainer>
          </StockSelector>
        </>
      ) : (
        <SoldOutContainer>
          <SoldOut>Sold Out</SoldOut>
        </SoldOutContainer>
      )}
    </StockSelectorContainer>
  );
};

export default StockSelectorComponent;

type StockSelectorContainerProps = {
  haveCurrStock: number;
};

const SoldOutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SoldOut = styled.span`
  font-family: ${baeminThickFont};
  font-size: 20px;
  color: white;
`;

const StockSelectorContainer = styled.div<StockSelectorContainerProps>`
  width: 100%;
  height: 60px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  background-color: ${(props) => (props.haveCurrStock ? greyBg1 : greyButton)};
  position: ${(props) => (props.haveCurrStock ? 'relative' : 'absolute')};
  bottom: 0px;
  left: 0px;

  span {
    font-family: ${baeminFont};
  }
`;

const StockSelector = styled.div`
  position: absolute;
  left: 60%;
  top: 12px;
  display: flex;
  border: 1px solid ${greyLine};

  input {
    font-size: 15px;
    width: 50px;
    height: 30px;
    text-align: center;
    font-family: ${baeminFont};
    outline: none;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StockSelectorButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15px;
`;

const StockSelectorUpButton = styled.button`
  i {
    transform: translateY(3px);
  }
`;

const StockSelectorDownButton = styled.button`
  i {
    transform: translateY(-3px);
  }
`;
