import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@/core/Router';

import SOLDOUT from '@/static/assets/img/soldout.png';

/**
 * Type 적용
 */
type ImageProps = {
  item;
};

const ItemImage = ({ item }: ImageProps) => {
  return (
    <ImageContainer>
      <Link to={`/detail?id=${item.productId}`}>
        <ProductImg referrerPolicy="no-referrer" src={item.thumbnail} />
        {!item.stock ? <SoldOutImg src={SOLDOUT} /> : ``}
      </Link>
    </ImageContainer>
  );
};

export default ItemImage;

const ImageContainer = styled.div`
  position: relative;
  width: 285px;
  height: 350px;
  margin-bottom: 12px;
  overflow: hidden;
  border-radius: 10px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SoldOutImg = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: transparent;
  border-radius: 10px;
`;
