import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import Empty from '@/static/assets/img/empty.png';

const EmptyPannel = () => {
  return (
    <EmptyPannelContainer>
      <img src={Empty} />
    </EmptyPannelContainer>
  );
};

export default EmptyPannel;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const EmptyPannelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  & > img {
    height: 80%;
    animation: ${bounce} 1s ease infinite;
  }
`;
