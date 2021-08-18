import React, { Fragment, useMemo } from 'react';
import guguStyled from '@/core/styled';

import { NavLink } from '@/Router';
import { Like, Buy, Review, QnA, Cart } from '@/static/assets/svg';

import { greyBg1, greyButton, normalRadius, primary1 } from '@/static/style/common';

const LeftNav = () => {
  const navMenus = useMemo(() => {
    return [
      {
        title: '쇼핑정보',
        items: [
          { path: '/cart', icon: <CustomCart />, title: '장바구니' },
          { path: '/mypage/like', icon: <CustomLike />, title: '찜 목록' },
          { path: '/mypage/order', icon: <CustomBuy />, title: '주문 목록' },
        ],
      },
      {
        title: '회원정보',
        items: [
          { path: '/mypage/QnA', icon: <CustomQnA />, title: '나의 상품문의' },
          { path: '/#', icon: <CustomReview />, title: '나의 구매후기' },
        ],
      },
    ];
  }, []);

  return (
    <LeftNavContainer>
      {navMenus.map(({ title, items }) => {
        return (
          <Fragment key={title}>
            <SubNavTitle>{title}</SubNavTitle>
            <SubNavList>
              {items.map(({ path, icon, title }) => (
                <SubNavListItem key={title}>
                  <SubNavLink
                    activeStyle={{ color: '#000000', 'background-color': greyBg1, border: 'none' }}
                    to={path}
                  >
                    {icon}
                    <span>{title}</span>
                  </SubNavLink>
                </SubNavListItem>
              ))}
            </SubNavList>
          </Fragment>
        );
      })}
    </LeftNavContainer>
  );
};

const LeftNavContainer = guguStyled.div`
  width: 200px;
  height: fit-content;
  border-radius: ${normalRadius};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px 0;
  margin-right: 40px;
`;

const SubNavTitle = guguStyled.h4`
  color: ${greyButton};
  margin-left: 10px;
`;

const SubNavList = guguStyled.ul`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const SubNavListItem = guguStyled.li`
  font-size: 18px;
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

const CustomCart = guguStyled(Cart)`
  ${getIconStyle()}
`;

const CustomLike = guguStyled(Like)`
  ${getIconStyle()}
`;

const CustomBuy = guguStyled(Buy)`
  ${getIconStyle()}
`;

const CustomReview = guguStyled(Review)`
  ${getIconStyle()}
`;

const CustomQnA = guguStyled(QnA)`
  ${getIconStyle()}
`;

export default LeftNav;
