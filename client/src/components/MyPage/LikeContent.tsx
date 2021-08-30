import React, { useMemo } from 'react';

import useHistory from '@/hooks/customHooks/useHistory';
import guguStyled from '@/core/styled';

import EmptyPannel from '../common/EmptyPannel';
import ListTable from '../common/ListTable';
import Cell from '../common/Cell';

type LikeContentProps = {
  likeProducts: any;
  selectedProduct: Set<number>;
  onCheck(id: number): void;
  onCheckAll(e): void;
};

const tableHeader = [
  { id: 'productName', name: '상품명/옵션', width: '60%' },
  { id: 'price', name: '상품금액', width: '20%' },
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
  const history = useHistory();

  const tableBody = useMemo(
    () =>
      likeProducts.map((likeProduct) => {
        const { product, product_id } = likeProduct;
        return {
          id: product_id,
          cells: [
            {
              c: <ProductInfoCell thumbNail={product.thumbnail} name={product.name} />,
              colSpan: 1,
            },
            { c: <Cell>{Number(product.price).toLocaleString()}원</Cell>, colSpan: 1 },
          ],
        };
      }),
    [likeProducts]
  );

  const handleClickRow = (id) => {
    history.push(`/detail?id=${id}`);
  };

  return (
    <div>
      {likeProducts.length === 0 ? (
        <EmptyPannel />
      ) : (
        <ListTable
          checkable
          header={tableHeader}
          body={tableBody}
          onCheck={onCheck}
          onCheckAll={onCheckAll}
          onClickRow={handleClickRow}
          selectedItems={selectedProduct}
        />
      )}
    </div>
  );
};

export default LikeContent;

const ProductImg = guguStyled.img`
  width: 50px;
  margin-right: 10px;
`;
