import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import AuthStore from '@/stores/AuthStore';

import { baeminFont, greyLine, greySpan, normalContainerWidth } from '@/static/style/common';
import useHistory from '@/hooks/customHooks/useHistory';

const ShortCuts = () => {
  const history = useHistory();
  const shortCuts = [
    AuthStore.isLogined
      ? { name: '로그아웃', path: '/logout' }
      : { name: '로그인', path: '/login' },
    { name: '마이페이지', path: '/mypage' },
    { name: '장바구니', path: '/cart' },
  ];

  const handleClickName = (e: React.MouseEvent<HTMLSpanElement>) => {
    const name = e.currentTarget.innerText;
    if (name === '로그인') {
      history.push('/login');
    } else if (name === '로그아웃') {
      AuthStore.logout();
    } else if (name === '마이페이지') {
      history.push('/mypage/like');
    } else if (name === '장바구니') {
      history.push('/cart');
    }
  };

  return (
    <ShortCutsContainer>
      {shortCuts.map(({ name, path }) => (
        <ShortCut key={path}>
          <span onClick={handleClickName}>{name}</span>
        </ShortCut>
      ))}
    </ShortCutsContainer>
  );
};

export default observer(ShortCuts);

const ShortCutsContainer = styled.ul`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: ${normalContainerWidth};
  margin: 0 auto;
`;

const ShortCut = styled.li`
  display: flex;
  align-items: center;
  &:not(:last-of-type):after {
    content: '|';
    font-size: 5px;
    display: inline-block;
    margin: 0 10px;
    color: ${greyLine};
  }

  span {
    font-family: ${baeminFont};
    color: ${greySpan};
    font-size: 14px;
    cursor: pointer;
  }
`;
