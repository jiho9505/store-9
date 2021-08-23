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
