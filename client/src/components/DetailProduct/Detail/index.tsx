import React, { useRef } from 'react';
import styled from '@emotion/styled';

import DetailTab from '../DetailTab';
import DetailInfo from '../DetailInfo';
import ShipInfo from '../ShipInfo';
import ReplaceItemInfo from '../ReplaceItemInfo';
import ProductBoard from '@/components/base/ProductBoard';

const Detail = ({ info }) => {
  const detailInfoPosition = useRef<HTMLDivElement>(null);
  const shipInfoPosition = useRef<HTMLDivElement>(null);
  const replaceItemInfoPosition = useRef<HTMLDivElement>(null);
  const reviewPosition = useRef<HTMLDivElement>(null);
  const qnaPosition = useRef<HTMLDivElement>(null);

  const TabItems = [
    <DetailInfo images={info.content_urls}></DetailInfo>,
    <ShipInfo />,
    <ReplaceItemInfo />,
    <ProductBoard title="상품 후기" item={info} />,
    <ProductBoard title="상품 문의" item={info} />,
  ];

  const refItems = [
    detailInfoPosition,
    shipInfoPosition,
    replaceItemInfoPosition,
    reviewPosition,
    qnaPosition,
  ];

  const moveViewThroughTap = (idx: string) => {
    const el = refItems[idx].current;
    console.log('el: ', el);
    el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickItemName = (e: React.MouseEvent<HTMLElement>) => {
    const idx = e.currentTarget.dataset.idx;
    moveViewThroughTap(idx);
  };

  const createInfoEachTab = () => {
    return TabItems.map((item, idx) => (
      <DetailTabContainer key={`${item.toString()}${idx}`} ref={refItems[idx]}>
        <DetailTab choicedIdx={idx} handleClickItemName={handleClickItemName} />
        {item}
      </DetailTabContainer>
    ));
  };

  return <DetailContainer>{createInfoEachTab()}</DetailContainer>;
};

export default Detail;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const DetailTabContainer = styled.div`
  width: 100%;
`;
