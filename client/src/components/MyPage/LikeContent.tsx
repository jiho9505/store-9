import React, { useMemo } from 'react';

import ListTable from '../common/ListTable';
import TableItem from '../common/TableItem';

// api 확정되면 type 지정
type LikeContentProps = {
  likeProducts: any;
  selectedProduct: Set<number>;
  onCheck(id: number): void;
  onCheckAll(e): void;
};

const tableHeader = [
  { id: 'productName', name: '상품명/옵션', width: '70%' },
  { id: 'price', name: '상품금액/수량', width: '10%' },
  { id: 'total', name: '합계', width: '10%' },
];

const LikeContent = ({ likeProducts, onCheck, onCheckAll, selectedProduct }: LikeContentProps) => {
  const tableBody = useMemo(
    () =>
      likeProducts.map((likeProduct) => {
        return {
          id: likeProduct.productId,
          cells: [{ c: <TableItem product={likeProduct} />, colSpan: 3 }],
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
