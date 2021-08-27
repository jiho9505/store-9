import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import guguStyled from '@/core/styled';
import ItemImage from './ItemImage/ItemImage';
import ItemLabel from './ItemLabel/ItemLabel';
import ItemContent from './ItemContent/ItemContent';
import StarComponent from '../Star';

import EMPTY from '@/static/assets/img/empty.png';
import { baeminFont, greySpan, red1 } from '@/static/style/common';

type ItemListsProps = {
  observeTag?: () => void;
  products;
};

/**
 * TODO:
 * API 연동 후 값 동적으로 넣어야 합니다.
 * 별점과 라이크는 0이어도 띄우고 옆에 개수를 나타낸다.
 */
const ItemLists = ({ observeTag, products }: ItemListsProps) => {
  const createItem = () => {
    return products.length > 0 ? (
      products.map((item, idx) => (
        <Item key={idx} className="item">
          <ItemImage productImage={item.image} quantity={item.quantity}></ItemImage>
          <ItemContent item={item}></ItemContent>
          {item.quantity ? <ItemLabel product={item}></ItemLabel> : ``}
          <StarContainer>
            <StarComponent score={5} />
            <span>352</span>
          </StarContainer>
          <LikeContainer>
            <i className="fas fa-heart"></i>
            <span>777</span>
          </LikeContainer>
        </Item>
      ))
    ) : (
      <EmptyContainer>
        <img src={EMPTY} />
        <EmptyMessage>해당 제품이 없습니다...</EmptyMessage>
      </EmptyContainer>
    );
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

const EmptyMessage = guguStyled.span`
  color: ${greySpan};
  font-size: 20px;
  font-family: ${baeminFont};
`;

const EmptyContainer = guguStyled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
`;

const LikeContainer = guguStyled.div`
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

const StarContainer = guguStyled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${red1};
  font-size: 13px;
  i {
    margin-bottom: 2px;
  }

  span {
    margin-left: 5px;
  }
`;

const EndPositionTag = styled.div``;

const Item = guguStyled.article`
  position: relative;
`;

const ItemContainer = guguStyled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;
`;

export default ItemLists;
