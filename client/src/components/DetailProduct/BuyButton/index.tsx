import React from 'react';
import styled from '@emotion/styled';

import useHistory from '@/hooks/customHooks/useHistory';

import { greyLine, baeminFont } from '@/static/style/common';

const Buy = () => {
  const history = useHistory();

  /**
   * TODO:
   * 1.push에 인자를 싣는것이 된다면 그렇게 할 것
   * 2.안된다면 POST (userid,productid,stock ...etc)
   */
  const handleClickText = () => {
    history.push('/order');
  };
  return (
    <BuyContainer onClick={handleClickText}>
      <span>바로 구매</span>
    </BuyContainer>
  );
};

const BuyContainer = styled.div`
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
