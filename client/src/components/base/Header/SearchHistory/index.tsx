import React from 'react';
import styled from '@emotion/styled';

import { getDateFormat } from '@/utils/dateParse';
import { baeminFont, greyBg1, greyLine, greySpan } from '@/static/style/common';

const SearchHistoryComponent = () => {
  const createHistory = () => {
    return (
      <SearchHistory>
        <Content>TEST</Content>
        <RightSide>
          <Day>{getDateFormat('', 'dot')}</Day>
          <Close className="fas fa-times"></Close>
        </RightSide>
      </SearchHistory>
    );
  };
  return (
    <SearchHistoryContainer>
      <SearchHistories>
        <Title>최근검색어</Title>
        {createHistory()}
      </SearchHistories>
      <SearchOptionContainer>
        <ClearHistoriesButton>전체삭제</ClearHistoriesButton>
        <CloseButton>닫기</CloseButton>
      </SearchOptionContainer>
    </SearchHistoryContainer>
  );
};

export default SearchHistoryComponent;

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
const Close = styled.i`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 15px;
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

  font-size: 12px;
`;
const SearchHistories = styled.ul`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const SearchHistoryContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 73px;
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
