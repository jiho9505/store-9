import React, { useRef } from 'react';
import styled from '@emotion/styled';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import Input from '@/components/base/Input';
import useAddress from '@/hooks/customHooks/useAddress';
import Button from '@/components/common/Button';
import { baeminFont, greyLine } from '@/static/style/common';
import AuthApi from '@/apis/AuthApi';
import useHistory from '@/hooks/customHooks/useHistory';

const SignupPage = () => {
  const {
    onAddressSearchClick,
    address: { address, postcode },
  } = useAddress();
  const history = useHistory();
  const signUpFormRef = useRef<HTMLFormElement>(null);
  // global store로 변경 예정
  const getGithubLoginId = () => localStorage.getItem('loginId');
  const isGithubLogin = !!getGithubLoginId();

  const isFormValid = (data) => {
    for (const [inputName, inputValue] of data.entries()) {
      if (inputName === 'confirmPassword') {
        if (!validation[inputName](inputValue, data.get('password'))) {
          return false;
        }
        continue;
      }
      if (!validation[inputName](inputValue)) {
        return false;
      }
    }
    return true;
  };

  const onSignupFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(signUpFormRef.current);
    if (!isFormValid(form)) {
      return;
    }
    const data = await AuthApi.signup(form);
    if (data.ok) {
      history.push('/login');
    }
  };

  return (
    <SignupPageContainer>
      <SignupForm onSubmit={onSignupFormSubmit} ref={signUpFormRef} encType="multipart/form-data">
        <SignupList>
          <ListItem>
            <Label htmlFor="id">아이디</Label>
            <InputContainer>
              <Input
                id="id"
                required
                variant="outlined"
                size="large"
                name="id"
                readOnly={isGithubLogin}
                type="text"
                defaultValue={isGithubLogin ? getGithubLoginId() : ''}
              />
            </InputContainer>
          </ListItem>
          {!isGithubLogin && (
            <>
              <ListItem>
                <Label htmlFor="password">비밀번호</Label>
                <InputContainer>
                  <Input
                    id="password"
                    variant="outlined"
                    size="medium"
                    name="password"
                    type="password"
                  />
                </InputContainer>
              </ListItem>
              <ListItem>
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <InputContainer>
                  <Input
                    id="confirmPassword"
                    variant="outlined"
                    size="medium"
                    name="confirmPassword"
                    type="password"
                  />
                </InputContainer>
              </ListItem>
            </>
          )}
          <ListItem>
            <Label htmlFor="name">이름</Label>
            <InputContainer>
              <Input id="name" variant="outlined" size="large" name="name" type="text" />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="email">이메일</Label>
            <InputContainer>
              <Input id="email" variant="outlined" size="medium" name="email" type="email" />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="phoneNumber">휴대폰번호</Label>
            <InputContainer>
              <Input
                id="phoneNumber"
                variant="outlined"
                size="small"
                name="phoneNumber"
                type="text"
                placeholder="- 없이 입력하세요"
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="callNumber">전화번호</Label>
            <InputContainer>
              <Input
                id="callNumber"
                variant="outlined"
                size="large"
                name="callNumber"
                type="text"
                placeholder="- 없이 입력하세요"
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="address">주소</Label>
            <InputContainer>
              <AddressContainer>
                <Input
                  readOnly
                  variant="outlined"
                  size="small"
                  name="postcode"
                  type="text"
                  value={postcode}
                  placeholder="우편번호 입력"
                />
                <Button
                  size="xsmall"
                  value="주소 찾기"
                  type="button"
                  onClick={onAddressSearchClick}
                  theme="white"
                />
              </AddressContainer>
              <Input
                readOnly
                variant="outlined"
                size="large"
                name="address1"
                type="text"
                value={address}
              />
              <Input
                id="address"
                variant="outlined"
                size="large"
                name="address2"
                type="text"
                placeholder="상세주소 입력"
              />
            </InputContainer>
          </ListItem>
        </SignupList>
        <Button size="small" value="회원가입" type="submit" theme="normal" />
      </SignupForm>
    </SignupPageContainer>
  );
};

export default SignupPage;

const validation = {
  id: function (id: string): boolean {
    return id.length > 5;
  },
  email: function (email: string): boolean {
    return isEmail(email);
  },
  password: function (password: string): boolean {
    return password.length > 5;
  },
  confirmPassword: function (password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  },
  name: function (name: string): boolean {
    const numRegex = /\d/;
    const isNumberIncluded = numRegex.test(name);
    if (isNumberIncluded) return false;
    return true;
  },
  phoneNumber: function (phoneNumber: string): boolean {
    return isMobilePhone(phoneNumber, 'ko-KR');
  },
  callNumber: function (): boolean {
    // TODO: validation logic 필요한가
    return true;
  },
  postcode: function (): boolean {
    return true;
  },
  address1: function (): boolean {
    return true;
  },
  address2: function (): boolean {
    return true;
  },
};

const signupPageHeight = '800px';
const signupFormMargin = '100px';
const signupListItemPadding = '15px';
const labelBgColor = '#e7e7e748';
const requiredColor = '#ff5353';

const SignupPageContainer = styled.section`
  width: 100%;
  height: ${signupPageHeight};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupForm = styled.form`
  width: 50%;
  height: 100%;
  margin-top: ${signupFormMargin};
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${greyLine};
  &:last-child > div {
    & > div {
      margin-bottom: ${signupListItemPadding};
    }
  }
`;

const InputContainer = styled.div`
  padding: ${signupListItemPadding};
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 30%;
  height: 100%;
  background-color: ${labelBgColor};
  padding: ${signupListItemPadding};
  font-family: ${baeminFont};

  &::after {
    content: '*';
    margin-left: 5px;
    font-weight: bold;
    color: ${requiredColor};
  }
  &[for='callNumber']::after {
    content: '';
  }
`;
