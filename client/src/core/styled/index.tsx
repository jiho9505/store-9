import React, { useMemo } from 'react';
import { generateAlphabeticName, createStyleRule } from './util';
import { compile, serialize, stringify, middleware, prefixer } from 'stylis';

let counter = 0;

const guguStyled =
  (Tag) =>
  (strings, ...exprs) => {
    return (props) => {
      const interpolateStyle = useMemo(() => {
        return exprs.reduce(
          (styles, expr, idx) => {
            const isFunc = typeof expr === 'function';
            const value = isFunc ? expr(props) : expr;
            return `${styles}${value}${strings[idx + 1]}`;
          },
          [strings[0]]
        );
      }, [strings, exprs]);

      const uniqueClassName = `gugusc-${generateAlphabeticName(++counter)}`;
      createStyleRule(uniqueClassName, interpolateStyle);
      console.log(props.className);
      const test = `${uniqueClassName} ${props.className}`;

      return (
        <Tag className={test} {...props}>
          {props?.children}
        </Tag>
      );
    };
  };

export default guguStyled;
