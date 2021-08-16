import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import ItemImage from './ItemImage/ItemImage';
import ItemLabel from './ItemLabel/ItemLabel';
import ItemContent from './ItemContent/ItemContent';

import '@/static/assets/img/sampleItem.jpeg';
import '@/static/assets/img/soldout.png';

type ItemListsProps = {
  observeTag?: () => void;
  products;
};

/**
 * TODO:
 * ItemImage에 src만 주면 될듯
 */
const ItemLists = ({ observeTag, products }: ItemListsProps) => {
  const createItem = () => {
    return products.map((item, idx) => (
      <Item key={idx} className="item">
        <ItemImage quantity={item.quantity}></ItemImage>
        <ItemContent item={item}></ItemContent>
        {item.quantity ? <ItemLabel product={item}></ItemLabel> : ``}
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
