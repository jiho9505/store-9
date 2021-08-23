import React, { memo } from 'react';
import styled from '@emotion/styled';
import useLocation from '@/hooks/customHooks/useLocation';

import { baeminFont, greySpan } from '@/static/style/common';

import { RightArrow, RightArrowGrey } from '@/static/assets/svg';

const stages = [
  ['장바구니', '/cart'],
  ['주문서작성/결제', '/order'],
  ['주문완료', '/end-order'],
];

const BreadCrumbs = () => {
  const curLocation = useLocation();
  return (
    <BreadCrumbContainer>
      {stages.map(([stage, path], idx, arr) => (
        <BreadCrumb key={path}>
          <Stage isMatched={path === curLocation}>{stage}</Stage>
          {idx !== arr.length - 1 && (path === curLocation ? <RightArrow /> : <RightArrowGrey />)}
        </BreadCrumb>
      ))}
    </BreadCrumbContainer>
  );
};

const BreadCrumbContainer = styled.ul`
  display: flex;
  align-items: flex-end;
`;

const BreadCrumb = styled.li`
  height: 30px;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 5px;
  }
`;

type StageStyledComp = {
  isMatched: boolean;
};

const Stage = styled.span<StageStyledComp>`
  font-family: ${baeminFont};
  &:not(:last-child) {
    margin-right: 5px;
  }
  color: ${(props) => (!props.isMatched ? greySpan : 'inherit')};
`;

export default memo(BreadCrumbs);
