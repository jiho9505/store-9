import React, { useState } from 'react';
import styled from '@emotion/styled';
import { NavLink } from '@/Router';
import { categories, subCategories } from '@/static/constants';
import { baeminFont, normalContainerWidth } from '@/static/style/common';

const Navigation = () => {
  const [subItemXpos, setSubItemXpos] = useState<number>(0);
  const [subItems, setSubItems] = useState([]);
  const handleMouseOverLink = (e: React.ChangeEvent<HTMLAnchorElement>) => {
    const newSubItems = subCategories.filter(
      (item) => item.parentName === e.currentTarget.innerText
    );

    const extraXposToRemove =
      newSubItems.length % 2
        ? Math.floor(newSubItems.length / 2) * 100 - 25
        : Math.floor(newSubItems.length / 2) * 100 - 85;

    setSubItemXpos(e.currentTarget.getBoundingClientRect().x - extraXposToRemove);
    setSubItems(newSubItems);
  };

  return (
    <NavigationContainer>
      <Menu>
        {categories.map(([category, path]) => (
          <Item key={category}>
            <CategoryLink onMouseOver={handleMouseOverLink} to={path}>
              {category}
            </CategoryLink>
          </Item>
        ))}
      </Menu>
      <SubMenu dist={subItemXpos}>
        {subItems.map((subItem) => (
          <SubItem key={subItem.name}>{subItem.name}</SubItem>
        ))}
      </SubMenu>
    </NavigationContainer>
  );
};

export default Navigation;

type SubMenuProps = {
  dist: number;
};

const SubItem = styled.li`
  width: 100px;
  text-align: center;
`;

const NavigationContainer = styled.div``;

const SubMenu = styled.ul<SubMenuProps>`
  display: flex;
  margin-top: 10px;
  margin-left: ${(props) => `${props.dist}px`};
`;

const Menu = styled.ul`
  width: ${normalContainerWidth};
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Item = styled.li`
  width: 80px;
  display: flex;
  justify-content: center;
`;

const CategoryLink = styled(NavLink)`
  height: 55px;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 10px 0;
  font-family: ${baeminFont};
`;
