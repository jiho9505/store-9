import React from 'react';
import styled from '@emotion/styled';

import OverViewContent from '../OverViewContent';

type OverviewProps = {
  info;
};

const Overview = ({ info }: OverviewProps) => {
  return (
    <OverviewContainer>
      <OverviewImage referrerPolicy="no-referrer" src={info.image}></OverviewImage>
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
  height: 585px;
`;
