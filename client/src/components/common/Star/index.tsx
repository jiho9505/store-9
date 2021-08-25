import React from 'react';
import styled from '@emotion/styled';

const arrForTotalStarLength = [1, 2, 3, 4, 5];

type StarComponentProps = {
  score: number;
  handleClickStarIcon?(e: React.MouseEvent<HTMLElement>): void;
};

const StarComponent = ({ score, handleClickStarIcon }: StarComponentProps) => {
  score = Math.round(4.1);
  const createStar = () => {
    return arrForTotalStarLength.map((value, idx) => (
      <Star
        key={value}
        onClick={handleClickStarIcon}
        className={`${idx < score ? 'fas' : 'far'} fa-star`}
        data-idx={idx + 1}
      ></Star>
    ));
  };

  return <>{createStar()}</>;
};

export default StarComponent;

const Star = styled.i`
  color: #fcba03;
`;
