import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@/Router';

type ImageProps = {
  quantity: number;
  productImage: string;
};

const ItemImage = ({ quantity, productImage }: ImageProps) => {
  return (
    <ImageContainer>
      <Link to="/detail">
        <ProductImg referrerPolicy="no-referrer" src={productImage} />
        {!quantity ? <SoldOutImg src="images/soldout.png" /> : ``}
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
