import React from 'react';
import styled from '@emotion/styled';

import BoardPost from '../BoardPost';
import BoardHeader from '../BoardHeader';
import BoardPageNumber from '../BoardPageNumber';

const ProductBoard = ({ title }) => {
  return (
    <ProductBoardContainer>
      <BoardHeader title={title} />
      <BoardPost />
      <BoardPageNumber />
    </ProductBoardContainer>
  );
};
const ProductBoardContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

export default ProductBoard;
