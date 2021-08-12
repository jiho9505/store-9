import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from '@/Router';
import { categories } from '@/static/constants';

import '@/static/assets/img/logo.png';
import '@/static/assets/img/search.png';

const Header = () => {
  return (
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
          <Fragment key={idx}>
            <CategoryLink to={path}>
              <li>{category}</li>
            </CategoryLink>
          </Fragment>
        ))}
      </Navigation>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  min-width: 1450px;
  border-bottom: 1px solid #CCD3D3; ;
`;

const SearchHeader = styled.div`
  width: 1200px;
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
  width: 1200px;
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
