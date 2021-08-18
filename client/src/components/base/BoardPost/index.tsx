import { baemin, baeminFont, greyLine, lightBlack } from '@/static/style/common';
import styled from '@emotion/styled';
import React from 'react';

const BoardPost = ({ infos, title }) => {
  const createLockIcon = () => {
    return (
      title === '상품 문의' && (
        <LockIcon>
          <i className="fas fa-lock"></i>
        </LockIcon>
      )
    );
  };

  const createPostlist = () => {
    return infos.map((info) => (
      <Post>
        <PostNumber width="5%">1</PostNumber>
        {createLockIcon()}
        <PostContent width="65%">{info.content}~</PostContent>
        <PostText width="15%">{info.userId}</PostText>
        <PostText width="15%">{info.createAt}</PostText>
      </Post>
    ));
  };

  return (
    <BoardPostContainer>
      <PostList>
        <tbody>{createPostlist()}</tbody>
      </PostList>
    </BoardPostContainer>
  );
};

export default BoardPost;

const BoardPostContainer = styled.div`
  margin-top: 20px;
`;

const PostList = styled.table`
  width: 100%;
  table-layout: fixed;
`;

const Post = styled.tr`
  width: 100%;
  border-bottom: 1px solid ${greyLine};
  padding: 13px 40px;
  height: 50px;
  display: flex;
  align-items: center;

  &:first-of-type {
    border-top: 1px solid ${greyLine};
  }
`;

const PostText = styled.td`
  font-family: ${baeminFont};
  font-size: 13px;
  color: ${lightBlack};
`;

const PostNumber = styled(PostText)`
  color: ${baemin};
`;

const PostContent = styled(PostText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 100px;
  cursor: pointer;
`;

const LockIcon = styled.td`
  i {
    margin-right: 15px;
  }
`;
