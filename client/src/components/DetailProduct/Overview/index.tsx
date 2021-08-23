import React from 'react';
import styled from '@emotion/styled';

import OverViewContent from '../OverViewContent';
import ZoomableImage from '../ZoomableImage';

type OverviewProps = {
  info;
};

const Overview = ({ info }: OverviewProps) => {
  return (
    <OverviewContainer>
      <ZoomableImage width={473} height={585} src={info.image}></ZoomableImage>
      <OverViewContent info={info}></OverViewContent>
    </OverviewContainer>
  );
};

export default Overview;

const OverviewContainer = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 70px;
`;
