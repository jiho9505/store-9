import React, { useMemo, useState } from 'react';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';

import { getDateFormat } from '@/utils/dateParse';

import ModalPortal from '@/utils/portal';
import PostModal from '../common/PostModal';

type QnAContentProps = {
  questions: any;
};

const tableHeader = [
  { id: 'id', name: '번호', width: '10%' },
  { id: 'productName', name: '제품명', width: '10%' },
  { id: 'title', name: '문의명', width: '70%' },
  { id: 'qnaDate', name: '문의날짜', width: '10%' },
];

/**
 * 등록된 QnA를 클릭하면 해당 상품 아이디와 관련된 제품 정보를 가져온 후
 * 작성한 내용을 불러와야 합니다.
 * 이때 post modal이 마운트 될때 해당 정보를 네트워크 통신으로 불러올지
 * 아니면 front-end에서 필터링을 할 지 의논해 봐야 될거 같습니다.
 */

const QnAContent = ({ questions }: QnAContentProps) => {
  const { qnas, totalCount } = questions;

  const [activeModal, setActiveModal] = useState(false);
  const [selectedQna, setSelectedQna] = useState({});

  const tableBody = useMemo(() => {
    return (qnas || []).map((question, idx) => {
      const { id, date, title, product } = question;
      return {
        id: idx,
        cells: [
          { c: <Cell>{id}</Cell>, colSpan: 1 },
          { c: <Cell>{product.name}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
          { c: <Cell>{getDateFormat(date)}</Cell> },
        ],
      };
    });
  }, [questions]);

  const handleModalClose = () => {
    setActiveModal(false);
  };

  const handleModalOpen = (id) => {
    setSelectedQna(qnas[id]);
    setActiveModal(true);
  };

  return (
    <>
      <ListTable header={tableHeader} body={tableBody} onClickRow={handleModalOpen} />
      {activeModal && (
        <ModalPortal>
          <PostModal
            item={selectedQna}
            onClose={handleModalClose}
            title="문의하기"
            formType={{ form: 'QNA', mode: 'MODIFY' }}
          />
        </ModalPortal>
      )}
    </>
  );
};

export default QnAContent;
