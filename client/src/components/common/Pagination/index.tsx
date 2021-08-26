import React from 'react';
import guguStyled from '@/core/styled';
import { baeminFont, greyBg1, greyButton, primary1, white } from '@/static/style/common';

const size = 5;

const getTotalPage = (totalCount) => {
  return Math.ceil(totalCount / size);
};

const Pagination = ({ totalCount, curPage = 1, onChange }) => {
  const handlePageChange = (page: number) => () => {
    onChange(page);
  };

  return (
    <PaginationContainer>
      {Array.from({ length: getTotalPage(totalCount) }).map((_, idx) => (
        <Page key={idx} isActive={curPage === idx + 1} onClick={handlePageChange(idx + 1)}>
          {idx + 1}
        </Page>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = guguStyled.ul`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Page = guguStyled.li`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  font-family: ${baeminFont};
  background-color: ${({ isActive }) => (isActive ? `${primary1}` : `${greyBg1}`)};
  color: ${({ isActive }) => (isActive ? `${white}` : `${greyButton}`)};
  cursor: pointer;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
`;
