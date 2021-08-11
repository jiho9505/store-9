import React from 'react';
import styled from '@emotion/styled';

import ItemLists from '@/components/base/ItemLists/ItemLists';

import { baeminFont } from '@/static/style/common';

/**
 * TODO:
 * mode 에 따라 api 호출해서
 * state update 할 것
 */
const FeatureSection = (props) => {
  let title = '';

  if (props.mode === 'new') {
    title = '새로 나왔어요';
  } else if (props.mode === 'best') {
    title = '잘나가요';
  } else if (props.mode === 'discount') {
    title = '지금은 할인 중';
  }

  return (
    <FeatureContainer>
      <Title>{title}</Title>
      <ItemLists></ItemLists>
    </FeatureContainer>
  );
};

export default FeatureSection;

const FeatureContainer = styled.div`
  width: 1200px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;

const Title = styled.span`
  font-family: ${baeminFont};
  font-weight: normal;
  font-size: 26px;
`;
