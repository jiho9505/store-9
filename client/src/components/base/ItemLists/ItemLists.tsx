import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import ItemImage from './ItemImage/ItemImage';
import ItemLabel from './ItemLabel/ItemLabel';
import ItemContent from './ItemContent/ItemContent';
import StarComponent from '../Star';

import '@/static/assets/img/sampleItem.jpeg';
import '@/static/assets/img/soldout.png';
import { red1 } from '@/static/style/common';

type ItemListsProps = {
  observeTag?: () => void;
  products;
};

/**
 * TODO:
 * API 연동 후 값 동적으로 넣어야 합니다.
 */
const ItemLists = ({ observeTag, products }: ItemListsProps) => {
  const createItem = () => {
    return products.map((item, idx) => (
      <Item key={idx} className="item">
        <ItemImage productImage={item.image} quantity={item.quantity}></ItemImage>
        <ItemContent item={item}></ItemContent>
        {item.quantity ? <ItemLabel product={item}></ItemLabel> : ``}
        <StarContainer>
          <StarComponent score={5} />
        </StarContainer>
        <LikeContainer>
          <i className="fas fa-heart"></i>
          <span>777</span>
        </LikeContainer>
      </Item>
    ));
  };

  useEffect(() => {
    observeTag && observeTag();
  }, [products]);

  return (
    <>
      <ItemContainer>
        {createItem()}
        <EndPositionTag className="item" id="end" />
      </ItemContainer>
    </>
  );
};

const LikeContainer = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${red1};
  font-size: 13px;
  i {
    margin-bottom: 2px;
  }
`;

const StarContainer = styled.div`
  margin-top: 8px;
  font-size: 12px;
`;

const EndPositionTag = styled.div``;

const Item = styled.article`
  position: relative;
`;

const ItemContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export default ItemLists;
