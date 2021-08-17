import React, { useState } from 'react';
import styled from '@emotion/styled';

import { greyBg1, greyLine, baeminFont } from '@/static/style/common';

const StockSelectorComponent = ({ title, price }) => {
  const [stock, setStock] = useState(1);

  return (
    <StockSelectorContainer>
      <span>{title}</span>
      <span>{price}원</span>
      <StockSelector>
        <input type="number" onChange={handleChangeInput} onBlur={handleBlurInput} value={stock} />
        <StockSelectorButtonContainer>
          <StockSelectorUpButton>
            <i className="fas fa-sort-up"></i>
          </StockSelectorUpButton>
          <StockSelectorDownButton>
            <i className="fas fa-sort-down"></i>
          </StockSelectorDownButton>
        </StockSelectorButtonContainer>
      </StockSelector>
    </StockSelectorContainer>
  );
};

export default StockSelectorComponent;

const StockSelectorContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px 30px;
  background-color: ${greyBg1};
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 70px;

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
