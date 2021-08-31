import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import {
  baemin,
  baeminFont,
  greyLine,
  baeminThickFont,
  greySpan,
  lightBlack,
} from '@/static/style/common';
import DetailProductStore from '@/stores/DetailProductStore';
import RefreshStore from '@/stores/RefreshStore';

type DetailTab = {
  choicedIdx: number;
  handleClickItemName(e: React.MouseEvent<HTMLSpanElement>): void;
};

const TabName = ['상품상세정보', '배송안내', '교환 및 반품안내', '상품후기', '상품문의'];

const DetailTab = ({ choicedIdx, handleClickItemName }: DetailTab) => {
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [qnaCount, setqnaCount] = useState<number>(0);

  useEffect(() => {
    setReviewCount(DetailProductStore.product.reviews.length);
    setqnaCount(DetailProductStore.product.qnas.length);
  }, [RefreshStore.refreshComponent]);

  const createTabItem = () => {
    return TabName.map((itemName, idx) => (
      <TabItem key={itemName} onClick={handleClickItemName} data-idx={idx}>
        <ItemName active={choicedIdx === idx}>{itemName}</ItemName>
        {idx === 3 && <ReviewCount>{reviewCount}</ReviewCount>}
        {idx === 4 && <QnaCount>{qnaCount}</QnaCount>}
      </TabItem>
    ));
  };
  return (
    <TabContainer>
      <Tab>{createTabItem()}</Tab>
    </TabContainer>
  );
};

export default observer(DetailTab);

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
  margin-left: 10px;
  color: ${baemin};
  font-size: 13px;
`;

const QnaCount = styled(ReviewCount)``;
