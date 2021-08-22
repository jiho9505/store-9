import { getDateFormat } from '@/utils/dateParse';
import React, { useMemo } from 'react';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';

type QnAContentProps = {
  questions: any;
};

const tableHeader = [
  { id: 'qnaDate', name: '문의날짜', width: '15%' },
  { id: 'category', name: '카테고리', width: '15%' },
  { id: 'title', name: '제목', width: '85%' },
];

const QnAContent = ({ questions }: QnAContentProps) => {
  const tableBody = useMemo(() => {
    return questions.map((question) => {
      const { id, date, category, title } = question;
      return {
        id,
        cells: [
          { c: <Cell>{getDateFormat(date)}</Cell>, colSpan: 1 },
          { c: <Cell>{category}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, [questions]);

  return <ListTable header={tableHeader} body={tableBody} />;
};

export default QnAContent;
