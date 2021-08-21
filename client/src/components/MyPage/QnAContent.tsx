import React, { useMemo, useState } from 'react';
import { getDashFormat } from '@/utils/dateParse';

import ModalPortal from '@/utils/portal';
import PostModal from '../base/PostModal';
import ModalWrapper from '../base/ModalWrapper';
import ListTable from '../base/ListTable';
import Cell from '../base/Cell';

type QnAContentProps = {
  questions: any;
};

const tableHeader = [
  { id: 'qnaDate', name: '문의날짜', width: '15%' },
  { id: 'category', name: '카테고리', width: '15%' },
  { id: 'title', name: '제목', width: '85%' },
];

/**
 * 등록된 QnA를 클릭하면 해당 상품 아이디와 관련된 제품 정보를 가져온 후
 * 작성한 내용을 불러와야 합니다.
 * 이때 post modal이 마운트 될때 해당 정보를 네트워크 통신으로 불러올지
 * 아니면 front-end에서 필터링을 할 지 의논해 봐야 될거 같습니다.
 */

const QnAContent = ({ questions }: QnAContentProps) => {
  const [activeModal, setActiveModal] = useState(false);

  const tableBody = useMemo(() => {
    return questions.map((question) => {
      const { id, date, category, title } = question;
      return {
        id,
        cells: [
          { c: <Cell>{getDashFormat(date)}</Cell>, colSpan: 1 },
          { c: <Cell>{category}</Cell>, colSpan: 1 },
          { c: <Cell>{title}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, [questions]);

  const handleModalClose = () => {
    setActiveModal(false);
  };

  const handleModalOpen = () => {
    setActiveModal(true);
  };

  return (
    <>
      <ListTable header={tableHeader} body={tableBody} onClickRow={handleModalOpen} />
      {activeModal && (
        <ModalPortal>
          <PostModal item={questions[0]} onClose={handleModalClose} title="문의하기" />
        </ModalPortal>
      )}
    </>
  );
};

export default QnAContent;
