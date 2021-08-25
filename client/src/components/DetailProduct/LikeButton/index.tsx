import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import Message from '@/components/common/Message';

import { greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';
import ModalPortal from '@/utils/portal';
import { requireLoginMsg } from '@/static/constants';

type MessageModeType = 'success' | 'fail';
type LikeModeType = 'notlogin' | 'add' | 'remove';
const showErrorMsgTime = 1500;

const Like = () => {
  const { info } = useContext(ProductContext);
  const [isIconActive, setIsIconActive] = useState(false);
  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [messageMode, setMessageMode] = useState<MessageModeType>('fail');

  let timer: number = 0;

  useEffect(() => {
    // setIsIconActive(info.userLiked)
    return () => clearTimeout(timer);
  }, []);

  const createMsg = (mode: MessageModeType, title: string) => {
    setshowMessage(true);
    setMessageMode(mode);
    setMessageContent(title);
    timer = setTimeout(() => {
      setshowMessage(false);
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: LikeModeType) => {
    if (mode === 'notlogin') {
      createMsg('fail', requireLoginMsg);
    } else if (mode === 'add') {
      createMsg('success', '관심목록에 추가하였습니다.');
    } else if (mode === 'remove') {
      createMsg('success', '관심목록에 제거하였습니다.');
    }
  };

  /**
   * TODO:
   * 로그인했다면 2번으로 넘어가서 post 혹은 delete하며 setState 해줍니다 (반환값 필요X)
   * 그 후 관심상품으로 등록하였다는 메시지를 보여줍니다.
   * 로그인이 안됐다면 1번에서 끝납니다.
   *
   * 여기서 분기문 쓰면 됩니다.
   */
  const handleClickBtn = () => {
    viewMsgByUserStatus('add');
    setIsIconActive(true);
  };

  return (
    <LikeContainer>
      <i className={`${isIconActive ? 'fas' : 'far'} fa-heart`} onClick={handleClickBtn}></i>
      {showMessage && (
        <ModalPortal>
          <Message text={messageContent} mode={messageMode} />
        </ModalPortal>
      )}
    </LikeContainer>
  );
};

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

export default Like;
