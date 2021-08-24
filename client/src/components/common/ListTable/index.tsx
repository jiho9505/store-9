import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { greyLine, normalRadius, greyBg1, baeminFont } from '@/static/style/common';

type bodyType = {
  id: number;
  cells: { c: React.ReactNode; colSpan?: number }[];
};

type ListTableProps = {
  checkable: boolean;
  header: Array<{ id: string; name: string; width?: string; rowSpan?: number }>;
  body: bodyType[];
  selectedItems?: Set<number>;
  onClickRow?(id: number): void;
  onCheck?(id: number): void;
  onCheckAll?(e): void;
};

const ListTable = ({
  checkable,
  header,
  body,
  selectedItems,
  onClickRow,
  onCheck,
  onCheckAll,
}: ListTableProps) => {
  const tHeaderWidth = useMemo(() => {
    return header.map(({ width }) => (width ? width : '10%'));
  }, [header]);

  const handleRowClick = (id) => () => {
    onClickRow?.(id);
  };

  return (
    <Table>
      <colgroup>
        {checkable && <col width="1%" />}
        {tHeaderWidth.map((width, idx) => (
          <col key={idx} width={width} />
        ))}
      </colgroup>
      <thead>
        <TableHeaderRow>
          {checkable && (
            <TableHeaderCell>
              <CheckBox type="checkbox" onChange={onCheckAll} />
            </TableHeaderCell>
          )}
          {header.map(({ id, name, rowSpan }) => (
            <TableHeaderCell key={id} rowSpan={rowSpan && rowSpan}>
              {name}
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      </thead>
      <tbody>
        {body.map(({ id, cells }) => (
          <TableBodyRow key={id} onClick={handleRowClick(id)}>
            {checkable && (
              <td>
                <CheckBox
                  type="checkbox"
                  checked={selectedItems.has(id)}
                  onChange={() => onCheck(id)}
                />
              </td>
            )}
            {cells.map((cell, idx) => {
              return (
                <td key={`${id}_${idx}`} colSpan={cell.colSpan}>
                  {cell.c}
                </td>
              );
            })}
          </TableBodyRow>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: ${normalRadius};
  overflow: hidden;
`;

const TableHeaderRow = styled.tr`
  height: 40px;
  background-color: ${greyBg1};
  border-bottom: 1px solid ${greyLine};
  th {
    font-family: ${baeminFont};
  }
`;

const TableHeaderCell = styled.th`
  line-height: 40px;
`;

const TableBodyRow = styled.tr`
  border-bottom: 1px solid ${greyBg1};

  td {
    div {
      font-family: ${baeminFont};
    }
  }
  &:hover {
    background-color: ${greyBg1};
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  margin: 0 10px 0;
  opacity: 0.5;
`;

ListTable.defaultProps = {
  checkable: false,
};

export default ListTable;
