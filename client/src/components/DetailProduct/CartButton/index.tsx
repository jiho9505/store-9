import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import { baeminFont, greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';
import ModalPortal from '@/utils/portal';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';
import AuthStore from '@/stores/AuthStore';
import OrderApi from '@/apis/OrderApi';

type CartModeType = 'notlogin' | 'add' | 'fail';

const addCartSuccessMsg = '장바구니에 추가하였습니다.';
const addCartFailMsg = '장바구니 추가를 실패하였습니다.';

type CartProps = {
  selectedStock: number;
};
const Cart = ({ selectedStock }: CartProps) => {
  const { info } = useContext(ProductContext);
  const [message, setMessage] = useState<Message>({
    showMessage: false,
    messageContent: '',
    messageMode: 'fail',
  });
  let timer: number = 0;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  /**
   * TODO:
   * 백에서 동일한 장바구니의 경우 중복제거를 해서 최신것을 넣어주면 좋을듯
   * { productId: 55, amount: 2 } 수정할것
   *
   */
  const handleClickText = async () => {
    if (!AuthStore.isLogined) return viewMsgByUserStatus('notlogin');

    try {
      const result = await OrderApi.addCartItem({ productId: 55, amount: selectedStock });
      if (result.ok) {
        console.log(result);
        viewMsgByUserStatus('add');
      }
    } catch (e) {
      viewMsgByUserStatus('fail');
    }
  };

  const createMsg = (mode: MessageModeType, title: string) => {
    setMessage({ showMessage: true, messageContent: title, messageMode: mode });

    timer = setTimeout(() => {
      setMessage({ ...message, showMessage: false });
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: CartModeType) => {
    if (mode === 'notlogin') {
      createMsg('fail', requireLoginMsg);
    } else if (mode === 'add') {
      createMsg('success', addCartSuccessMsg);
    } else if (mode === 'fail') {
      createMsg('fail', addCartFailMsg);
    }
  };

  return (
    <CartContainer onClick={handleClickText}>
      <span>장바구니</span>
      {message.showMessage && (
        <ModalPortal>
          <Message text={message.messageContent} mode={message.messageMode} />
        </ModalPortal>
      )}
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 52px;
  border: 1px solid ${greyLine};
  cursor: pointer;
  span {
    font-size: 18px;
    font-family: ${baeminFont};
  }
`;
