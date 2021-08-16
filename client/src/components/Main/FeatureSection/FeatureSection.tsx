import React from 'react';
import styled from '@emotion/styled';

import ItemLists from '@/components/base/ItemLists/ItemLists';

import { baeminFont, normalContainerWidth } from '@/static/style/common';

const getTitle = (mode) => {
  if (mode === 'new') {
    return '새로 나왔어요';
  } else if (mode === 'best') {
    return '잘나가요';
  } else if (mode === 'discount') {
    return '지금은 할인 중';
  }
};

/**
 * TODO:
 * mode 에 따라 api 호출해서
 * state update 할 것
 */

type FeatureSectionProps = {
  mode: string;
  product;
};

const FeatureSection = ({ mode, product }: FeatureSectionProps) => {
  let title: String = '';

  title = getTitle(mode);

  return (
    <FeatureContainer>
      <Title>{title}</Title>
      <ItemLists products={product}></ItemLists>
    </FeatureContainer>
  );
};

export default FeatureSection;

const FeatureContainer = styled.div`
  width: ${normalContainerWidth};
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
