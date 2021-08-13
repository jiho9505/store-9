import React from 'react';
import styled from '@emotion/styled';

import { Link } from '@/Router';
import Button from '@/components/base/Button';

const LOGIN_SUGGESTION_TEXT = '이미 배민문방구 회원이신가요?';

const SignupMethod = () => {
  const onSignupClick = () => {
    console.log('signup');
  };

  const onGithubSignupClick = () => {
    console.log('github signup');
  };

  return (
    <SignupMethodContainer>
      <SignupButtonContainer>
        <Button
          onClick={onSignupClick}
          theme="normal"
          size="xlarge"
          value="배민 문방구로 회원가입"
          type="button"
        />
        <Button
          onClick={onGithubSignupClick}
          theme="github"
          size="large"
          value="Github로 회원가입"
          type="button"
        />
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
