import React, { useContext } from 'react';
import styled from '@emotion/styled';

import useHistory from '@/hooks/customHooks/useHistory';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';

import { ProductContext } from '@/hooks/context';
import { greyLine, baeminFont } from '@/static/style/common';

const Buy = () => {
  const { info } = useContext(ProductContext);
  const history = useHistory();
  const [BuyInfo, setBuyInfo] = useLocalStorage('buy', {});

  /**
   * TODO:
   * 1.POST (userid,productid,stock ...etc)
   */
  const handleClickText = () => {
    setBuyInfo(info);
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
