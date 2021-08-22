import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Link } from '@/Router';
import Input from '@/components/base/Input';
import useInput from '@/hooks/customHooks/useInput';
import Button from '@/components/base/Button';

const CAUTION_TEXT = '주문번호와 비밀번호를 잊으신 경우, 고객센터로 문의하여 주시기 바랍니다.';

const LoginPage = () => {
  const {
    form: { id, password, name, orderNumber },
    onChange,
    reset,
  } = useInput({
    initialState: {
      id: '',
      password: '',
      name: '',
      orderNumber: '',
    },
  });

  const onLoginClick = () => {
    reset();
  };

  const onGithubLoginClick = () => {
    reset();
  };

  return (
    <LoginPageContainer>
      <LoginContainer>
        <LoginHeader>회원 로그인</LoginHeader>
        <LoginForm>
          <Input
            required
            size="medium"
            name="id"
            onChange={onChange}
            value={id}
            placeholder="아이디 입력"
          />
          <Input
            required
            size="medium"
            name="password"
            onChange={onChange}
            value={password}
            placeholder="패스워드 입력"
          />
          <Button
            size="medium"
            value="로그인"
            type="button"
            onClick={onLoginClick}
            theme="normal"
          />
          <Button
            size="medium"
            value="Github 로그인"
            type="button"
            onClick={onGithubLoginClick}
            theme="github"
          />
          <LoginBtnBox>
            <LoginBtnList>
              <Link to="/signup">
                <LoginBtnItem>회원가입</LoginBtnItem>
              </Link>
              <Link to="/signup">
                <LoginBtnItem>아이디 찾기</LoginBtnItem>
              </Link>
              <Link to="/signup">
                <LoginBtnItem>비밀번호 찾기</LoginBtnItem>
              </Link>
            </LoginBtnList>
          </LoginBtnBox>
        </LoginForm>
      </LoginContainer>
      <LoginContainer>
        <LoginHeader>비회원 주문 조회 하기</LoginHeader>
        <LoginForm>
          <Input
            required
            size="medium"
            name="name"
            onChange={onChange}
            value={name}
            placeholder="주문자명"
          />
          <Input
            required
            size="medium"
            name="orderNumber"
            onChange={onChange}
            value={orderNumber}
            placeholder="주문번호"
          />
          <Button
            size="medium"
            value="조회하기"
            type="button"
            onClick={onLoginClick}
            theme="normal"
          />
          <CautionText>{CAUTION_TEXT}</CautionText>
        </LoginForm>
      </LoginContainer>
    </LoginPageContainer>
  );
};

export default LoginPage;

const loginPageHeight = '700px';
const formElementMarginBottom = '30px';
const buttonMarginBottom = '20px';
const loginFormGap = '120px';
const loginHeaderFontSize = '1.5rem';
const textGrey = '#6d6d6d';

const LoginHeader = styled.h2`
  font-size: ${loginHeaderFontSize};
  font-weight: 400;
  margin-bottom: ${formElementMarginBottom};
`;

const LoginPageContainer = styled.section`
  width: 100%;
  height: ${loginPageHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${loginFormGap};
`;

const LoginContainer = styled.div`
  height: 60%;
  ${() => centerContentsStyle()}
`;

const LoginForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  div {
    margin-bottom: ${formElementMarginBottom};
    &:nth-of-type(3),
    &:nth-of-type(4) {
      margin-bottom: ${buttonMarginBottom};
    }
  }
`;

const LoginBtnBox = styled.div``;
const LoginBtnList = styled.ul`
  display: flex;
  justify-content: center;
  a {
    display: flex;
    justify-content: center;
    li {
      border-left: 1px solid #dedede;
    }
  }
  a:nth-of-type(1) {
    li {
      border-left: none;
    }
  }
`;
const LoginBtnItem = styled.li`
  text-align: center;
  padding: 0 12px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const CautionText = styled.p`
  color: ${textGrey};
  width: 18rem;
  font-size: 0.8rem;
  line-height: 145%;
`;

const centerContentsStyle = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
