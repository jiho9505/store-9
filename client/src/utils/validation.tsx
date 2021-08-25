import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

function Validation() {
  if (!(this instanceof Validation)) {
    return new Validation();
  }
  this._validator = [];
}

const _require = (value) => {
  return value !== '';
};

const _maxLength = (length) => (value) => {
  return value.length < length;
};

Validation.prototype.require = function (msg) {
  this._validator.push({ fn: _require, msg });
  return this;
};

Validation.prototype.maxLength = function (length, msg) {
  this._validator.push({ fn: _maxLength(length), msg });
  return this;
};

Validation.prototype.isValid = function (value) {
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

export default Validation;

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
