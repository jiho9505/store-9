import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { Link } from '@/core/Router';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import ShortCuts from './ShortCuts';

import CategoryApi from '@/apis/CategoryApi';
import { normalContainerWidth } from '@/static/style/common';
import LOGO from '@/static/assets/img/logo.png';

const alertMsg = '카테고리 목록을 불러오는데 실패하였습니다.';
const initCategoryData = [{ name: '전체', id: 0, parentId: null }];

const Header = () => {
  const [categories, setCategories] = useState(initCategoryData);
  const [subCategories, setSubCategories] = useState([]);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await CategoryApi.getCategories();
        if (result.ok) {
          setCategories([...categories, ...result.data.parentCategories]);
          setSubCategories(result.data.subCategories);
          setWords(result.data.productNames);
          // catogoryStore = result.data.parentCategories;
          // subCatogoryStore = result.data.subCategories;
        }
      } catch (e) {
        alert(alertMsg);
      }
    })();
  }, []);

  return (
    <>
      <ShortCuts />
      <HeaderContainer>
        <SearchHeader>
          <LogoLink to="/">
            <Logo src={LOGO} />
          </LogoLink>
          <SearchBar words={words} />
        </SearchHeader>
        <Navigation categories={categories} subCategories={subCategories} />
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
