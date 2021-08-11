import React from 'react';
import styled from '@emotion/styled';

type ListTableProps = {
  checkable: boolean;
  header: Array<{ id: string; name: string; width?: string; rowSpan?: number }>;
  body: Array<{ id: number; component: React.ReactNode; colSpan: number }>[];
};

const ListTable = ({ checkable, header, body }: ListTableProps) => {
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
              <input type="checkbox" />
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
        {body.map((row, idx) => (
          <tr key={idx}>
            {checkable && (
              <td>
                <input type="checkbox" />
              </td>
            )}
            {row.map(({ id, component, colSpan }) => (
              <td key={id} colSpan={colSpan}>
                {component}
              </td>
            ))}
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
