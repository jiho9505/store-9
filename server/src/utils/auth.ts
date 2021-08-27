import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { JwtSignPayload } from './types';

const validation = {
  isId: function (id: string): boolean {
    return id.length > 2;
  },
  isEmail: function (email: string): boolean {
    return isEmail(email);
  },
  isPassword: function (password: string): boolean {
    return password.length > 2;
  },
  checkConfirmPassword: function (password: string, confirmPassword: string): boolean {
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

const signUpDataValidationCheck = (data) => {
  if (!validation.isId(data.login_id)) return false;
  if (!validation.isEmail(data.email)) return false;
  if (!validation.isPassword(data.password)) return false;
  if (!validation.checkConfirmPassword(data.password, data.confirmPassword)) return false;
  if (!validation.isName(data.name)) return false;
  if (!validation.isPhoneNumber(data.phone_number)) return false;
  if (!validation.isCallNumber()) return false;

  return true;
};

const getAccessToken = (response: string): string => response.split('&')[0].split('=')[1];
const getJwtPayload = (user): JwtSignPayload => ({
  role: user.role,
  id: user.id,
  login_id: user.login_id,
  email: user.email,
  name: user.name,
});

const getUserObj = (userInfo) => ({
  login_id: userInfo.id,
  role: userInfo.role || 'User',
  email: userInfo.email,
  password: userInfo.password,
  confirmPassword: userInfo.confirmPassword,
  name: userInfo.name,
  phone_number: userInfo.phoneNumber,
  birth: userInfo.birth || '1999.02.02',
  address: `${userInfo.address1}, ${userInfo.address2}`,
  call_number: userInfo.callNumber || '',
});

export { signUpDataValidationCheck, getAccessToken, getUserObj, getJwtPayload };
