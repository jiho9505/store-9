import React from 'react';

import OrderStageHeader from '@/components/common/OrderStageHeader';

import styled from '@/core/styled';
import { normalContainerWidth, baemin, baeminFont } from '@/static/style/common';

import OrderFinishImg from '@/static/assets/img/orderFinish.png';
import useHistory from '@/hooks/customHooks/useHistory';

const FinishOrder = () => {
  const history = useHistory();

  const handleClickMoveBtn = () => {
    history.push('/mypage/order');
  };

  return (
    <FinishOrderContainer>
      <OrderStageHeader title="주문완료" />
      <OrderFinishImgContainer>
        <div>
          <span>주문해 주셔서 감사합니다.</span>
        </div>
        <img src={OrderFinishImg} />
        <Button onClick={handleClickMoveBtn}>주문목록</Button>
      </OrderFinishImgContainer>
    </FinishOrderContainer>
  );
};

export default FinishOrder;

const FinishOrderContainer = styled.div`
  width: ${normalContainerWidth};
  margin: 0 auto;
`;

const OrderFinishImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 20px auto 0;
  & span {
    font-family: ${baeminFont};
    font-size: 30px;
  }
  & > img {
    width: 100%;
    margin: 30px 0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  width: 250px;
  height: 50px;
  background: ${baemin};
  border-radius: 8px;
  border: none;
  color: white;
  margin-bottom: 10px;
  font-family: ${baeminFont};
  font-size: 25px;
`;
