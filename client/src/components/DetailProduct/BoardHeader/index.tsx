import React from 'react';
import styled from '@emotion/styled';

import Button from '../../common/Button';

import { baeminFont } from '@/static/style/common';

type BoardHeaderProps = {
  title: string;
  handleClickButton: () => void;
};

const BoardHeader = ({ title, handleClickButton }: BoardHeaderProps) => {
  return (
    <BoardHeaderContainer>
      <Title>{title}</Title>
      <Button
        size="small"
        value={`${title} 글쓰기`}
        onClick={handleClickButton}
        type="button"
        theme="dark"
      />
    </BoardHeaderContainer>
  );
};

export default BoardHeader;

const BoardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h3`
  font-size: 24px;
  font-family: ${baeminFont};
`;
