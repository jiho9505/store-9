import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import axios, { AxiosResponse } from 'axios';

import useHistory from '@/hooks/customHooks/useHistory';
import Loading from '../Loading';
import AuthStore from '@/stores/AuthStore';

type GithubAuthResponse = {
  ok: boolean;
  id?: string;
  isNotJoined?: boolean;
  message: string;
};

const Callback = () => {
  const history: History = useHistory();

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const code: string = qs.get('code');
    const error: string = qs.get('error');
    const codeData = { code };

    if (!code) {
      history.push('/');
      return;
    }

    if (error === 'access_denied' || error) {
      // 취소 눌렀을때
      history.go(-2);
      return;
    }
    const requestGithubLogin = async () => {
      const result = await AuthStore.githubLogin(codeData);

      if (!result.ok) {
        alert('깃허브 로그인에 실패했습니다. 홈으로 돌아갑니다');
        history.push('/');
        return;
      }

      if (result.isNotJoined) {
        localStorage.setItem('loginId', result.id);
        history.push('/signup');
      } else {
        await AuthStore.check();
        history.push('/');
      }
    };
    requestGithubLogin();
  }, []);

  return (
    <CallbackContainer>
      <Loading size="big" />
    </CallbackContainer>
  );
};

const CallbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

export default Callback;
