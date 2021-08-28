import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { baeminFont, greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';

import Message from '@/components/common/Message';
import ModalPortal from '@/utils/portal';

type CartModeType = 'notlogin' | 'add';

const addCartMsg = '장바구니에 추가하였습니다.';

const Cart = () => {
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
   * 로그인 유무에 따라
   * POST (userid,productid,stock ...etc)
   * 에러메시지 띄웁니다
   */
  const handleClickText = () => {
    viewMsgByUserStatus('add');
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
      createMsg('success', addCartMsg);
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
