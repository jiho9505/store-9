import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from '@/core/Router';

import '@/static/assets/img/circle.png';

import { categories, subCategories } from '@/static/constants';
import { baemin, baeminFont, normalContainerWidth } from '@/static/style/common';
import { getQueryStringValue } from '@/utils/getQueryStringValue';

const weightWhenSubItemsLengthEven = -50;

const Navigation = () => {
  const [subItemXpos, setSubItemXpos] = useState<number>(0);
  const [subItems, setSubItems] = useState([]);
  const [mouseOverdItemName, setMouseOverdItemName] = useState<string>('');
  const [matchedItemIdToURL, setMatchedItemIdToURL] = useState<number>(-1);

  useEffect(() => {
    const handleMouseOverOnDocument = (e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLElement)) return;
      if (!target.closest('#NavBorder')) {
        setSubItems([]);
        setMouseOverdItemName('');
        getQueryStringValue('id')
          ? setMatchedItemIdToURL(Number(getQueryStringValue('id')))
          : setMatchedItemIdToURL(-1);
      }
    };

    document.addEventListener('mouseover', handleMouseOverOnDocument);
    return () => {
      document.removeEventListener('mouseover', handleMouseOverOnDocument);
    };
  }, []);

  let timer: number = 0;

  const handleMouseOverLink = (e: React.ChangeEvent<HTMLAnchorElement>) => {
    const waitTime = new Promise((resolve) => {
      timer = setTimeout(resolve, 150);
    });

    const id = Number(e.currentTarget.dataset.id);
    const itemName = e.currentTarget.innerText;
    const itemXPos = e.currentTarget.getBoundingClientRect().x;

    waitTime.then(() => {
      if (!timer) return;
      const newSubItems = subCategories.filter((item) => item.parentId === id);

      const extraXposToRemove =
        newSubItems.length % 2
          ? Math.floor(newSubItems.length / 2) * 100
          : Math.floor(newSubItems.length / 2) * 100 + weightWhenSubItemsLengthEven;

      setSubItemXpos(itemXPos - extraXposToRemove);
      setSubItems(newSubItems);
      setMouseOverdItemName(itemName);
      setMatchedItemIdToURL(-1);
    });
  };

  const handleMouseOutLink = () => {
    timer = 0;
  };

  return (
    <NavigationContainer id="NavBorder">
      <Menu>
        {categories.map((category) => (
          <Item key={category.name}>
            <CategoryLink
              onMouseOver={handleMouseOverLink}
              onMouseOut={handleMouseOutLink}
              to={`/goods?id=${category.id}`}
              data-id={category.id}
            >
              {category.name}
            </CategoryLink>
            {(mouseOverdItemName === category.name || matchedItemIdToURL === category.id) && (
              <CircleBorder src="images/circle.png" />
            )}
          </Item>
        ))}
      </Menu>
      <SubMenu dist={subItemXpos}>
        {subItems.map((subItem) => (
          <Link to={`/goods?id=${subItem.id}`} key={subItem.name}>
            <SubItem>{subItem.name}</SubItem>
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

const CategoryLink = styled(Link)`
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
