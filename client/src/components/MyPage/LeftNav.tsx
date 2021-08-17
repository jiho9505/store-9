import React from 'react';
import guguStyled from '@/core/styled';

import { NavLink } from '@/Router';
import { Like, Buy } from '@/static/assets/svg';

import { greyBg1, greyButton, normalRadius, primary1 } from '@/static/style/common';

const LeftNav = () => {
  return (
    <LeftNavContainer>
      <SubNavTitle>쇼핑정보</SubNavTitle>
      <SubNavConatainer>
        <SubNavList>
          <SubNabListItem>
            <SubNavLink to="/#">
              <CustomBuy />
              <span>주문 목록</span>
            </SubNavLink>
          </SubNabListItem>
          <SubNabListItem>
            <SubNavLink to="/#">
              <CustomLike />
              <span>찜 목록</span>
            </SubNavLink>
          </SubNabListItem>
        </SubNavList>
      </SubNavConatainer>
      <SubNavTitle>회원정보</SubNavTitle>
      <SubNavConatainer>
        <SubNavList>
          <SubNabListItem>나의 상품문의</SubNabListItem>
          <SubNabListItem>나의 상품후기</SubNabListItem>
        </SubNavList>
      </SubNavConatainer>
    </LeftNavContainer>
  );
};

const LeftNavContainer = guguStyled.div`
  width: 200px;
  border-radius: ${normalRadius};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px 0;
`;

const SubNavConatainer = guguStyled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const SubNavTitle = guguStyled.h4`
  color: ${greyButton};
  margin-left: 10px;
`;

const SubNavList = guguStyled.ul``;

const SubNabListItem = guguStyled.li`
  font-size: 18px;
  margin-top: 10px;
  &:hover {
    background-color: ${greyBg1};
  }
`;

const SubNavLink = guguStyled(NavLink)`
  display: flex;
  height: 40px;
  align-items: center;
`;

const getIconStyle = () => {
  return `
    height: 80%;
    width: 15%;
    margin: 0 10px 0px 20px;
    & path {
      fill: ${primary1};
    }
  `;
};

const CustomLike = guguStyled(Like)`
  ${getIconStyle()}
`;

const CustomBuy = guguStyled(Buy)`
  ${getIconStyle()}
`;

export default LeftNav;
