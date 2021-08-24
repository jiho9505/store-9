import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import { getRegExp } from 'korean-regexp';

import WordList from '../WordList';

import words from '@/static/constants/words';
import { getDateFormat } from '@/utils/dateParse';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';
import { baeminFont, greyLine, red1 } from '@/static/style/common';
import useHistory from '@/hooks/customHooks/useHistory';

const timeToShowError = 2000;

const SearchBar = () => {
  const [history, setHistory] = useLocalStorage('searchs', []);
  const [nameForSearch, setNameForSearch] = useState<string>('');
  const [showWordList, setShowWordList] = useState<boolean>(false);
  const [isOccuredError, setIsOccuredError] = useState<boolean>(false);
  const [recommendWords, setRecommendWords] = useState<string[]>([]);
  const [idxForChoicedWord, setIdxForChoicedWord] = useState<number>(-1);
  const routerHistory = useHistory();

  useEffect(() => {
    const registerDomClickEvent = (e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('#search')) setShowWordList(false);
    };

    document.addEventListener('click', registerDomClickEvent);
    return () => document.removeEventListener('click', registerDomClickEvent);
  }, []);

  const handleFocusInput = () => {
    setShowWordList(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'close') {
      setShowWordList(false);
    } else if (target.id === 'remove') {
      const idx = Number(target.dataset.idx);
      let newHistory = [...history];
      newHistory.splice(idx, 1);
      setHistory(newHistory);
    } else if (target.id === 'clear') {
      setHistory([]);
    } else if (target.id === 'content') {
      movePageBySearch(target.innerText);
      routerHistory.push(`/goods?word=${target.innerText}`);
    } else return;
  };

  const movePageBySearch = (value: string) => {
    const newHistory = history.length === 10 ? [...history].slice(0, 9) : [...history];
    setHistory([{ id: nanoid(), content: value, day: getDateFormat('', 'dot') }, ...newHistory]);
    setNameForSearch('');
    setShowWordList(false);
    routerHistory.push(`/goods?word=${value}`);
  };

  const handleClickImg = () => {
    checkLength(nameForSearch) && movePageBySearch(nameForSearch);
  };

  const checkLength = (value: string): boolean => {
    if (value.length === 0) {
      setIsOccuredError(true);
      setShowWordList(false);

      setTimeout(() => {
        setIsOccuredError(false);
      }, timeToShowError);
      return false;
    }
    return true;
  };

  const changeSearchName = (pos: 'ArrowUp' | 'ArrowDown') => {
    if (recommendWords.length) {
      let newIdx: number = 0;
      if (pos === 'ArrowUp')
        if (idxForChoicedWord === 0 || idxForChoicedWord === -1) newIdx = recommendWords.length - 1;
        else newIdx = idxForChoicedWord - 1;
      else if (pos === 'ArrowDown')
        newIdx = idxForChoicedWord === recommendWords.length - 1 ? 0 : idxForChoicedWord + 1;
      setNameForSearch(recommendWords[newIdx]);
      setIdxForChoicedWord(newIdx);
    }
  };

  const handleKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') return;
    if (e.code === 'ArrowUp') {
      changeSearchName('ArrowUp');
      return;
    }
    if (e.code === 'ArrowDown') {
      changeSearchName('ArrowDown');
      return;
    }

    const matchedWords = words
      .filter((word) => word.search(getRegExp(e.currentTarget.value)) !== -1)
      .sort((a, b) => a.length - b.length)
      .slice(0, 10);

    setRecommendWords(matchedWords);
    setIdxForChoicedWord(-1);
  };

  const handleKeyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      checkLength(e.currentTarget.value) && movePageBySearch(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameForSearch(e.currentTarget.value);
  };

  return (
    <SearchContainer id="search">
      <SearchInput
        onFocus={handleFocusInput}
        placeholder="검색어를 입력해 주세요"
        onKeyUp={handleKeyUpInput}
        onKeyPress={handleKeyPressInput}
        onChange={handleChangeInput}
        value={nameForSearch}
        maxLength={15}
      />
      <Button>
        <SearchImg src="images/search.png" onClick={handleClickImg} />
      </Button>

      {showWordList && (
        <WordList
          handleClick={handleClick}
          histories={history}
          nameForSearch={nameForSearch}
          recommendWords={recommendWords}
          idxForChoicedWord={idxForChoicedWord}
        />
      )}
      {isOccuredError && <ErrorMsg>1글자 이상 입력해주세요❗️</ErrorMsg>}
    </SearchContainer>
  );
};

export default SearchBar;

const ErrorMsg = styled.div`
  position: absolute;
  left: 0px;
  bottom: 18px;
  color: ${red1};
  font-size: 14px;
  font-family: ${baeminFont};
`;

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
  border-bottom: 1px solid ${greyLine};
`;

const Button = styled.button`
  width: 34px;
  height: 34px;
`;

const SearchImg = styled.img`
  width: 70%;
  margin-top: 5px;
`;
