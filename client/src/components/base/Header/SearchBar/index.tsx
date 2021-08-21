import React, { useState } from 'react';
import styled from '@emotion/styled';

import SearchHistoryComponent from '../SearchHistory';

const SearchBar = () => {
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleFocusInput = () => {
    setShowHistory(true);
  };

  return (
    <SearchContainer>
      <SearchInput onFocus={handleFocusInput} placeholder="검색어를 입력해 주세요" />
      <Button>
        <SearchImg src="images/search.png" />
      </Button>

      {showHistory && <SearchHistoryComponent />}
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  position: relative;
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
