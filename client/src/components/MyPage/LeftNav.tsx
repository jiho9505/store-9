import React, { Fragment, useMemo } from 'react';
import guguStyled from '@/core/styled';

import { NavLink } from '@/core/Router';
import { Like, Buy, Review, QnA, Cart } from '@/static/assets/svg';

import { baeminFont, greyBg1, greyButton, primary1 } from '@/static/style/common';

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
          { path: '/mypage/review', icon: <CustomReview />, title: '나의 구매후기' },
        ],
      },
    ];
  }, []);

  return (
    <LeftNavContainer>
      {navMenus.map(({ title, items }) => (
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
      ))}
    </LeftNavContainer>
  );
};

const LeftNavContainer = guguStyled.div`
  width: 200px;
  height: fit-content;
  border-radius: 18px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px 10px;
  margin-right: 40px;
`;

const SubNavTitle = guguStyled.h4`
  color: ${greyButton};
  margin-left: 10px;
  font-family: ${baeminFont};
  margin-bottom: 10px;
  font-size: 19px;
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
  font-size: 15px;

  span {
    font-family: ${baeminFont};
  }

`;

const getIconStyle = () => {
  return `
    height: 90%;
    width: 12%;
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
