import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';

import { greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';

const Like = () => {
  const { info, handleClickLikeButton } = useContext(ProductContext);

  /**
   * info에서 유저의 like 여부 필요
   * useState 필요 X
   */
  const [isIconActive, setIsIconActive] = useState(false);

  return (
    <LikeContainer>
      <i className={`${isIconActive ? 'fas' : 'far'} fa-heart`} onClick={handleClickLikeButton}></i>
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
    cursor: pointer;
    font-size: 25px;
  }
`;

export default Like;
