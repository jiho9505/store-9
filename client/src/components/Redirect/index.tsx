import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import Message from '../common/Message';
import useHistory from '@/hooks/customHooks/useHistory';

import ModalPortal from '@/utils/portal';
import AuthStore from '@/stores/AuthStore';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';
import NOTLOGIN from '@/static/assets/img/notlogin.gif';

let timer = null;
const Redirect = ({ redirectMessage = alertMsg.REQUIRED_LOGIN }) => {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsShow(true);
    timer = setTimeout(() => {
      history.push('/');
    }, showErrorMsgTime);
    return () => {
      clearTimeout(timer);
    };
  }, [AuthStore.isLogined]);
  return (
    <>
      <RedirectContainer>
        <img src={NOTLOGIN} />
      </RedirectContainer>
      {isShow && (
        <ModalPortal>
          <Message text={redirectMessage} mode="fail" />
        </ModalPortal>
      )}
    </>
  );
};

const RedirectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default observer(Redirect);
