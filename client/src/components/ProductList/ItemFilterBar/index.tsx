import React, { useState } from 'react';
import styled from '@emotion/styled';
import { baemin, baeminFont, baeminThickFont, lightBlack } from '@/static/style/common';

const filterName = ['추천순', '인기순', '최신순', '낮은가격순', '높은가격순'];

type ItemFilterBarProps = {
  handleFilter: (num: number) => void;
  totalProductCount: number;
};

const ItemFilterBar = ({ handleFilter, totalProductCount }: ItemFilterBarProps) => {
  const [index, setIndex] = useState(-1);

  const onClickFilter = (e: React.MouseEvent) => {
    const { target } = e;
    if (!(target instanceof HTMLElement)) return;
    setIndex(Number(target.dataset.idx));
    handleFilter(Number(target.dataset.idx));
  };

  const createFilter = () => {
    return filterName.map((itemName, idx) => (
      <Fliter
        key={`filter-item-${itemName}`}
        onClick={onClickFilter}
        active={index === idx}
        data-idx={idx}
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
  gap: 40px;
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
};

const Fliter = styled.li<FilterProps>`
  color: ${(props) => (props.active ? baemin : lightBlack)};
  font-family: ${baeminFont};
  cursor: pointer;
  font-size: ${(props) => (props.active ? `18px` : `16px`)};
`;
