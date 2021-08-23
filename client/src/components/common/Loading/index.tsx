import React from 'react';

import { baemin, baeminFont } from '@/static/style/common';
import '@/static/assets/img/loading.gif';
import styled from '@emotion/styled';

type Size = 'small' | 'big';

type LoadingProps = {
  size: Size;
};

const Loading = ({ size }: LoadingProps) => {
  return (
    <LoadingContainer>
      <LoadingTitle size={size}>Loading...</LoadingTitle>
      <LoadingImg src="images/loading.gif" size={size}></LoadingImg>
    </LoadingContainer>
  );
};

export default Loading;

type SizeProps = {
  size: string;
};
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const LoadingTitle = styled.h3<SizeProps>`
  font-family: ${baeminFont};
  font-size: ${(props) => (props.size === 'big' ? '40px' : '20px')};
`;
const LoadingImg = styled.img<SizeProps>`
  width: ${(props) => (props.size === 'big' ? '200px' : '100px')};
  height: ${(props) => (props.size === 'big' ? '200px' : '100px')};
  font-family: ${baeminFont};
  color: ${baemin};
`;
