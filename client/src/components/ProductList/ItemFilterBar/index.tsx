import React, { useState } from 'react';
import styled from '@emotion/styled';
import { baemin, baeminFont, baeminThickFont, lightBlack } from '@/static/style/common';

const filterName: string[] = ['추천순', '인기순', '최신순', '높은가격순', '낮은가격순'];

type ItemFilterBarProps = {
  handleFilter: (num: number) => void;
  totalProductCount: number;
};

const ItemFilterBar = ({ handleFilter, totalProductCount }: ItemFilterBarProps) => {
  const [index, setIndex] = useState<number>(0);

  const handleClickFilter = (e: React.MouseEvent<HTMLLIElement>) => {
    const choicedIndex = Number(e.currentTarget.dataset.idx);
    setIndex(choicedIndex);
    handleFilter(choicedIndex);
  };

  const createFilter = () => {
    return filterName.map((itemName, idx) => (
      <Fliter
        key={`filter-item-${itemName}`}
        onClick={handleClickFilter}
        active={index === idx}
        data-idx={idx}
        itemLength={itemName.length}
      >
        {itemName}
      </Fliter>
    ));
  };

  return (
    <Container>
      <Total>
        총 <TotalNumber> {totalProductCount}</TotalNumber> 개
      </Total>
      <ItemFilterContainer>{createFilter()}</ItemFilterContainer>
    </Container>
  );
};

export default ItemFilterBar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const ItemFilterContainer = styled.ul`
  display: flex;
`;

const TotalNumber = styled.span`
  font-weight: bold;
  font-family: ${baeminThickFont};
  font-size: 18px;
`;

const Total = styled.span`
  color: ${lightBlack};
  font-size: 14px;

  font-family: ${baeminFont};
`;

type FilterProps = {
  active: boolean;
  itemLength: number;
};

const Fliter = styled.li<FilterProps>`
  text-align: center;
  color: ${(props) => (props.active ? baemin : lightBlack)};
  font-family: ${baeminFont};
  cursor: pointer;
  font-size: ${(props) => (props.active ? `18px` : `16px`)};
  width: ${(props) => (props.itemLength === 3 ? `80px` : `100px`)};
`;
