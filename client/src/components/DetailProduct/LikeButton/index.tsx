import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import UserApi from '@/apis/UserApi';
import { greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';
import ModalPortal from '@/utils/portal';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';
import AuthStore from '@/stores/AuthStore';

type LikeModeType = 'notlogin' | 'add' | 'remove' | 'fail';
const addLikeMsg = '관심목록에 추가하였습니다.';
const removeLikeMsg = '관심목록에서 제거하였습니다.';
const addLikeFailMsg = '관심목록 추가가 안되었습니다.';

const Like = () => {
  const { info } = useContext(ProductContext);
  const [isIconActive, setIsIconActive] = useState(false);
  const [message, setMessage] = useState<Message>({
    showMessage: false,
    messageContent: '',
    messageMode: 'fail',
  });
  let timer: number = 0;

  useEffect(() => {
    if (!AuthStore.isLogined) setIsIconActive(false);
    return () => clearTimeout(timer);
  }, []);

  const createMsg = (mode: MessageModeType, title: string) => {
    setMessage({ showMessage: true, messageContent: title, messageMode: mode });

    timer = setTimeout(() => {
      setMessage({ ...message, showMessage: false });
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: LikeModeType) => {
    if (mode === 'notlogin') {
      createMsg('fail', requireLoginMsg);
    } else if (mode === 'add') {
      createMsg('success', addLikeMsg);
    } else if (mode === 'remove') {
      createMsg('success', removeLikeMsg);
    } else if (mode === 'fail') {
      createMsg('fail', addLikeFailMsg);
    }
  };

  /**
   * TODO:
   * { productId: 55 }) 수정할것
   */
  const handleClickBtn = async () => {
    if (!AuthStore.isLogined) return viewMsgByUserStatus('notlogin');

    try {
      const result = await UserApi.toggleLike({ productId: 2 });
      if (result.ok) {
        if (isIconActive) {
          viewMsgByUserStatus('remove');
          setIsIconActive(false);
        } else if (!isIconActive) {
          viewMsgByUserStatus('add');
          setIsIconActive(true);
        }
      }
    } catch (e) {
      viewMsgByUserStatus('fail');
    }
  };

  return (
    <LikeContainer>
      <i className={`${isIconActive ? 'fas' : 'far'} fa-heart`} onClick={handleClickBtn}></i>
      {message.showMessage && (
        <ModalPortal>
          <Message text={message.messageContent} mode={message.messageMode} />
        </ModalPortal>
      )}
    </LikeContainer>
  );
};

export default Like;

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid ${greyLine};
  i {
    cursor: pointer;
    font-size: 25px;
  }
`;
