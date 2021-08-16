import murmurhash from 'murmurhash';
import { compile, serialize, stringify, middleware, prefixer } from 'stylis';

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

const createStyleRule = (className, styles) => {
  const rules = serialize(compile(`.${className}{${styles}}`), middleware([prefixer, stringify]));
  injectStyle(rules);
};

const injectStyle = (rule) => {
  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);
  styleTag.appendChild(document.createTextNode(rule));
};

const getProperProps = (props: Object): Object => {
  return Object.keys(props).reduce((result, prop) => {
    if (prop in HTMLElement.prototype) {
      return { ...result, [prop]: props[prop] };
    }
    return result;
  }, {});
};

export { generateAlphabeticName, createStyleRule, getProperProps };
