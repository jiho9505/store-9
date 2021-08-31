import React from 'react';
import guguStyled from '@/core/styled';

import ItemLists from '@/components/common/ItemLists/ItemLists';

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

type FeatureSectionProps = {
  mode: string;
  product: {
    productId?: number;
    name?: string;
    reviewAverageRate?: number;
    reviewCount?: number;
    likeCount?: number;
    discountRate?: number;
    isGreen?: boolean;
    badges?: string[];
    stock?: number;
  }[];
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

const FeatureContainer = guguStyled.div`
  width: ${normalContainerWidth};
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 50px;
`;

const Title = guguStyled.span`
  font-family: ${baeminFont};
  font-weight: normal;
  font-size: 26px;
`;
