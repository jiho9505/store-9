import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import Message from '@/components/common/Message';
import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';
import ModalPortal from '@/utils/portal';
import PostModal from '../../common/PostModal';

import DetailProductStore from '@/stores/DetailProductStore';
import { requireLoginMsg, showErrorMsgTime } from '@/static/constants';
import { ProductContext } from '@/hooks/context';

const requireBuyHistoryMsg = '구매한 상품에 한해서 작성이 가능합니다.';
type ProductBoardProps = {
  title: string;
};

const ProductBoard = ({ title }: ProductBoardProps) => {
  const { info } = useContext(ProductContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [postInfoDatas, setPostInfoDatas] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [showContent, setShowContent] = useState([]);
  const [showMessage, setshowMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const { products } = DetailProductStore;

  let timer: number = 0;

  useEffect(() => {
    setPostInfoDatas(postDummyDatas.slice(pageStart, pageEnd));
    return () => clearTimeout(timer);
  }, []);

  const createMsg = (title: string) => {
    setshowMessage(true);

    setMessageContent(title);
    timer = setTimeout(() => {
      setshowMessage(false);
    }, showErrorMsgTime);
  };

  const viewMsgByUserStatus = (mode: string) => {
    if (mode === 'notlogin') {
      createMsg(requireLoginMsg);
    } else if (mode === 'notbuy') {
      createMsg(requireBuyHistoryMsg);
    }
  };

  const handleClickNumber = (e: React.MouseEvent<HTMLLIElement>) => {
    const newPageNumber = Number(e.currentTarget.dataset.idx);
    const newStartPoint = newPageNumber * 10;
    const newEndPoint = newPageNumber * 10 + 10;
    const newPostInfoDatas = postDummyDatas.slice(newStartPoint, newEndPoint);
    setPageNumber(newPageNumber);
    setPageStart(newStartPoint);
    setPageEnd(newEndPoint);
    setPostInfoDatas(newPostInfoDatas);
    setShowContent([]);
  };

  useEffect(() => {
    // 게시물 업데이트
    // setPostInfoDatas(products.blah)
  }, [products]);

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
    viewMsgByUserStatus('notlogin');
    // setIsActiveModal(true);
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
        title={title}
        infos={postInfoDatas}
        handleClickTitle={handleClickTitle}
        showContent={showContent}
      />
      <BoardPageNumber
        length={postDummyDatas.length}
        pageNumber={pageNumber}
        handleClickNumber={handleClickNumber}
      />
      {isActiveModal && (
        <ModalPortal>
          <PostModal
            onClose={handleClickForClose}
            title={title}
            item={info}
            formType={{ form: title === '상품 후기' ? 'REVIEW' : 'QNA', mode: 'ENROLL' }}
          />
        </ModalPortal>
      )}
      {showMessage && (
        <ModalPortal>
          <Message text={messageContent} mode="fail" />
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

const postDummyDatas = [
  {
    title: 'Start 1page',
    content: 'Start 1page Content',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    title: 'TEST',
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    title: 'TEST',
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'Start 2page--', content: 'Start 2page--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
  { title: 'TEST', content: '빠른배송감사합니다--', userId: 'User-ID', createAt: '2021-08-18' },
];
