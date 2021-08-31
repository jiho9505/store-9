import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import useHistory from '@/hooks/customHooks/useHistory';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';
import { greyLine, baeminFont } from '@/static/style/common';
import AuthStore from '@/stores/AuthStore';
import ModalPortal from '@/utils/portal';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';
import OrderApi from '@/apis/OrderApi';
import DetailProductStore from '@/stores/DetailProductStore';

type BuyProps = {
  selectedStock: number;
};
let timer: number = 0;

const Buy = ({ selectedStock }: BuyProps) => {
  const history = useHistory();
  const [BuyInfo, setBuyInfo] = useLocalStorage('cartInfo', {});
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const handleClickText = async () => {
    if (!AuthStore.isLogined) return createMsg();
    try {
      const result = await OrderApi.addCartItem({
        productId: DetailProductStore.product.productId,
        amount: selectedStock,
      });
      if (result.ok) {
        const { id, amount, order_id } = result.data;
        setBuyInfo({
          cartId: order_id,
          products: [
            {
              id,
              amount,
              product: DetailProductStore.product,
            },
          ],
        });
        history.push('/order');
      }
    } catch (e) {
      alert(alertMsg.ERROR_MSG);
    }
  };

  const createMsg = () => {
    setShowMessage(true);
    timer = setTimeout(() => {
      setShowMessage(false);
    }, showErrorMsgTime);
  };

  return (
    <BuyContainer onClick={handleClickText}>
      <span>바로 구매</span>
      {showMessage && (
        <ModalPortal>
          <Message text={alertMsg['REQUIRED_LOGIN']} mode="fail" />
        </ModalPortal>
      )}
    </BuyContainer>
  );
};

const BuyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 52px;
  border: 1px solid ${greyLine};
  background-color: black;
  color: white;
  cursor: pointer;
  span {
    font-size: 18px;
    font-family: ${baeminFont};
  }
`;

export default Buy;
