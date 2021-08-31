import React, { useState } from 'react';
import guguStyled from '@/core/styled';
import { greyLine } from '@/static/style/common';

import StockSelectorComponent from '../DetailProduct/StockSelector';
import Button from '../common/Button';
import OrderApi from '@/apis/OrderApi';
import RefreshStore from '@/stores/RefreshStore';

type OptionModalProps = {
  product: any;
  onClose(): void;
};

const OptionModal = ({ cartProduct, onClose }) => {
  const { thumbnail, name, price } = cartProduct.product;
  const [selectedStock, setSelectedStock] = useState(cartProduct.amount);
  const [error, setError] = useState('');
  const { refresh } = RefreshStore;

  const refreshStock = (number: number) => {
    setSelectedStock(number);
  };

  const handleModifyBtnClick = async () => {
    try {
      const result = await OrderApi.updateCartItem({
        orderItemId: cartProduct.id,
        amount: selectedStock,
      });
      refresh();
      onClose();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <OptionModalContainer>
      <ItemInfoContainer>
        <ItemImage src={thumbnail} />
        <span>{name}</span>
      </ItemInfoContainer>
      <StockSelectorComponent
        currStock={cartProduct.amount}
        selectedStock={selectedStock}
        price={price}
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
