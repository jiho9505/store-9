import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@/core/Router';

import Navigation from './Navigation';

import { baeminFont, greyLine, greySpan, normalContainerWidth } from '@/static/style/common';

import SearchBar from './SearchBar';

import '@/static/assets/img/logo.png';
import '@/static/assets/img/search.png';

const shortCuts = [
  { name: '로그인', path: '/login' },
  { name: '마이페이지', path: '/mypage' },
  { name: '장바구니', path: '/cart' },
];

const Header = () => {
  return (
    <>
      <ShortCuts>
        {shortCuts.map(({ name, path }) => (
          <ShortCut key={path}>
            <Link to={path}>{name}</Link>
          </ShortCut>
        ))}
      </ShortCuts>
      <HeaderContainer>
        <SearchHeader>
          <LogoLink to="/">
            <Logo src="images/logo.png" />
          </LogoLink>
          <SearchBar />
        </SearchHeader>
        <Navigation />
      </HeaderContainer>
    </>
  );
};

const ShortCuts = styled.ul`
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

  a {
    font-family: ${baeminFont};
    color: ${greySpan};
    font-size: 14px;
  }
`;

const HeaderContainer = styled.div`
  min-width: 1450px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
`;

const SearchHeader = styled.div`
  width: ${normalContainerWidth};
  min-height: 103px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const LogoLink = styled(Link)`
  grid-column-start: 4;
  grid-column-end: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
`;

const Logo = styled.img`
  margin-top: 15px;
  width: 100%;
`;

export default Header;
