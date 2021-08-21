import React from 'react';
import styled from '@emotion/styled';

import { baeminFont, greyBg1, greyLine, greySpan, lightBlack } from '@/static/style/common';

type Histories = {
  content: string;
  day: string;
  id: string;
};

type WordListProps = {
  handleClick(e: React.MouseEvent<HTMLElement>): void;
  histories: Array<Histories>;
  nameForSearch: string;
  recommendWords: string[];
};

const SearchHistoryComponent = ({
  handleClick,
  histories,
  nameForSearch,
  recommendWords,
}: WordListProps) => {
  /**
   * TODO:
   * else 일 때
   * 자동완성 관련 데이터로 재사용없이 UI 구현할 것
   * 현재는 임시데이터
   */
  const createWordList = () => {
    if (nameForSearch.length === 0) {
      return histories.length > 0 ? (
        histories.map((history, idx) => (
          <SearchHistory key={history.id}>
            <Content id="content">{history.content}</Content>
            <RightSide>
              <Day>{history.day}</Day>
              <Remove id="remove" className="fas fa-times" data-idx={idx}></Remove>
            </RightSide>
          </SearchHistory>
        ))
      ) : (
        <EmptyHistory>최근 검색어가 없습니다.</EmptyHistory>
      );
    } else {
      return (
        recommendWords &&
        recommendWords.map((word) => (
          <RecommendWord key={word}>
            <Content id="content">{word}</Content>
          </RecommendWord>
        ))
      );
    }
  };

  const createTitle = () => {
    return nameForSearch.length > 0 ? <Title>추천검색어</Title> : <Title>최근검색어</Title>;
  };

  const createClearButton = () => {
    const viewToShow = nameForSearch.length > 0 ? '' : histories.length > 0 ? '전체삭제' : '';
    return <ClearHistoriesButton id="clear">{viewToShow}</ClearHistoriesButton>;
  };

  return (
    <WordListContainer onClick={handleClick}>
      <Words>
        {createTitle()}
        {createWordList()}
      </Words>
      <SearchOptionContainer>
        {createClearButton()}
        <CloseButton id="close">닫기</CloseButton>
      </SearchOptionContainer>
    </WordListContainer>
  );
};

export default SearchHistoryComponent;

const EmptyHistory = styled.div`
  font-size: 12px;
  color: ${lightBlack};
`;

const Content = styled.div`
  font-family: ${baeminFont};
  cursor: pointer;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${greySpan};
  font-size: 11px;
`;

const Day = styled.span`
  font-family: ${baeminFont};
`;

const Remove = styled.i`
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 16px;
  font-family: ${baeminFont};
  font-weight: bold;
  width: 100%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${greyLine};
`;

const ClearHistoriesButton = styled.span`
  cursor: pointer;
`;

const CloseButton = styled.span`
  cursor: pointer;
`;

const SearchHistory = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const RecommendWord = styled.li(SearchHistory);

const Words = styled.ul`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const WordListContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 65px;
  border: 1px solid ${greyLine};
  width: 90%;
  z-index: 1;
  background-color: white;
`;

const SearchOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${greyBg1};
  padding: 10px 15px;
  font-size: 11px;
  color: ${greySpan};
`;
