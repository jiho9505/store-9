import React from 'react';

import {
  baemin,
  baeminFont,
  greyLine,
  baeminThickFont,
  greySpan,
  lightBlack,
} from '@/static/style/common';
import styled from '@emotion/styled';

type DetailTab = {
  choicedIdx: number;
  handleClickItemName(e: React.MouseEvent<HTMLElement>): void;
};

const TabName = ['상품상세정보', '배송안내', '교환 및 반품안내', '상품후기', '상품문의'];

/**
 * TODO:
 * TabItem의 상품 후기 , 상품 문의 카운트는
 * 상위에서 받아와야 합니다!
 */
const DetailTab = ({ choicedIdx, handleClickItemName }: DetailTab) => {
  const createTabItem = () => {
    return TabName.map((itemName, idx) => (
      <TabItem key={itemName} onClick={handleClickItemName} data-idx={idx}>
        <ItemName active={choicedIdx === idx}>{itemName}</ItemName>
      </TabItem>
    ));
  };
  return (
    <TabContainer>
      <Tab>{createTabItem()}</Tab>
    </TabContainer>
  );
};

export default DetailTab;

type ItemNameProps = {
  active: boolean;
};
const TabContainer = styled.div``;

const Tab = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const TabItem = styled.li`
  padding: 20px 40px;
  border: 1px solid ${greyLine};
  border-bottom: 1px solid white;
  cursor: pointer;
`;

const ItemName = styled.span<ItemNameProps>`
  font-family: ${(props) => (props.active ? baeminThickFont : baeminFont)};
  font-size: 16px;
  color: ${(props) => (props.active ? lightBlack : greySpan)};
`;

const ReviewCount = styled.strong`
  color: ${baemin};
  font-size: 13px;
`;

const QnaCount = styled.strong`
  color: ${baemin};
  font-size: 13px;
`;
