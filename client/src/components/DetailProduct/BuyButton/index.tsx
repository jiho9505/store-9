import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import useHistory from '@/hooks/customHooks/useHistory';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';
import { ProductContext } from '@/hooks/context';
import { greyLine, baeminFont } from '@/static/style/common';
import AuthStore from '@/stores/AuthStore';
import ModalPortal from '@/utils/portal';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';
import OrderApi from '@/apis/OrderApi';

const alertMsg = '과정에서 에러가 발생하였습니다';

type BuyProps = {
  selectedStock: number;
};

const Buy = ({ selectedStock }: BuyProps) => {
  const { info } = useContext(ProductContext);
  const history = useHistory();
  const [BuyInfo, setBuyInfo] = useLocalStorage('cartInfo', {});
  const [showMessage, setShowMessage] = useState<boolean>(false);

  let timer: number = 0;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  /**
   * TODO:
   * 반환값을 이용하여
   * 슬랙에서 받은 사진과 같은 데이터 형식으로 보낼것
   */
  const handleClickText = async () => {
    if (!AuthStore.isLogined) return createMsg();
    try {
      const result = await OrderApi.addCartItem({ productId: 2, amount: selectedStock });
      if (result.ok) {
        const { amount, order_id: orderId } = result.data;

        setBuyInfo({
          cartId: result.data.id,
          products: [
            {
              id: orderId,
              amount,
              product: info,
            },
          ],
        });
        history.push('/order');
      }
    } catch (e) {
      alert(alertMsg);
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
          <Message text={requireLoginMsg} mode="fail" />
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
