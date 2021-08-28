import React, { useState } from 'react';
import useLocation from '@/hooks/customHooks/useLocation';
import styled from '@emotion/styled';

import { baeminFont, normalRadius, primary1, white } from '@/static/style/common';
import { alertMsg } from '@/utils/errorMessage';
import useHistory from '@/hooks/customHooks/useHistory';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';

import ModalPortal from '@/utils/portal';
import Message from '@/components/common/Message';

type PricePannelProps = {
  productTotalPrice: number;
};

const PricePannel = ({ productTotalPrice }: PricePannelProps) => {
  const [cartInfo, _] = useLocalStorage('cartInfo', { cartId: 0, products: [] });
  const curLocation = useLocation();
  const history = useHistory();
  const deliveryCost = productTotalPrice < 30000 ? 2500 : 0;

  const [isActiveModal, setActiveModal] = useState(false);

  const handleClickOrderBtn = async () => {
    if (curLocation === '/cart') {
      const { products } = cartInfo;
      if (products.length === 0) {
        console.log('a');
        setActiveModal(true);
        return;
      }
      history.push('/order');
    }
  };

  return (
    <PricePannelContainer>
      <ProductTotalPrice>
        <span>상품금액</span>
        <span>{productTotalPrice.toLocaleString()}원</span>
      </ProductTotalPrice>
      <DeliveryTotalPrice>
        <span>배송비</span>
        <span>{deliveryCost.toLocaleString()}원</span>
      </DeliveryTotalPrice>
      <TotalPrice>
        <span>합계</span>
        <span>{(productTotalPrice + deliveryCost).toLocaleString()}원</span>
      </TotalPrice>
      <OrderButton onClick={handleClickOrderBtn}>주문하기</OrderButton>
      {isActiveModal && (
        <ModalPortal>
          <Message text={alertMsg['EMPTY_ORDER']} mode="caution" />
        </ModalPortal>
      )}
    </PricePannelContainer>
  );
};

const PricePannelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: fit-content;
  padding: 20px;
  & div:not(:last-of-type) {
    margin-bottom: 15px;
  }
`;

const ProductTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-family: ${baeminFont};
  }
`;

const DeliveryTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-family: ${baeminFont};
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-family: ${baeminFont};
  }
`;

const OrderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${primary1};
  color: ${white};
  margin-top: 15px;
  width: 100%;
  height: 40px;
  border-radius: ${normalRadius};
  font-family: ${baeminFont};
  font-size: 20px;
`;

export default PricePannel;
