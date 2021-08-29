import React from 'react';
import styled from '@emotion/styled';

import StarComponent from '@/components/common/Star';

import { baemin, greyBg1, greyLine, lightBlack } from '@/static/style/common';
import { getDateFormat } from '@/utils/dateParse';

type BoardPost = {
  title: string;
  showContent: number[];
  handleClickTitle: (e: React.MouseEvent<HTMLSpanElement>) => void;
  postInfo: unknown;
};

const BoardPost = ({ postInfo, title, handleClickTitle, showContent }) => {
  const createFirstField = () => {
    return title === '상품 후기' ? (
      <StarContainer width="10%">
        <StarComponent score={5}></StarComponent>
      </StarContainer>
    ) : (
      <LockIcon width="10%">
        <i className="fas fa-lock-open"></i>
      </LockIcon>
    );
  };

  const getAnonymousUserName = (userName: string): string => {
    const userNameLength = userName.length;
    const countToChange = Math.floor(userNameLength / 2);
    const sliceStart = userNameLength - countToChange;
    const sliceEnd = sliceStart + countToChange;
    const anonymouseName = userName.slice(sliceStart, sliceEnd - 1);
    return anonymouseName;
  };

  const createPostlist = () => {
    return postInfo.map((info, idx) => (
      <tbody key={info.id}>
        <PostTitleRow>
          {createFirstField()}
          <PostTitleContainer width="60%">
            <PostTitle onClick={handleClickTitle} data-idx={idx}>
              {info.title}
            </PostTitle>
          </PostTitleContainer>
          <PostText width="15%">{getAnonymousUserName(info.username)}</PostText>
          <PostText width="15%">{getDateFormat(info.createAt)}</PostText>
        </PostTitleRow>
        {showContent.includes(idx) && (
          <PostContentRow>
            <PostNumber width="10%"></PostNumber>
            <PostContent width="60%">{info.content}</PostContent>
            <PostText width="15%"></PostText>
            <PostText width="15%"></PostText>
          </PostContentRow>
        )}
      </tbody>
    ));
  };

  return (
    <BoardPostContainer>
      <PostList>{createPostlist()}</PostList>
    </BoardPostContainer>
  );
};

export default BoardPost;

const StarContainer = styled.td``;

const BoardPostContainer = styled.div`
  margin-top: 20px;
`;

const PostList = styled.table`
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid ${greyLine};
`;

const PostTitle = styled.span`
  user-select: none;
`;

const PostTitleRow = styled.tr`
  width: 100%;
  border-top: 1px solid ${greyLine};
  padding: 13px 20px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const PostContentRow = styled(PostTitleRow)`
  display: flex;
  align-items: flex-start;
  min-height: 100px;
  background-color: ${greyBg1};
`;

const PostText = styled.td`
  font-size: 13px;
  color: ${lightBlack};
`;

const PostNumber = styled(PostText)`
  color: ${baemin};
  padding: 0px 20px;
`;

const PostContent = styled(PostText)``;

const PostTitleContainer = styled(PostText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 100px;
  cursor: pointer;
`;

const LockIcon = styled.td`
  i {
    margin-right: 15px;
    font-size: 13px;
    color: ${lightBlack};
    color: ${baemin};
    padding: 0px 20px;
  }
`;
