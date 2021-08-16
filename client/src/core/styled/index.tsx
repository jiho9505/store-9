import React, { useEffect, useState, useMemo } from 'react';
import { generateAlphabeticName, createStyleRule } from './util';

let counter = 0;

const classList = new Set();

const guguStyled =
  (Tag) =>
  (strings: TemplateStringsArray, ...exprs: any[]) => {
    const uniqueClassName = `gugusc-${generateAlphabeticName(++counter)}`;

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

      let prevClassName = '';
      let newProps = {};
      if (typeof Tag === 'function') {
        const parent = Tag(props);
        prevClassName = parent.props.className;
      } else {
        const $dom = document.createElement(Tag);
        newProps = Object.keys(props).reduce((result, prop) => {
          if (prop in $dom) {
            return { ...result, [prop]: props[prop] };
          }
          return result;
        }, {});
      }

      if (!classList.has(uniqueClassName)) {
        createStyleRule(uniqueClassName, interpolateStyle);
        classList.add(uniqueClassName);
      }

      const combinedClassName = prevClassName
        ? `${prevClassName} ${uniqueClassName}`
        : uniqueClassName;

      const property = Object.keys(newProps).length === 0 ? props : newProps;

      return (
        <Tag className={combinedClassName} {...property}>
          {props?.children}
        </Tag>
      );
    };
  };

export const keyframes = (animation: TemplateStringsArray): string => {
  const animationName = generateAlphabeticName(counter);
  createStyleRule('', `@keyframes ${animationName} {${animation}}`);
  return animationName;
};

export default guguStyled;
