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

/**
 * TODO:
 * 1. 자동완성을 위한 state 하나 추가
 * 2. useEffect로 key press 마다 데이터 최대 10개 받아올 것
 * 3. state를 하위로 내려줄 것
 */
const SearchBar = () => {
  const [history, setHistory] = useLocalStorage('searchs', []);
  const [nameForSearch, setNameForSearch] = useState<string>('');
  const [showWordList, setShowWordList] = useState<boolean>(false);
  const [isOccuredError, setIsOccuredError] = useState<boolean>(false);
  const [recommendWords, setRecommendWords] = useState<string[]>([]);
  const [idxForChoicedWord, setIdxForChoicedWord] = useState<number>(0);

  useEffect(() => {
    registerDomClickEvent();
  }, []);

  const handleFocusInput = () => {
    setShowWordList(true);
  };

  /**
   * TODO:
   * target.id === 'content'
   * Text 결과로 새 페이지에 보여줘야함.
   */
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
      console.log(target.innerText);
    } else return;
  };

  const registerDomClickEvent = () => {
    document.addEventListener('click', (e) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('#search')) setShowWordList(false);
    });
  };

  const createNewHistory = (value: string) => {
    const newHistory = history.length === 10 ? [...history].slice(0, 9) : [...history];
    setHistory([{ id: nanoid(), content: value, day: getDateFormat('', 'dot') }, ...newHistory]);
    setNameForSearch('');
    setShowWordList(false);
  };

  const handleClickImg = () => {
    checkLength(nameForSearch) && createNewHistory(nameForSearch);
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

  const handleKeyUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') return;
    if (e.code === 'ArrowUp') {
      const newIdx: number =
        idxForChoicedWord === 0 ? recommendWords.length - 1 : idxForChoicedWord - 1;
      setNameForSearch(recommendWords[newIdx]);
      setIdxForChoicedWord(newIdx);
      return;
    }
    if (e.code === 'ArrowDown') {
      const newIdx: number =
        idxForChoicedWord === recommendWords.length - 1 ? 0 : idxForChoicedWord + 1;
      setNameForSearch(recommendWords[newIdx]);
      setIdxForChoicedWord(newIdx);
      return;
    }
    const matchedWords = words
      .filter((word) => word.search(getRegExp(e.currentTarget.value)) !== -1)
      .sort((a, b) => a.length - b.length)
      .slice(0, 10);

    setRecommendWords(matchedWords);
  };

  const handleKeyPressInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      checkLength(e.currentTarget.value) && createNewHistory(e.currentTarget.value);
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
