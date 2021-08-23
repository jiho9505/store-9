import React, { useMemo, useState } from 'react';
import guguStyled from '@/core/styled';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';
import { getDateFormat } from '@/utils/dateParse';

import ModalPortal from '@/utils/portal';
import PostModal from '../common/PostModal';

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
  const [activeModal, setActiveModal] = useState(false);

  const tableBody = useMemo(() => {
    return reviews.map((review) => {
      const { id, title, date, writer } = review;
      return {
        id,
        cells: [
          { c: <Cell>{id}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
          { c: <Cell>{getDateFormat(date)}</Cell>, colSpan: 1 },
          { c: <Cell>{writer}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, []);

  const handleModalClose = () => {
    setActiveModal(false);
  };

  const handleModalOpen = () => {
    setActiveModal(true);
  };

  return (
    <RiviewContentContainer>
      <ListTable header={tableHeader} body={tableBody} onClickRow={handleModalOpen} />
      {activeModal && (
        <ModalPortal>
          <PostModal item={reviews[0]} title="상품후기" onClose={handleModalClose} />
        </ModalPortal>
      )}
    </RiviewContentContainer>
  );
};

const RiviewContentContainer = guguStyled.div``;

export default ReviewContent;
