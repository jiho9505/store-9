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

    if (error === 'access_denied' || error) {
      // 취소 눌렀을때
      history.go(-2);
      return;
    }
    const requestGithubLogin = async () => {
      try {
        const {
          data: { id, isNotJoined },
        }: AxiosResponse<GithubAuthResponse> = await axios.post(
          'http://localhost:4000/api/auth/github',
          codeData,
          { withCredentials: true }
        );
        if (isNotJoined) {
          localStorage.setItem('loginId', id);
          history.push('/signup');
        } else {
          await AuthStore.check();
          history.push('/');
        }
      } catch (err) {
        alert('깃허브 로그인에 실패했습니다. 홈으로 돌아갑니다');
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
