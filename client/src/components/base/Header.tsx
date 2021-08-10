import React from 'react';
import styled from '@emotion/styled';
import { Link } from '@/Router';

import '@/static/assets/img/logo.png';
import '@/static/assets/img/search.png';

const Header = () => {
  return (
    <HeaderContainer>
      <SearchHeader>
        <StyledLink to="/">
          <Logo src="images/logo.png" />
        </StyledLink>
        <SearchContainer>
          <SearchInput placeholder="검색어를 입력해 주세요" />
          <Button>
            <SearchImg src="images/search.png" />
          </Button>
        </SearchContainer>
      </SearchHeader>
      <Navigation></Navigation>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  min-width: 1450px;
`;

const SearchHeader = styled.div`
  width: 1200px;
  min-height: 103px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const StyledLink = styled(Link)`
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

const Navigation = styled.ul``;

export default Header;
