import React from 'react';
import styled from '@emotion/styled';

type CellProps = {
  textAlign: 'center' | 'left' | 'right';
  children: React.ReactNode;
};

const Cell = ({ textAlign, children }: CellProps) => {
  return <CellContainer textAlign={textAlign}>{children}</CellContainer>;
};

type CellContainerProps = {
  textAlign: string;
};

const CellContainer = styled.div<CellContainerProps>`
  display: flex;
  align-items: center;
  padding: 20px 0px;
  justify-content: ${({ textAlign }) => textAlign};
`;

Cell.defaultProps = {
  textAlign: 'center',
};

export default Cell;
