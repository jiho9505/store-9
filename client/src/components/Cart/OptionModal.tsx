import React, { useState } from 'react';
import guguStyled from '@/core/styled';
import { greyLine } from '@/static/style/common';

import StockSelectorComponent from '../DetailProduct/StockSelector';
import Button from '../base/Button';

type OptionModalProps = {
  product: any;
  onClose(): void;
};

const OptionModal = ({ product, onClose }) => {
  const { thumbNail, name, quantity, price } = product;
  const [selectedStock, setSelectedStock] = useState(quantity);

  const refreshStock = (number: number) => {
    setSelectedStock(number);
  };

  const handleModifyBtnClick = () => {
    console.log('변경');
  };

  return (
    <OptionModalContainer>
      <ItemInfoContainer>
        <ItemImage src={thumbNail} />
        <span>{name}</span>
      </ItemInfoContainer>
      <StockSelectorComponent
        currStock={quantity}
        selectedStock={selectedStock}
        price={price * quantity}
        title={name}
        refreshStock={refreshStock}
      />
      <ButtonContainer>
        <Button size="xsmall" value="취소" type="button" theme="white" onClick={onClose} />
        <Button
          size="xsmall"
          value="수정"
          type="button"
          theme="dark"
          onClick={handleModifyBtnClick}
        />
      </ButtonContainer>
    </OptionModalContainer>
  );
};

const OptionModalContainer = guguStyled.div``;

const ItemInfoContainer = guguStyled.div`
  display: flex;
  align-items: center;
  padding: 10px 0px;
  border-bottom: 1px solid ${greyLine};
`;

const ItemImage = guguStyled.img`
  width: 100px;
  height: 100px;
  margin-right: 40px;
`;

const ButtonContainer = guguStyled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-top: 20px;
  & > div:first-of-type {
    margin-right: 10px;
  }
`;

export default OptionModal;
