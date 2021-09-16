import React, { memo } from 'react';
import styled from '@emotion/styled';

import EmptyPannel from '../EmptyPannel';
import ItemImage from './ItemImage/ItemImage';
import ItemLabel from './ItemLabel/ItemLabel';
import ItemContent from './ItemContent/ItemContent';
import StarComponent from '../Star';

import { baeminFont, greySpan, red1 } from '@/static/style/common';

type ItemListsProps = {
  products: {
    productId?: number;
    name?: string;
    reviewAverageRate?: number;
    reviewCount?: number;
    likeCount?: number;
    discountRate?: number;
    isGreen?: boolean;
    badges?: string[];
    stock?: number;
  }[];
};

const ItemLists = ({ products }: ItemListsProps) => {
  const createItem = () => {
    return products.length > 0 ? (
      products.map((item, idx) => {
        return (
          <Item key={item.productId}>
            <ItemImage item={item}></ItemImage>
            <ItemContent item={item}></ItemContent>
            {item.stock ? <ItemLabel product={item}></ItemLabel> : ``}
            <StarContainer>
              <StarComponent score={item.reviewAverageRate} />
              <span>{item.reviewCount}</span>
            </StarContainer>
            <LikeContainer>
              <i className="fas fa-heart"></i>
              <span>{item.likeCount}</span>
            </LikeContainer>
            {idx === products.length - 1 && <End id="end" />}
          </Item>
        );
      })
    ) : (
      <EmptyContainer>
        <EmptyPannel />
        <EmptyMessage>해당 제품이 없습니다...</EmptyMessage>
      </EmptyContainer>
    );
  };

  return <ItemContainer>{createItem()}</ItemContainer>;
};

export default memo(ItemLists);

const End = styled.div``;

const EmptyMessage = styled.span`
  color: ${greySpan};
  font-size: 20px;
  font-family: ${baeminFont};
`;

const EmptyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
`;

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
  color: ${red1};
  font-size: 13px;
  i {
    margin-bottom: 2px;
  }

  span {
    margin-left: 5px;
  }
`;

const Item = styled.article`
  position: relative;
`;

const ItemContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 40px 20px;
`;
