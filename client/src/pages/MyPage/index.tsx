import React from 'react';
import guguStyled from '@/core/styled';

import { Route } from '@/Router';
import { LeftNav } from '@/components/MyPage';

import { normalContainerWidth, baeminThickFont } from '@/static/style/common';

const MyPage = () => {
  return (
    <MyPageContainer>
      <LeftNav />
      <MyPageContentContiner>
        <MyPageHeader>반가워요</MyPageHeader>
        <UserName>OOO 님</UserName>
        <Route path="/mypage/like">
          <div>TEST</div>
        </Route>
      </MyPageContentContiner>
    </MyPageContainer>
  );
};

const MyPageContainer = guguStyled.div`
  display: flex;
  width: ${normalContainerWidth};
  margin: 0 auto;
  padding: 40px 0 0 0;
`;

const MyPageContentContiner = guguStyled.div``;

const MyPageHeader = guguStyled.h2`
  font-family: ${baeminThickFont};
  font-size: 40px;
  margin-bottom: 10px;
`;

const UserName = guguStyled.span`
  font-size: 20px;
`;

export default MyPage;
