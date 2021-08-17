import React from 'react';
import styled from '@emotion/styled';

import OverViewContent from '../OverViewContent';

type OverviewProps = {
  info: object;
};

const Overview = ({ info }: OverviewProps) => {
  return (
    <OverviewContainer>
      <OverviewImage src="images/sampleItem.jpeg"></OverviewImage>
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

const OverviewImage = styled.img`
  max-width: 473px;
  max-height: 100%;
`;
