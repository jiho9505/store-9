import murmurhash from 'murmurhash';

const charsLength = 52;

const getAlphabeticChar = (code: number): string =>
  String.fromCharCode(code + (code > 25 ? 39 : 97));

const generateAlphabeticName = (code: number): string => {
  let name = '';
  let x;

  for (x = murmurhash.v2(String(code)); x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
};

export { generateAlphabeticName };
