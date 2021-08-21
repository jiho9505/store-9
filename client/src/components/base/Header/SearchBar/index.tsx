import React from 'react';
import styled from '@emotion/styled';

const SearchBar = () => {
  return (
    <SearchContainer>
      <SearchInput placeholder="검색어를 입력해 주세요" />
      <Button>
        <SearchImg src="images/search.png" />
      </Button>
    </SearchContainer>
  );
};

export default SearchBar;

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
