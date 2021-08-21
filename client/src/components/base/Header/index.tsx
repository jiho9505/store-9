import React from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from '@/Router';
import { categories } from '@/static/constants';
import { baeminFont, greyLine, normalContainerWidth } from '@/static/style/common';

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
  }
`;

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
  font-family: ${baeminFont};
`;

export default Header;
