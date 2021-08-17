import { greyLine } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

// {
// <i className="fas fa-heart"></i>  */
// }

const Like = () => {
  return (
    <LikeContainer>
      <i className="far fa-heart"></i>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid ${greyLine};
  i {
    font-size: 25px;
  }
`;

export default Like;
