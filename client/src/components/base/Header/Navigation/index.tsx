import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, NavLink } from '@/Router';

import '@/static/assets/img/circle.png';

import { categories, subCategories } from '@/static/constants';
import { baemin, baeminFont, normalContainerWidth } from '@/static/style/common';

const Navigation = () => {
  const [subItemXpos, setSubItemXpos] = useState<number>(0);
  const [subItems, setSubItems] = useState([]);
  const [choicedItemName, setChoicedItemName] = useState<string>('');

  useEffect(() => {
    document.addEventListener('mouseover', (e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('#NavBorder')) setSubItems([]);
    });
  }, []);

  let timer: number = 0;

  const handleMouseOverLink = (e: React.ChangeEvent<HTMLAnchorElement>) => {
    const waitTime = new Promise((resolve) => {
      timer = setTimeout(resolve, 150);
    });

    const itemName = e.currentTarget.innerText;
    const itemXPos = e.currentTarget.getBoundingClientRect().x;

    waitTime.then(() => {
      if (!timer) return;
      const newSubItems = subCategories.filter((item) => item.parentName === itemName);

      const extraXposToRemove =
        newSubItems.length % 2
          ? Math.floor(newSubItems.length / 2) * 100 + 25
          : Math.floor(newSubItems.length / 2) * 100 - 35;

      setSubItemXpos(itemXPos - extraXposToRemove);
      setSubItems(newSubItems);
      setChoicedItemName(itemName);
    });
  };

  const handleMouseOutLink = () => {
    timer = 0;
  };

  return (
    <NavigationContainer id="NavBorder">
      <Menu>
        {categories.map(([category, path]) => (
          <Item key={category}>
            <CategoryLink
              onMouseOver={handleMouseOverLink}
              onMouseOut={handleMouseOutLink}
              to={path}
            >
              {category}
            </CategoryLink>
            {choicedItemName === category && <CircleBorder src="images/circle.png" />}
          </Item>
        ))}
      </Menu>
      <SubMenu dist={subItemXpos}>
        {subItems.map((subItem) => (
          <Link to="/total">
            <SubItem key={subItem.name}>{subItem.name}</SubItem>
          </Link>
        ))}
      </SubMenu>
    </NavigationContainer>
  );
};

export default Navigation;

type SubMenuProps = {
  dist: number;
};

const CircleBorder = styled.img`
  position: absolute;
  left: -7px;
  top: -15px;
  width: 110px;
  height: 80px;
`;

const SubItem = styled.li`
  width: 100px;
  text-align: center;
  cursor: pointer;
  font-size: 13px;
  padding: 10px 0px 20px 0px;
  font-family: ${baeminFont};
  &:hover {
    color: ${baemin};
  }
`;

const NavigationContainer = styled.div``;

const SubMenu = styled.ul<SubMenuProps>`
  display: flex;
  margin-left: ${(props) => `${props.dist}px`};
`;

const Menu = styled.ul`
  width: ${normalContainerWidth};
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const Item = styled.li`
  width: 100px;
  display: flex;
  justify-content: center;
  position: relative;
`;

const CategoryLink = styled(NavLink)`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 0 10px 0;
  font-family: ${baeminFont};
  z-index: 1;
  width: 100%;
`;
