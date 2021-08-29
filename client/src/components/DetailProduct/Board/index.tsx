import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import Message from '@/components/common/Message';
import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';
import ModalPortal from '@/utils/portal';
import PostModal from '../../common/PostModal';

import DetailProductStore from '@/stores/DetailProductStore';
import { showErrorMsgTime } from '@/static/constants';
import { alertMsg } from '@/utils/errorMessage';
import AuthStore from '@/stores/AuthStore';

const requireBuyHistoryMsg = '구매한 상품에 한해서 작성이 가능합니다.';
type ProductBoardProps = {
  title: string;
};

let timer: number = 0;

const ProductBoard = ({ title }: ProductBoardProps) => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [postInfoDatas, setPostInfoDatas] = useState([]);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(10);
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<number[]>([]);
  const [message, setMessage] = useState<Message>({
    showMessage: false,
    messageContent: '',
  });
  const [wholeDatas, setWholeDatas] = useState([]);
  const { reviews, qnas } = DetailProductStore.product;

  useEffect(() => {
    if (title === '상품 후기') {
      setPostInfoDatas(reviews.slice(pageStart, pageEnd));
      setWholeDatas(reviews);
    } else if (title === '상품 문의') {
      setPostInfoDatas(qnas.slice(pageStart, pageEnd));
      setWholeDatas(qnas);
    }
    return () => clearTimeout(timer);
  }, [DetailProductStore.product]);

  const createMsg = (title: string) => {
    setMessage({ showMessage: true, messageContent: title });
    timer = setTimeout(() => {
      setMessage({ ...message, showMessage: false });
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: string) => {
    if (mode === 'notlogin') {
      createMsg(alertMsg['REQUIRED_LOGIN']);
    } else if (mode === 'notbuy') {
      createMsg(requireBuyHistoryMsg);
    }
  };

  const handleClickNumber = (e: React.MouseEvent<HTMLLIElement>) => {
    const newPageNumber = Number(e.currentTarget.dataset.idx);
    const newStartPoint = newPageNumber * 10;
    const newEndPoint = newPageNumber * 10 + 10;
    const newPostInfoDatas = wholeDatas.slice(newStartPoint, newEndPoint);
    setPageNumber(newPageNumber);
    setPageStart(newStartPoint);
    setPageEnd(newEndPoint);
    setPostInfoDatas(newPostInfoDatas);
    setShowContent([]);
  };

  useEffect(() => {
    // 게시물 업데이트
    // setPostInfoDatas(products.blah)
  }, []);

  /**
   * TODO:
   * post 후 store 업데이트 후 전체 새로운 데이터를 가져와야합니다.
   *
   * User login 유무 파악해서 처리 다르게 해야합니다
   * 구매한 사람만 쓸 수 있게 예외처리 해야합니다. (우선순위 뒤)
   *
   * title이 문의냐 후기냐에 따라 if 분기문 작성
   */
  const handleClickButton = () => {
    if (!AuthStore.isLogined) return viewMsgByUserStatus('notlogin');
    setIsActiveModal(true);
  };

  const handleClickForClose = () => {
    setIsActiveModal(false);
  };

  const handleClickTitle = (e: React.MouseEvent<HTMLSpanElement>) => {
    const index = Number(e.currentTarget.dataset.idx);

    if (showContent.includes(index)) {
      const tempArray = [...showContent];
      const idxToDelete = tempArray.indexOf(index);
      tempArray.splice(idxToDelete, 1);
      setShowContent(tempArray);
      return;
    }
    setShowContent([...showContent, index]);
  };

  return (
    <ProductBoardContainer>
      <BoardHeader title={title} handleClickButton={handleClickButton} />
      <BoardPost
        postInfo={postInfoDatas}
        title={title}
        handleClickTitle={handleClickTitle}
        showContent={showContent}
      />
      <BoardPageNumber
        length={wholeDatas.length}
        pageNumber={pageNumber}
        handleClickNumber={handleClickNumber}
      />
      {isActiveModal && (
        <ModalPortal>
          <PostModal
            onClose={handleClickForClose}
            title={title}
            item={DetailProductStore.product}
            formType={{ form: title === '상품 후기' ? 'REVIEW' : 'QNA', mode: 'ENROLL' }}
          />
        </ModalPortal>
      )}
      {message.showMessage && (
        <ModalPortal>
          <Message text={message.messageContent} mode="fail" />
        </ModalPortal>
      )}
    </ProductBoardContainer>
  );
};

export default observer(ProductBoard);

const ProductBoardContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;
