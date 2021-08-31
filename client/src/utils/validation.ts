import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { validationMsg } from './errorMessage';

class Validation {
  _validator: { fn(name: string): boolean; msg: string }[];

  constructor() {
    this._validator = [];
  }

  private _require = (value) => {
    return value !== '';
  };

  private _isName = (name) => {
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return isKorean.test(name);
  };

  private _isEmail = (value) => {
    return isEmail(value);
  };

  private _isPhone = (value) => {
    return isMobilePhone(value, 'ko-KR');
  };

  require = function (msg = validationMsg['NOT_REQUIRE']) {
    this._validator.push({ fn: this._require, msg });
    return this;
  };

  isName = (msg = validationMsg['INVALID_NAME']) => {
    this._validator.push({ fn: this._isName, msg });
    return this;
  };

  isEmail = function (msg = validationMsg['INVALID_EMAIL']) {
    this._validator.push({ fn: this._isEmail, msg });
    return this;
  };

  isPhone = function (msg = validationMsg['INVALID_PHONE_NUMBER']) {
    this._validator.push({ fn: this._isPhone, msg });
    return this;
  };

  isValid = function (value) {
    let error = '';
    for (let i = 0; i < this._validator.length; i++) {
      const { fn, msg } = this._validator[i];
      if (!fn(value)) {
        error = msg;
        break;
      }
    }
    return error;
  };
}

const Validator = () => new Validation();
export default Validator;

export const signupValidation = {
  id: function (id: string): boolean {
    return id.length > 2;
  },
  email: function (email: string): boolean {
    return isEmail(email);
  },
  password: function (password: string): boolean {
    return password.length > 2;
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
  postcode: function (postcode: string): boolean {
    return postcode.length > 0;
  },
  address1: function (address1: string): boolean {
    return address1.length > 0;
  },
  address2: function (): boolean {
    return true;
  },
};
