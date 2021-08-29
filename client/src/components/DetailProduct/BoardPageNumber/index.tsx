import React from 'react';
import styled from '@emotion/styled';

import { lightBlack } from '@/static/style/common';

type BoardPageNumber = {
  length: number;
  pageNumber: number;
  handleClickNumber: (e: React.MouseEvent) => void;
};

const BoardPageNumber = ({ length, pageNumber, handleClickNumber }: BoardPageNumber) => {
  const createPageNumber = () => {
    const getPageLength = Math.floor(length / 10) + 1;
    const PageLengthArray = new Array(getPageLength).fill(0);

    return PageLengthArray.map((_, idx) => (
      <PageNumber onClick={handleClickNumber} key={idx} active={pageNumber === idx} data-idx={idx}>
        {idx + 1}
      </PageNumber>
    ));
  };

  return (
    <BoardPageNumberContainer>
      <PageNumberList>{createPageNumber()}</PageNumberList>
    </BoardPageNumberContainer>
  );
};

export default BoardPageNumber;

type PageNumberProps = {
  active: boolean;
};

const BoardPageNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const PageNumberList = styled.ul`
  display: flex;
  gap: 30px;
`;

const PageNumber = styled.li<PageNumberProps>`
  cursor: pointer;
  color: ${(props) => (props.active ? lightBlack : '#888')};
`;
