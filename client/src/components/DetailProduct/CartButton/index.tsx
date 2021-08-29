import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import { baeminFont, greyLine } from '@/static/style/common';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';
import ModalPortal from '@/utils/portal';
import AuthStore from '@/stores/AuthStore';
import OrderApi from '@/apis/OrderApi';
import DetailProductStore from '@/stores/DetailProductStore';

type CartModeType = 'notlogin' | 'add' | 'fail';
const addCartSuccessMsg = '장바구니에 추가하였습니다.';
const addCartFailMsg = '장바구니 추가를 실패하였습니다.';
let timer: number = 0;

type CartProps = {
  selectedStock: number;
};

const Cart = ({ selectedStock }: CartProps) => {
  const [message, setMessage] = useState<Message>({
    showMessage: false,
    messageContent: '',
    messageMode: 'fail',
  });

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const handleClickText = async () => {
    if (!AuthStore.isLogined) return viewMsgByUserStatus('notlogin');

    try {
      const result = await OrderApi.addCartItem({
        productId: DetailProductStore.product.productId,
        amount: selectedStock,
      });
      if (result.ok) {
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
      createMsg('fail', alertMsg['REQUIRED_LOGIN']);
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
