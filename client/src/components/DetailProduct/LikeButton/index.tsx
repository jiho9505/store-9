import { greyLine } from '@/static/style/common';
import styled from '@emotion/styled';
import React, { useState } from 'react';

const Like = () => {
  /**
   * 유저의 like 여부 필요
   */
  const [isIconActive, setIsIconActive] = useState(false);
  const handleClickIcon = () => {
    // if (isIconActive) {
    //   // delete Like
    // } else {
    //   // Post Like
    // }
    setIsIconActive(!isIconActive);
  };
  return (
    <LikeContainer>
      <i className={`${isIconActive ? 'fas' : 'far'} fa-heart`} onClick={handleClickIcon}></i>
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
