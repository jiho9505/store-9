import React from 'react';
import styled from '@emotion/styled';
import { baeminFont, greySpan, lightBlack } from '@/static/style/common';

const ShipInfo = () => {
  return (
    <ShipInfoContainer>
      <Title>배송안내</Title>
      <span>· 배송사 : CJ대한통운</span>
      <ShipPrice>
        · 배송비 :
        <div>
          <span>2,500원 (3만원 이상 구매 시 무료배송)</span>
          <div>도서, 산간 일부지역은 배송비가 추가될 수 있습니다.</div>
        </div>
      </ShipPrice>
      <span> · 배송기간: 오후 2시 이전 결제완료시 당일 출고 (영업일 기준)</span>
      <br></br>
      <span>
        단, 상품의 재고 상황, 배송량, 배송 지역에 따라 배송일이 추가로 소요될 수 있는 점 양해
        부탁드립니다.
      </span>
    </ShipInfoContainer>
  );
};

const ShipInfoContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
  color: ${greySpan};
`;

const Title = styled.div`
  font-size: 20px;
  font-family: ${baeminFont};
  color: ${lightBlack};
  margin-bottom: 15px;
`;

const ShipPrice = styled.div`
  display: flex;
`;

export default ShipInfo;
