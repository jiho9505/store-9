import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import sanitizeHtml from 'sanitize-html';

import Input from '@/components/common/Input';
import useAddress from '@/hooks/customHooks/useAddress';
import Button from '@/components/common/Button';
import { baeminFont, greyLine } from '@/static/style/common';
import AuthApi from '@/apis/AuthApi';
import useHistory from '@/hooks/customHooks/useHistory';
import { signupValidation } from '@/utils/validation';

type ValidResult = {
  isValid: boolean;
  error: string;
};

const SignupPage = () => {
  const {
    onAddressSearchClick,
    address: { address, postcode },
  } = useAddress();
  const history = useHistory();
  const signUpFormRef = useRef<HTMLFormElement>(null);
  const [errorInput, setErrorInput] = useState('');

  const getGithubLoginId = () => localStorage.getItem('loginId');
  const isGithubLogin = !!getGithubLoginId();

  const isFormValid = (data): ValidResult => {
    for (const [inputName, inputValue] of data.entries()) {
      data.set(inputName, sanitizeHtml(inputValue));
      if (inputName === 'confirmPassword') {
        if (!signupValidation[inputName](inputValue, data.get('password'))) {
          return { isValid: false, error: inputName };
        }
        continue;
      }

      if (!signupValidation[inputName](inputValue)) {
        return { isValid: false, error: inputName };
      }
    }
    return { isValid: true, error: '' };
  };

  const onSignupFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(signUpFormRef.current);
    const { isValid, error } = isFormValid(form);

    if (!isValid) {
      setErrorInput(error);
      return;
    }
    const data = await AuthApi.signup(form);
    if (data.ok) {
      history.push('/login');
    }
  };

  const getInputErrorObject = (currentInputName): {} | null => {
    if (errorInput === currentInputName) {
      return { [currentInputName]: formErrorMessage[currentInputName] };
    }
    return null;
  };

  const onInputChangeSetError = (e) => {
    const { name, value } = e.target;
    let valid;
    if (name === 'confirmPassword') {
      const formRef = new FormData(signUpFormRef.current);
      valid = signupValidation[name](value, formRef.get('password'));
    } else {
      valid = signupValidation[name](value);
    }
    if (!valid) {
      setErrorInput(name);
    } else {
      setErrorInput('');
    }
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem('loginId');
    };
  }, []);

  return (
    <SignupPageContainer>
      <SignUpTitle>배민 문방구 회원 가입</SignUpTitle>
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
                maxLength={20}
                error={getInputErrorObject('id')}
                onChange={onInputChangeSetError}
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
                    error={getInputErrorObject('password')}
                    onChange={onInputChangeSetError}
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
                    error={getInputErrorObject('confirmPassword')}
                    onChange={onInputChangeSetError}
                  />
                </InputContainer>
              </ListItem>
            </>
          )}
          <ListItem>
            <Label htmlFor="name">이름</Label>
            <InputContainer>
              <Input
                id="name"
                variant="outlined"
                size="large"
                name="name"
                type="text"
                error={getInputErrorObject('name')}
                onChange={onInputChangeSetError}
              />
            </InputContainer>
          </ListItem>
          <ListItem>
            <Label htmlFor="email">이메일</Label>
            <InputContainer>
              <Input
                id="email"
                variant="outlined"
                size="medium"
                name="email"
                type="email"
                error={getInputErrorObject('email')}
                onChange={onInputChangeSetError}
              />
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
                error={getInputErrorObject('phoneNumber')}
                onChange={onInputChangeSetError}
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
                error={getInputErrorObject('callNumber')}
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
                  error={getInputErrorObject('postcode')}
                  onChange={onInputChangeSetError}
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
                error={getInputErrorObject('address1')}
                onChange={onInputChangeSetError}
              />
              <Input
                id="address"
                variant="outlined"
                size="large"
                name="address2"
                type="text"
                placeholder="상세주소 입력"
                onChange={onInputChangeSetError}
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

const formErrorMessage = {
  id: '아이디는 3글자 이상 20자 이하로 작성해주세요.',
  email: '이메일 형식에 맞지 않습니다',
  password: '패스워드는 3자리 이상 작성해주세요.',
  confirmPassword: '패스워드가 일치하지 않습니다',
  name: '잘못된 이름 형식입니다.',
  phoneNumber: '휴대폰 번호 양식에 맞지 않습니다',
  postcode: '우편번호가 입력되지 않았습니다',
  address1: '주소가 입력되지 않았습니다',
};

const signUpTitleSize = '2rem';
const signupPageHeight = '1050px';
const signupFormMargin = '60px';
const signupListItemPadding = '25px 10px';
const labelBgColor = '#e7e7e748';
const requiredColor = '#ff5353';

const SignupPageContainer = styled.section`
  width: 100%;
  height: ${signupPageHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpTitle = styled.div`
  font-size: ${signUpTitleSize};
  text-align: center;
  margin-top: 30px;
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
  position: relative;
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
