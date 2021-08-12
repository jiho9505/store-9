import React, {useMemo} from 'react';
import styled from '@emotion/styled';
import { greyLine, normalRadius, greyBg1 } from '@/static/style/common';

type test = {
  [key: string]: number | {c: React.ReactNode, colSpan: number}
}

type ListTableProps = {
  checkable: boolean;
  header: Array<{ id: string; name: string; width?: string; rowSpan?: number }>;
  body: test [];
  selectedItems?: Set<number>;
  onCheck?: (id: number) => void;
  onCheckAll?: (e) => void
};

const ListTable = ({ checkable, header, body, selectedItems ,onCheck , onCheckAll}: ListTableProps) => {

  const tHeaderWidth = useMemo(() => {
    return header.map(({ width }) => width ? width : '10%')
  }, [header])

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
              <CheckBox type="checkbox" onChange={onCheckAll}/>
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
        {body.map(({ id, ...rest }) => (
          <TableBodyRow key={id}>
            {checkable && (
              <td>
                <CheckBox type="checkbox" checked={selectedItems.has(id)} onChange={() => onCheck(id)} />
              </td>
            )}
            {Object.keys(rest).map((cell) => {
              return <td key={cell} colSpan={rest.[cell].colSpan}>{rest.[cell].c}</td>;
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
`;

const TableHeaderRow = styled.tr`
  height: 40px;
  border-bottom: 1px solid ${greyLine};
`

const TableHeaderCell = styled.th`
  line-height: 40px;
`

const TableBodyRow = styled.tr`
  border-bottom: 1px solid ${greyBg1}
`

const CheckBox = styled.input`
  margin-right: 10px;
`

export default ListTable;
