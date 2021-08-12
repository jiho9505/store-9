import React from 'react';
import styled from '@emotion/styled';

import ItemImage from './ItemImage/ItemImage';
import ItemLabel from './ItemLabel/ItemLabel';
import ItemContent from './ItemContent/ItemContent';

import '@/static/assets/img/sampleItem.jpeg';
import '@/static/assets/img/soldout.png';

/**
 * TODO:
 * 현재는 테스트용 더미데이터이므로
 * array, feature, getColor 는 추후 데이터가 확정되면
 * 바꿀 예정
 */
const array = [
  { discount: true, quantity: 0 },
  { discount: false, quantity: 1 },
  { discount: true, quantity: 0 },
  { discount: false, quantity: 1 },
  { discount: true, quantity: 1 },
  { discount: false, quantity: 0 },
];

const ItemLists = () => {
  const createItem = () => {
    return array.map((item, idx) => {
      return (
        <Item key={idx}>
          <ItemImage quantity={item.quantity}></ItemImage>
          <ItemContent quantity={item.quantity} discount={item.discount}></ItemContent>
          {item.quantity ? <ItemLabel quantity={item.quantity}></ItemLabel> : ``}
        </Item>
      );
    });
  };

  return (
    <>
      <ItemContainer>{createItem()}</ItemContainer>
    </>
  );
};

const Item = styled.article`
  position: relative;
`;

const ItemContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default ItemLists;
