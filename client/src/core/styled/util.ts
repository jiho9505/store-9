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
  serialize(
    compile(`.${className}{${styles}}`),
    middleware([
      prefixer,
      stringify,
      (element) => {
        if (element.type === 'rule') {
          injectStyle(element.return);
        }
      },
    ])
  );
};

const injectStyle = (rule) => {
  const styleTag = document.createElement('style');
  document.head.appendChild(styleTag);
  styleTag.appendChild(document.createTextNode(rule));
};

export { generateAlphabeticName, createStyleRule };
