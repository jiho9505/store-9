import { greyLine, baeminFont } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

const Buy = () => {
  return (
    <LikeContainer>
      <span>바로 구매</span>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 52px;
  border: 1px solid ${greyLine};
  background-color: black;
  color: white;

  span {
    font-size: 18px;
    font-family: ${baeminFont};
  }
`;

export default Buy;
