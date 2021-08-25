import React, { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';

import { greyLine } from '@/static/style/common';
import { ProductContext } from '@/hooks/context';

const Like = () => {
  const { info, handleClickLikeButton } = useContext(ProductContext);
  const [isIconActive, setIsIconActive] = useState(false);

  /**
   * TODO:
   * 연동 시 아래와 같이 진행합니다.
   */
  useEffect(() => {
    // setIsIconActive(info.userLiked)
  }, []);

  /**
   * TODO:
   * 로그인했다면 2번으로 넘어가서 post 혹은 delete하며 setState 해줍니다 (반환값 필요X)
   * 그 후 관심상품으로 등록하였다는 메시지를 보여줍니다.
   * 로그인이 안됐다면 1번에서 끝납니다.
   */
  const handleClickBtn = () => {
    handleClickLikeButton('remove');
    setIsIconActive(!isIconActive);
  };

  return (
    <LikeContainer>
      <i className={`${isIconActive ? 'fas' : 'far'} fa-heart`} onClick={handleClickBtn}></i>
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
