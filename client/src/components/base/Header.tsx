import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from '@/Router';
import { categories } from '@/static/constants';
import { greyLine, normalContainerWidth } from '@/static/style/common';

import '@/static/assets/img/logo.png';
import '@/static/assets/img/search.png';

const shortCuts = [
  { name: '로그인', path: '/login' },
  { name: '마이페이지', path: '/my-page' },
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
          <SearchContainer>
            <SearchInput placeholder="검색어를 입력해 주세요" />
            <Button>
              <SearchImg src="images/search.png" />
            </Button>
          </SearchContainer>
        </SearchHeader>
        <Navigation>
          {categories.map(([category, path], idx) => (
            <li key={idx}>
              <CategoryLink to={path}>{category}</CategoryLink>
            </li>
          ))}
        </Navigation>
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

const ShortCut = styled.li``;

const HeaderContainer = styled.div`
  min-width: 1450px;
  border-top: 1px solid ${greyLine};
  border-bottom: 1px solid ${greyLine}; ;
`;

const SearchHeader = styled.div`
  width: ${normalContainerWidth};
  min-height: 103px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const LogoLink = styled(Link)`
  grid-column-start: 3;
  grid-column-end: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
`;

const Logo = styled.img`
  width: 100%;
`;

const SearchContainer = styled.div`
  grid-column-start: 7;
  grid-column-end: 9;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 34px;
  font-size: 14px;
  flex-grow: 1;
  border-bottom: 1px solid #000000;
`;

const Button = styled.button`
  width: 34px;
  height: 34px;
`;

const SearchImg = styled.img`
  width: 100%;
`;

const Navigation = styled.ul`
  width: ${normalContainerWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const CategoryLink = styled(NavLink)`
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 10px 0;
`;

export default Header;
