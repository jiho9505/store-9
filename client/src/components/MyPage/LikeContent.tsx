import React, { useMemo } from 'react';

import guguStyled from '@/core/styled';

import ListTable from '../common/ListTable';
import TableItem from '../common/TableItem';
import Cell from '../common/Cell';

// api 확정되면 type 지정
type LikeContentProps = {
  likeProducts: any;
  selectedProduct: Set<number>;
  onCheck(id: number): void;
  onCheckAll(e): void;
};

const tableHeader = [
  { id: 'productName', name: '상품명/옵션', width: '70%' },
  { id: 'price', name: '상품금액', width: '10%' },
  { id: 'total', name: '삭제', width: '10%' },
];

const ProductInfoCell = ({ thumbNail, name }) => {
  return (
    <Cell textAlign="left">
      <ProductImg src={thumbNail} />
      <span>{name}</span>
    </Cell>
  );
};

const LikeContent = ({ likeProducts, onCheck, onCheckAll, selectedProduct }: LikeContentProps) => {
  const tableBody = useMemo(
    () =>
      likeProducts.map((likeProduct) => {
        const { id, product } = likeProduct;
        return {
          id,
          cells: [
            {
              c: <ProductInfoCell thumbNail={product.thumbnail} name={product.name} />,
              colSpan: 1,
            },
            { c: <Cell>{Number(product.price).toLocaleString()}원</Cell> },
            {
              c: (
                <Cell>
                  <button>삭제</button>
                </Cell>
              ),
            },
          ],
        };
      }),
    [likeProducts]
  );

  return (
    <div>
      <ListTable
        checkable
        header={tableHeader}
        body={tableBody}
        onCheck={onCheck}
        onCheckAll={onCheckAll}
        selectedItems={selectedProduct}
      />
    </div>
  );
};

export default LikeContent;

const ProductImg = guguStyled.img`
  width: 50px;
  margin-right: 10px;
`;
