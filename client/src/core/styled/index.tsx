import React, { useEffect, useState, useMemo } from 'react';
import { generateAlphabeticName, createStyleRule } from './util';

let counter = 0;

const classList = new Set();

const guguStyled =
  (Tag) =>
  (strings, ...exprs) => {
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
      if (typeof Tag === 'function') {
        const parent = Tag(props);
        prevClassName = parent.props.className;
      }

      if (!classList.has(uniqueClassName)) {
        createStyleRule(uniqueClassName, interpolateStyle);
        classList.add(uniqueClassName);
      }

      const combinedClassName = prevClassName
        ? `${prevClassName} ${uniqueClassName}`
        : uniqueClassName;

      return (
        <Tag className={combinedClassName} {...props}>
          {props?.children}
        </Tag>
      );
    };
  };

export default guguStyled;
