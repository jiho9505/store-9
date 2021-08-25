import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import { baeminFont, greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';
import ModalPortal from '@/utils/portal';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';

type MessageModeType = 'success' | 'fail';
type CartModeType = 'notlogin' | 'add';
const addCartMsg = '장바구니에 추가하였습니다.';

const Cart = () => {
  const { info } = useContext(ProductContext);
  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [messageMode, setMessageMode] = useState<MessageModeType>('fail');

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
    // history.push('/cart');
  };

  const createMsg = (mode: MessageModeType, title: string) => {
    setshowMessage(true);
    setMessageMode(mode);
    setMessageContent(title);
    timer = setTimeout(() => {
      setshowMessage(false);
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: CartModeType) => {
    if (mode === 'notlogin') {
      createMsg('fail', requireLoginMsg);
    } else if (mode === 'add') {
      createMsg('success', addCartMsg);
    }
  };

  return (
    <CartContainer onClick={handleClickText}>
      <span>장바구니</span>
      {showMessage && (
        <ModalPortal>
          <Message text={messageContent} mode={messageMode} />
        </ModalPortal>
      )}
    </CartContainer>
  );
};

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

export default Cart;
