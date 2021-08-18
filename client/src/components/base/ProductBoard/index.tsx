import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';

type ProductBoardProps = {
  title: string;
};
/**
 * TODO:
 * 데이터 생성시 상위에서
 * 데이터 받아온 후  postInfoDatas  업데이트 해야합니다.
 */
const ProductBoard = ({ title }: ProductBoardProps) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [postInfoDatas, setPostInfoDatas] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setpageEnd] = useState(10);

  useEffect(() => {
    setPostInfoDatas(postDummyDatas.slice(pageStart, pageEnd));
  }, []);

  return (
    <ProductBoardContainer>
      <BoardHeader title={title} />
      <BoardPost title={title} infos={postInfoDatas} />
      <BoardPageNumber length={postDummyDatas.length} pageNumber={pageNumber} />
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
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
  {
    content: '빠른배송감사합니다--',
    userId: 'User-ID',
    createAt: '2021-08-18',
  },
];
