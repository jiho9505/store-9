import React from 'react';
import guguStyled from '@/core/styled';
import { greyLine } from '@/static/style/common';

const OptionModal = ({ product }) => {
  const { thumbNail, name } = product;
  return (
    <OptionModalContainer>
      <ItemInfoContainer>
        <ItemImage src={thumbNail} />
        <span>{name}</span>
      </ItemInfoContainer>
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

export default OptionModal;
