import React, { useMemo } from 'react';
import guguStyled from '@/core/styled';

import ListTable from '../common/ListTable';
import Cell from '../common/Cell';
import { getDateFormat } from '@/utils/dateParse';
import { greyBg1, greyButton } from '@/static/style/common';

type OrderContentProps = {
  orderProducts: any;
};

const tableHeader = [
  { id: 'orderDate', name: '주문 날짜', width: '10%' },
  { id: 'productName', name: '상품명', width: '60%' },
  { id: 'price', name: '상품금액/수량', width: '15%' },
  { id: 'review', name: '리뷰작성', width: '15%' },
];

const ProductInfoCell = ({ thunbNail, name }) => {
  return (
    <Cell textAlign="left">
      <ProdcutImg src={thunbNail} />
      <span>{name}</span>
    </Cell>
  );
};

const ReviewButton = ({ isReviewed }) => {
  const buttonName = isReviewed ? '작성완료' : '리뷰작성';
  return (
    <Cell>
      <Button isReview={isReviewed}>{buttonName}</Button>
    </Cell>
  );
};

const OrderContent = ({ orderProducts }: OrderContentProps) => {
  const tableBody = useMemo(() => {
    return orderProducts.map((orderProduct) => {
      const { id, created_at, name, price, amount, thumbnail, is_reviewed } = orderProduct;
      return {
        id,
        cells: [
          { c: <Cell>{getDateFormat(created_at)}</Cell>, colSpan: 1 },
          { c: <ProductInfoCell thunbNail={thumbnail} name={name} />, colSpan: 1 },
          {
            c: (
              <Cell>
                {Number(price).toLocaleString()}원/{amount}개
              </Cell>
            ),
            colSpan: 1,
          },
          { c: <ReviewButton isReviewed={is_reviewed} />, colSpan: 1 },
        ],
      };
    });
  }, [orderProducts]);

  return (
    <OrderContentContainer>
      <ListTable header={tableHeader} body={tableBody} />
    </OrderContentContainer>
  );
};

const OrderContentContainer = guguStyled.div``;

const ProdcutImg = guguStyled.img`
  width: 50px;
  margin-right: 10px;
`;

const Button = guguStyled.button`
  padding: 5px;
  border-radius: 5px;
  border: ${({ isReview }) => (isReview ? `1px solid ${greyButton};` : `1px solid black;`)}
  color: ${({ isReview }) => (isReview ? greyButton : 'black')}
`;

export default OrderContent;
