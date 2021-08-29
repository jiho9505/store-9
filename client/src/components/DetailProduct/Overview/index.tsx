import React from 'react';
import styled from '@emotion/styled';

import OverViewContent from '../OverViewContent';
import ZoomableImage from '../ZoomableImage';
import DetailProductStore from '@/stores/DetailProductStore';

const Overview = () => {
  return (
    <OverviewContainer>
      {DetailProductStore.product && (
        <>
          <ZoomableImage
            width={473}
            height={585}
            referrerPolicy="no-referrer"
            src={DetailProductStore.product.thumbnail}
          />
          <OverViewContent />
        </>
      )}
    </OverviewContainer>
  );
};

export default Overview;

const OverviewContainer = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 70px;
`;
