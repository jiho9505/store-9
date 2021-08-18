import styled from '@emotion/styled';
import React from 'react';

import DetailTab from '../DetailTab';
import DetailInfo from '../DetailInfo';
import ShipInfo from '../ShipInfo';
import ReplaceItemInfo from '../ReplaceItemInfo';
import ProductBoard from '@/components/base/ProductBoard';

const Detail = ({ info }) => {
  const scrollIntoView = (idx) => {
    let el;
    switch (idx) {
      case '0':
        el = document.querySelector('#Tab_1');
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      case '1':
        el = document.querySelector('#Tab_2');
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      case '2':
        el = document.querySelector('#Tab_3');
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      case '3':
        el = document.querySelector('#Tab_4');
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      case '4':
        el = document.querySelector('#Tab_5');
        el.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const handleClickItemName = (e) => {
    const idx = e.target.dataset.idx;
    scrollIntoView(idx);
  };
  return (
    <DetailContainer>
      <DetailTabContainer id="Tab_1">
        <DetailTab index={0} handleClickItemName={handleClickItemName} />
      </DetailTabContainer>
      <DetailInfo images={info.content_urls}></DetailInfo>
      <DetailTabContainer id="Tab_2">
        <DetailTab index={1} handleClickItemName={handleClickItemName} />
        <ShipInfo />
      </DetailTabContainer>
      <DetailTabContainer id="Tab_3">
        <DetailTab index={2} handleClickItemName={handleClickItemName} />
        <ReplaceItemInfo />
      </DetailTabContainer>
      <DetailTabContainer id="Tab_4">
        <DetailTab index={3} handleClickItemName={handleClickItemName} />
        <ProductBoard title="상품 후기" item={info} />
      </DetailTabContainer>
      <DetailTabContainer id="Tab_5">
        <DetailTab index={4} handleClickItemName={handleClickItemName} />
        <ProductBoard title="상품 문의" item={info} />
      </DetailTabContainer>
    </DetailContainer>
  );
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
