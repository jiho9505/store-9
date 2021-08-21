import React, { useState } from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';

import SearchHistoryComponent from '../SearchHistory';

import { getDateFormat } from '@/utils/dateParse';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';

const SearchBar = () => {
  const [history, setHistory] = useLocalStorage('searchs', []);
  const [nameForSearch, setNameForSearch] = useState('');
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleFocusInput = () => {
    setShowHistory(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'close') {
      setShowHistory(false);
    } else if (target.id === 'remove') {
    } else if (target.id === 'clear') {
    } else if (target.id === 'content') {
    } else return;
  };

  const handleBlur = (e) => {
    setShowHistory(false);
  };

  const createNewHistory = (value: string) => {
    if (history.length === 10) {
      const newHistory = [...history].slice(0, 9);
      setHistory([{ id: nanoid(), content: value, day: getDateFormat('', 'dot') }, ...newHistory]);
    } else {
      setHistory([{ id: nanoid(), content: value, day: getDateFormat('', 'dot') }, ...history]);
    }
  };

  const handleClickImg = (e: React.MouseEvent<HTMLImageElement>) => {
    createNewHistory(nameForSearch);
  };

  const handleKeyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') createNewHistory(e.currentTarget.value);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameForSearch(e.currentTarget.value);
  };

  return (
    <SearchContainer onBlur={handleBlur}>
      <SearchInput
        onFocus={handleFocusInput}
        placeholder="검색어를 입력해 주세요"
        onKeyPress={handleKeyPressInput}
        onChange={handleChangeInput}
      />
      <Button>
        <SearchImg src="images/search.png" onClick={handleClickImg} />
      </Button>

      {showHistory && <SearchHistoryComponent handleClick={handleClick} histories={history} />}
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
