import React from 'react';
import styled from '@emotion/styled';

import { Link } from '@/core/Router';
import Button from '@/components/common/Button';

const LOGIN_SUGGESTION_TEXT = '이미 배민문방구 회원이신가요?';
const githubAuthUrl = 'https://github.com/login/oauth/authorize';
const CLIENT_ID = '79b5ee470c52ef9c3eac';

const SignupMethod = () => {
  return (
    <SignupMethodContainer>
      <SignupButtonContainer>
        <Link to="/signup">
          <Button theme="normal" size="xlarge" value="배민 문방구로 회원가입" type="button" />
        </Link>
        <a href={`${githubAuthUrl}?client_id=${CLIENT_ID}`}>
          <Button theme="github" size="large" value="Github로 회원가입" type="button" />
        </a>
        <LoginSuggestionText>
          {LOGIN_SUGGESTION_TEXT} <Link to="/login">로그인</Link>
        </LoginSuggestionText>
      </SignupButtonContainer>
    </SignupMethodContainer>
  );
};

export default SignupMethod;

const signUpMethodPageHeight = '500px';
const signUpButtonMarginBottom = '30px';
const textGrey = '#6d6d6d';
const fontSemiBold = 700;

const SignupMethodContainer = styled.section`
  width: 100%;
  height: ${signUpMethodPageHeight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: ${signUpButtonMarginBottom};
  }
  a {
    font-weight: ${fontSemiBold};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginSuggestionText = styled.p`
  color: ${textGrey};
  font-size: 0.8rem;
  text-align: center;
`;
