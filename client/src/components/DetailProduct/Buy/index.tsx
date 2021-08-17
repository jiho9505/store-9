import { greyLine, baeminFont } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

const Buy = () => {
  /**
   * TODO:
   * 1.push에 인자를 싣는것이 된다면 그렇게 할 것
   * 2.안된다면 POST (userid,productid,stock ...etc)
   */
  const handleClickText = () => {
    history.push('/order');
  };
  return (
    <LikeContainer>
      <span onClick={handleClickText}>바로 구매</span>
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
  cursor: pointer;
  span {
    font-size: 18px;
    font-family: ${baeminFont};
  }
`;

export default Buy;
