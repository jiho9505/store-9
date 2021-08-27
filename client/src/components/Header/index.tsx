import React from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { Link } from '@/core/Router';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ShortCuts from './ShortCuts';

import { normalContainerWidth } from '@/static/style/common';
import LOGO from '@/static/assets/img/logo.png';

const Header = () => {
  return (
    <>
      <ShortCuts />
      <HeaderContainer>
        <SearchHeader>
          <LogoLink to="/">
            <Logo src={LOGO} />
          </LogoLink>
          <SearchBar />
        </SearchHeader>
        <Navigation />
      </HeaderContainer>
    </>
  );
};

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

export default observer(Header);
