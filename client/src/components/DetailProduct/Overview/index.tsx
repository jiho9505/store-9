import React, { useContext } from 'react';
import styled from '@emotion/styled';

import OverViewContent from '../OverViewContent';
import ZoomableImage from '../ZoomableImage';

import { ProductContext } from '@/hooks/context';

const Overview = () => {
  const { info } = useContext(ProductContext);

  return (
    <OverviewContainer>
      {info && (
        <ZoomableImage width={473} height={585} referrerPolicy="no-referrer" src={info.thumbnail} />
      )}
      {info && <OverViewContent />}
    </OverviewContainer>
  );
};

export default Overview;

const OverviewContainer = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 70px;
`;
