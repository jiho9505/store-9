import React, { useMemo, useState } from 'react';
import guguStyled from '@/core/styled';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';
import ModalPortal from '@/utils/portal';
import PostModal from '../common/PostModal';
import EmptyPannel from '../common/EmptyPannel';

import { getDateFormat } from '@/utils/dateParse';

type ReviewContentProps = {
  reviews: any;
};

const tableHeader = [
  { id: 'id', name: '번호', width: '10%' },
  { id: 'productName', name: '제품명', width: '30%' },
  { id: 'title', name: '제목', width: '40%' },
  { id: 'date', name: '날짜', width: '10%' },
];

const ReviewContent = ({ reviews }: ReviewContentProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const [selectReview, setSelectReview] = useState({});

  const tableBody = useMemo(() => {
    return reviews.map((review, idx) => {
      const { id, title, date, product } = review;
      return {
        id: idx,
        cells: [
          { c: <Cell>{id}</Cell>, colSpan: 1 },
          { c: <Cell>{product.name}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
          { c: <Cell>{getDateFormat(date)}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, [reviews]);

  const handleModalClose = () => {
    setActiveModal(false);
  };

  const handleModalOpen = (id) => {
    setSelectReview(reviews[id]);
    setActiveModal(true);
  };

  return (
    <RiviewContentContainer>
      {reviews.length === 0 ? (
        <EmptyPannel />
      ) : (
        <ListTable header={tableHeader} body={tableBody} onClickRow={handleModalOpen} />
      )}
      {activeModal && (
        <ModalPortal>
          <PostModal
            item={selectReview}
            title="상품 후기"
            formType={{ form: 'REVIEW', mode: 'MODIFY' }}
            onClose={handleModalClose}
          />
        </ModalPortal>
      )}
    </RiviewContentContainer>
  );
};

const RiviewContentContainer = guguStyled.div``;

export default ReviewContent;
