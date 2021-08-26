import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Message from '../common/Message';
import useHistory from '@/hooks/customHooks/useHistory';

import ModalPortal from '@/utils/portal';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';
import NOTLOGIN from '@/static/assets/img/notlogin.gif';

const Redirect = () => {
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsShow(true);
    setTimeout(() => {
      history.push('/');
    }, showErrorMsgTime);
  }, []);
  return (
    <>
      <RedirectContainer>
        <img src={NOTLOGIN} />
      </RedirectContainer>
      {isShow && (
        <ModalPortal>
          <Message text={requireLoginMsg} mode="fail" />
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

export default Redirect;
