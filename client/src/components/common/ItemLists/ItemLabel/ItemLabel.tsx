import styled from '@emotion/styled';
import React from 'react';

import { baemin, baeminFont, green, red1 } from '@/static/style/common';

type LabelProps = {
  product;
};

const ItemLabel = ({ product }: LabelProps) => {
  const getColor = (item) => {
    switch (item) {
      case 'new':
        return newFeatureColor;

      case 'best':
        return bestFeatureColor;

      case 'sale':
        return saleFeatureColor;

      case 'green':
        return greenFeatureColor;
    }
  };

  const createFeature = () => {
    const badge = product.badge;
    const allBadge = product.is_green ? [...badge, 'green'] : badge;

    return allBadge.map((item, idx) => (
      <Feature color={getColor(item)} key={idx}>
        <span>{item.toUpperCase()}</span>
      </Feature>
    ));
  };

  return <FeatureContainer>{createFeature()}</FeatureContainer>;
};

const bestFeatureColor = '#000';
const newFeatureColor = baemin;
const saleFeatureColor = red1;
const greenFeatureColor = green;

const FeatureContainer = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  left: 5px;
  top: 5px;
`;

const Feature = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 5px;
  height: 25px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #fff;
  span {
    font-family: ${baeminFont};
  }
`;

export default ItemLabel;
