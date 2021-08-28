import React, { useState, useContext } from 'react';
import { calculateDiscount } from '@/utils/calculateDiscount';
import StockSelector from '../StockSelector';
import TotalPrice from '../TotalPrice';
import Like from '../LikeButton';
import Cart from '../CartButton';
import Buy from '../BuyButton';

import styled from '@emotion/styled';
import {
  baemin,
  baeminFont,
  baeminThickFont,
  greySpan,
  lightBlack,
  greyLine,
} from '@/static/style/common';

import { ProductContext } from '@/hooks/context';

const OverViewContent = () => {
  const { info } = useContext(ProductContext);
  const [selectedStock, setSelectedStock] = useState(1);
  const discountPrice = info.discountRate ? calculateDiscount(info.price, info.discountRate) : '';

  const createSellPrice = (price, stock) => {
    return (
      <SellPrice>
        <PriceText>판매가격</PriceText>
        <SellPriceValue soldout={!stock}>{stock ? `${price}원` : '품절'}</SellPriceValue>
      </SellPrice>
    );
  };

  const createPrice = ({ discountRate, price, stock }: Info) => {
    return discountRate ? (
      <PriceContainer>
        {stock ? (
          <OriginalPrice>
            <PriceText>정가</PriceText>
            <OriginalPriceValue>{price}원</OriginalPriceValue>
          </OriginalPrice>
        ) : (
          ''
        )}
        {createSellPrice(discountPrice, stock)}
      </PriceContainer>
    ) : (
      <PriceContainer> {createSellPrice(price, stock)}</PriceContainer>
    );
  };

  const refreshStock = (value) => {
    setSelectedStock(value);
  };

  const getFinalPrice = () => {
    if (info.discountRate) {
      return discountPrice ? Number(discountPrice.replace(/[,]/g, '')) : 0;
    }
    return info.price;
  };

  return (
    <OverviewContent>
      <Title>{info.name}</Title>
      {createPrice(info)}
      <ShipInfo>
        <ShipInfoText>배송정보</ShipInfoText>
        <ShipInfoDetail>
          <div>2,500원 (3만원 이상 구매시 무료)</div>
          <div>오후 2시 당일배송마감</div>
        </ShipInfoDetail>
      </ShipInfo>
      <StockSelector
        title={info.name}
        price={getFinalPrice()}
        refreshStock={refreshStock}
        selectedStock={selectedStock}
        currStock={info.stock}
      ></StockSelector>
      <ContentBottomContainer>
        {info.stock ? (
          <>
            <TotalPrice price={getFinalPrice()} selectedStock={selectedStock}></TotalPrice>
            <ButtonContainer>
              <Like />
              <Cart selectedStock={selectedStock} />
              <Buy selectedStock={selectedStock} />
            </ButtonContainer>
          </>
        ) : (
          ''
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
