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
  index: number;
  handleClickItemName: (e) => void;
};
const DetailTab = ({ index, handleClickItemName }: DetailTab) => {
  return (
    <TabContainer>
      <Tab>
        <TabItem>
          <ItemName onClick={handleClickItemName} active={index === 0} data-idx="0">
            상품상세정보
          </ItemName>
        </TabItem>
        <TabItem>
          <ItemName onClick={handleClickItemName} active={index === 1} data-idx="1">
            배송안내
          </ItemName>
        </TabItem>
        <TabItem>
          <ItemName onClick={handleClickItemName} active={index === 2} data-idx="2">
            교환 및 반품안내
          </ItemName>
        </TabItem>
        <TabItem>
          <ItemName onClick={handleClickItemName} active={index === 3} data-idx="3">
            상품후기 <ReviewCount> 0</ReviewCount>
          </ItemName>
        </TabItem>
        <TabItem>
          <ItemName onClick={handleClickItemName} active={index === 4} data-idx="4">
            상품문의 <QnaCount> 0</QnaCount>
          </ItemName>
        </TabItem>
      </Tab>
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
