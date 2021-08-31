import React, { useState } from 'react';
import styled from '@emotion/styled';

import StockSelector from '../StockSelector';
import TotalPrice from '../TotalPrice';
import Like from '../LikeButton';
import Cart from '../CartButton';
import Buy from '../BuyButton';

import { calculateDiscount } from '@/utils/calculateDiscount';
import DetailProductStore from '@/stores/DetailProductStore';
import {
  baemin,
  baeminFont,
  baeminThickFont,
  greySpan,
  lightBlack,
  greyLine,
} from '@/static/style/common';
import ProductResponse from '@shared/dtos/product/response';

const OverViewContent = () => {
  const { discountRate, price, name, stock } = DetailProductStore.product;
  const [selectedStock, setSelectedStock] = useState<number>(1);
  const discountPrice: string = discountRate ? calculateDiscount(price, discountRate) : '';

  const createSellPrice = (price: string | number, stock: number) => {
    return (
      <SellPrice>
        <PriceText>판매가격</PriceText>
        <SellPriceValue soldout={!stock}>
          {stock ? `${price.toLocaleString()}원` : '품절'}
        </SellPriceValue>
      </SellPrice>
    );
  };

  const createPrice = ({ discountRate, price, stock }: ProductResponse.GetDetail) => {
    return discountRate ? (
      <PriceContainer>
        {stock > 0 && (
          <OriginalPrice>
            <PriceText>정가</PriceText>
            <OriginalPriceValue>{price}원</OriginalPriceValue>
          </OriginalPrice>
        )}
        {createSellPrice(discountPrice, stock)}
      </PriceContainer>
    ) : (
      <PriceContainer> {createSellPrice(price, stock)}</PriceContainer>
    );
  };

  const refreshStock = (value: number) => {
    setSelectedStock(value);
  };

  const getFinalPrice = () => {
    if (discountRate) {
      return discountPrice ? Number(discountPrice.replace(/[,]/g, '')) : 0;
    }
    return price;
  };

  return (
    <OverviewContent>
      <Title>{name}</Title>
      {createPrice(DetailProductStore.product)}
      <ShipInfo>
        <ShipInfoText>배송정보</ShipInfoText>
        <ShipInfoDetail>
          <div>2,500원 (3만원 이상 구매시 무료)</div>
          <div>오후 2시 당일배송마감</div>
        </ShipInfoDetail>
      </ShipInfo>
      <StockSelector
        title={name}
        price={getFinalPrice()}
        refreshStock={refreshStock}
        selectedStock={selectedStock}
        currStock={stock}
      ></StockSelector>
      <ContentBottomContainer>
        {stock > 0 && (
          <>
            <TotalPrice price={getFinalPrice()} selectedStock={selectedStock}></TotalPrice>
            <ButtonContainer>
              <Like />
              <Cart selectedStock={selectedStock} />
              <Buy selectedStock={selectedStock} />
            </ButtonContainer>
          </>
        )}
      </ContentBottomContainer>
    </OverviewContent>
  );
};

export default OverViewContent;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 23px;
`;
const ContentBottomContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  border-top: 1px solid ${greyLine};
  width: 100%;
`;
const OverviewContent = styled.div`
  width: 556px;
  height: 585px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 35px;
  color: ${lightBlack};
  font-family: ${baeminFont};
`;

const OriginalPrice = styled.div`
  display: flex;
`;

const SellPrice = styled.div`
  display: flex;
  margin-top: 25px;
`;

const PriceContainer = styled.div`
  margin-top: 40px;
`;

const PriceText = styled.div`
  color: ${greySpan};
  font-family: ${baeminFont};
  font-size: 19px;
  width: 100px;
`;

const OriginalPriceValue = styled.span`
  text-decoration: line-through;
  color: ${lightBlack};
  font-size: 19px;
`;

type SellPriceValueProps = {
  soldout: boolean;
};

const SellPriceValue = styled.span<SellPriceValueProps>`
  font-family: ${baeminThickFont};
  color: ${(props) => (props.soldout ? baemin : lightBlack)};
  font-size: 19px;
`;

const ShipInfo = styled.div`
  display: flex;
  margin-top: 25px;
`;

const ShipInfoText = styled.div`
  color: ${greySpan};
  font-family: ${baeminFont};
  font-size: 19px;
  width: 100px;
`;

const ShipInfoDetail = styled.div`
  font-family: ${baeminFont};
  font-size: 17px;
  color: ${lightBlack};
`;
