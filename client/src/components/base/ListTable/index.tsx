import React from 'react';
import styled from '@emotion/styled';

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
  const calculateThWidth = () => {
    return header.reduce((acc, { width }) => [...acc, width ? width : '10%'], []);
  };


  return (
    <Table>
      <colgroup>
        {checkable && <col width="1%" />}
        {calculateThWidth().map((width, idx) => (
          <col key={idx} width={width} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {checkable && (
            <th>
              <input type="checkbox" onChange={onCheckAll}/>
            </th>
          )}
          {header.map(({ id, name, rowSpan }) => (
            <th key={id} rowSpan={rowSpan && rowSpan}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(({ id, ...rest }) => (
          <tr key={id}>
            {checkable && (
              <td>
                <input type="checkbox" checked={selectedItems.has(id)} onChange={() => onCheck(id)} />
              </td>
            )}
            {Object.keys(rest).map((cell) => {
              return <td key={cell} colSpan={rest.[cell].colSpan}>{rest.[cell].c}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
`;

export default ListTable;
