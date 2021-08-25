import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';

import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';
import ModalPortal from '@/utils/portal';
import PostModal from '../../common/PostModal';

import { ProductContext } from '@/hooks/context';

type ProductBoardProps = {
  title: string;
};

/**
 * TODO:
 * 데이터 생성시 상위에서
 * 데이터 받아온 후  postInfoDatas  업데이트 해야합니다.
 */
const ProductBoard = ({ title }: ProductBoardProps) => {
  const { info } = useContext(ProductContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [postInfoDatas, setPostInfoDatas] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [showContent, setShowContent] = useState([]);

  useEffect(() => {
    setPostInfoDatas(postDummyDatas.slice(pageStart, pageEnd));
  }, []);

  /**
   * page Number를 클릭해줌으로써
   * 게시글 리스트와 페이지 넘버 color가 바뀐다.
   */
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

  const handleClickButton = () => {
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
          <PostModal onClose={handleClickForClose} title={title} item={info}></PostModal>
        </ModalPortal>
      )}
    </ProductBoardContainer>
  );
};

export default ProductBoard;

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
