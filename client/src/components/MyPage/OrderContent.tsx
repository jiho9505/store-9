import React, { useMemo } from 'react';
import guguStyled from '@/core/styled';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';

type OrderContentProps = {
  orderProducts: any;
};

const tableHeader = [
  { id: 'orderDate', name: '주문 날짜', width: '15%' },
  { id: 'productName', name: '상품명', width: '70%' },
  { id: 'price', name: '상품금액/수량', width: '15%' },
];

const ProductInfoCell = ({ thunbNail, name }) => {
  return (
    <Cell textAlign="left">
      <ProdcutImg src={thunbNail} />
      <span>{name}</span>
    </Cell>
  );
};

const ProdcutImg = guguStyled.img`
  width: 50px;
  margin-right: 10px;
`;

const OrderContent = ({ orderProducts }: OrderContentProps) => {
  const tableBody = useMemo(() => {
    return orderProducts.map((orderProduct) => {
      const { productId, createdAt, name, price, quantity, thumbNail } = orderProduct;
      return {
        id: productId,
        cells: [
          { c: <Cell>2020-10-01</Cell>, colSpan: 1 },
          { c: <ProductInfoCell thunbNail={thumbNail} name={name} />, colSpan: 1 },
          { c: <Cell>{price}</Cell>, colSpan: 1 },
        ],
      };
    });
  }, []);

  return (
    <OrderContentContainer>
      <ListTable header={tableHeader} body={tableBody} />
    </OrderContentContainer>
  );
};

const OrderContentContainer = guguStyled.div``;

export default OrderContent;
