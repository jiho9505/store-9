import React from 'react';
import guguStyled from '@/core/styled';

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
`;

const Page = guguStyled.li`
  color: ${({ isActive }) => (isActive ? 'red' : 'black')};
`;
