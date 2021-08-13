import styled from '@emotion/styled';
import React from 'react';

import ItemWishButton from '../ItemWishButton/ItemWishButton';

type ImageProps = {
  quantity: number;
};

const ItemImage = ({ quantity }: ImageProps) => {
  return (
    <ImageContainer>
      <ProductImg src="images/sampleItem.jpeg" />
      {!quantity ? <SoldOutImg src="images/soldout.png" /> : ``}
      {quantity ? <ItemWishButton /> : ``}
    </ImageContainer>
  );
};

export default ItemImage;

const ImageContainer = styled.div`
  position: relative;
  width: 285px;
  height: 350px;
  margin-bottom: 12px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
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
