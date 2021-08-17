import React from 'react';
import styled from '@emotion/styled';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import Input from '@/components/base/Input';
import useInput from '@/hooks/customHooks/useInput';
import useAddress from '@/hooks/customHooks/useAddress';
import Button from '@/components/base/Button';
import { baeminFont, greyLine } from '@/static/style/common';

const fromDefaultValue = {
  id: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  phoneNumber: '',
  callNumber: '',
  detailAddress: '',
};

const SignupPage = () => {
  const {
    onAddressSearchClick,
    address: { address, postcode },
  } = useAddress();
  const { form, onChange } = useInput(fromDefaultValue);
  const { id, password, passwordConfirm, name, email, phoneNumber, callNumber, detailAddress } =
    form;

  const preventInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const isFormValid = (data) => {
    const { id, password, passwordConfirm, name, email, phoneNumber } = data;

    // show error message if not passed
    if (!validation.isId(id)) return false;
    if (!validation.isPassword(password)) return false;
    if (!validation.checkPwdConfirm(password, passwordConfirm)) return false;
    if (!validation.isName(name)) return false;
    if (!validation.isEmail(email)) return false;
    if (!validation.isPhoneNumber(phoneNumber)) return false;
    return true;
  };

  const onSignupFormSubmit = (e) => {
    // validation
    e.preventDefault();
    if (!isFormValid(form)) {
      return;
    }
  };

  return (
    <SignupPageContainer>
      <SignupForm onSubmit={onSignupFormSubmit}>
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
                onChange={onChange}
                type="text"
                value={id}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="password">비밀번호</Label>
            <InputContainer>
              <Input
                id="password"
                required
                variant="outlined"
                size="medium"
                name="password"
                onChange={onChange}
                type="password"
                value={password}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <InputContainer>
              <Input
                id="passwordConfirm"
                required
                variant="outlined"
                size="medium"
                name="passwordConfirm"
                onChange={onChange}
                type="password"
                value={passwordConfirm}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="name">이름</Label>
            <InputContainer>
              <Input
                id="name"
                required
                variant="outlined"
                size="large"
                name="name"
                onChange={onChange}
                type="text"
                value={name}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="email">이메일</Label>
            <InputContainer>
              <Input
                id="email"
                required
                variant="outlined"
                size="medium"
                name="email"
                onChange={onChange}
                type="email"
                value={email}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="phoneNumber">휴대폰번호</Label>
            <InputContainer>
              <Input
                id="phoneNumber"
                required
                variant="outlined"
                size="small"
                name="phoneNumber"
                onChange={onChange}
                type="text"
                value={phoneNumber}
                placeholder="- 없이 입력하세요"
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="callNumber">전화번호</Label>
            <InputContainer>
              <Input
                id="callNumber"
                required={false}
                variant="outlined"
                size="large"
                name="callNumber"
                onChange={onChange}
                type="text"
                value={callNumber}
                placeholder="- 없이 입력하세요"
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="address">주소</Label>
            <InputContainer>
              <AddressContainer>
                <Input
                  required
                  variant="outlined"
                  size="small"
                  name="postcode"
                  onChange={onChange}
                  type="text"
                  value={postcode}
                  placeholder="우편번호 입력"
                  onKeyPress={preventInput}
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
                required
                variant="outlined"
                size="large"
                name="address"
                onChange={onChange}
                type="text"
                value={address}
                onKeyPress={preventInput}
              />
              <Input
                id="address"
                required
                variant="outlined"
                size="large"
                name="detailAddress"
                onChange={onChange}
                type="text"
                value={detailAddress}
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
  isId: function (id: string): boolean {
    return id.length > 5;
  },
  isEmail: function (email: string): boolean {
    return isEmail(email);
  },
  isPassword: function (password: string): boolean {
    return password.length > 5;
  },
  checkPwdConfirm: function (password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  },
  isName: function (name: string): boolean {
    const numRegex = /\d/;
    const isNumberIncluded = numRegex.test(name);
    if (isNumberIncluded) return false;
    return true;
  },
  isPhoneNumber: function (phoneNumber: string): boolean {
    return isMobilePhone(phoneNumber, 'ko-KR');
  },
  isCallNumber: function (): boolean {
    // TODO: validation logic 필요한가
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
