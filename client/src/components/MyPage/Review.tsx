import React, { useMemo } from 'react';
import guguStyled from '@/core/styled';

import ListTable from '../base/ListTable';
import Cell from '../base/Cell';
import { getDashFormat } from '@/utils/dateParse';

type ReviewContentProps = {
  reviews: any;
};

const tableHeader = [
  { id: 'id', name: '번호', width: '10%' },
  { id: 'title', name: '제목', width: '70%' },
  { id: 'date', name: '날짜', width: '10%' },
  { id: 'writer', name: '작성자', width: '10%' },
];

const ReviewContent = ({ reviews }: ReviewContentProps) => {
  const tableBody = useMemo(() => {
    return reviews.map((review) => {
      const { id, title, date, writer } = review;
      return {
        id,
        cells: [
          { c: <Cell>{id}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
          { c: <Cell>{getDashFormat(date)}</Cell>, colSpan: 1 },
          { c: <Cell>{writer}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, []);

  return (
    <RiviewContentContainer>
      <ListTable header={tableHeader} body={tableBody} />
    </RiviewContentContainer>
  );
};

const RiviewContentContainer = guguStyled.div``;

export default ReviewContent;
