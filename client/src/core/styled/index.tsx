import React, { useMemo } from 'react';
import { generateAlphabeticName, createStyleRule, getProperProps } from './util';
import { tags } from './tag';

let counter = 0;
const classList = new Set<string>();

const guguStyled =
  (Tag: string | ReturnType<typeof guguStyled>) =>
  (strings: TemplateStringsArray, ...exprs: any[]) => {
    const uniqueClassName = `gugusc-${generateAlphabeticName(++counter)}`;

    const getPrevClassName = () => {
      return uniqueClassName;
    };

    const NewComponent = (props) => {
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
      let property = {};
      if (typeof Tag === 'function') {
        prevClassName = Tag.getPrevClassName?.();
      } else {
        const properProps = getProperProps(props);
        property = Object.keys(properProps).length === 0 ? props : properProps;
      }

      if (!classList.has(uniqueClassName)) {
        createStyleRule(uniqueClassName, interpolateStyle);
        classList.add(uniqueClassName);
      }

      const combinedClassName = prevClassName
        ? `${prevClassName} ${uniqueClassName}`
        : uniqueClassName;

      return (
        <Tag className={combinedClassName} {...property}>
          {props?.children}
        </Tag>
      );
    };
    NewComponent.getPrevClassName = getPrevClassName;
    return NewComponent;
  };

tags.forEach((tag) => {
  guguStyled[tag] = guguStyled(tag);
});

export const keyframes = (animation: TemplateStringsArray): string => {
  const animationName = generateAlphabeticName(counter);
  createStyleRule('', `@keyframes ${animationName} {${animation}}`);
  return animationName;
};

export default guguStyled;
