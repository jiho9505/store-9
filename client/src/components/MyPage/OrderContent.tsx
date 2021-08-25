import React, { useMemo, useState } from 'react';
import guguStyled from '@/core/styled';

import ModalPortal from '@/utils/portal';
import PostModal from '../common/PostModal';
import ListTable from '../common/ListTable';
import Cell from '../common/Cell';

import { getDateFormat } from '@/utils/dateParse';
import { greyButton } from '@/static/style/common';

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

const ReviewButton = ({ isReviewed, onClick }) => {
  const buttonName = isReviewed ? '작성완료' : '리뷰작성';
  return (
    <Cell>
      <Button isReview={isReviewed} onClick={isReviewed ? null : onClick}>
        {buttonName}
      </Button>
    </Cell>
  );
};

const OrderContent = ({ orderProducts }: OrderContentProps) => {
  const [activeModal, setActiveModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleClickReviewBtn = (idx) => (e) => {
    e.stopPropagation();
    const { thumbnail, name, product_id } = orderProducts[idx];
    setSelectedProduct({ product: { id: product_id, thumbnail, name } });
    handleOpenModal();
  };

  const tableBody = useMemo(() => {
    return orderProducts.map((orderProduct, idx) => {
      const { created_at, name, price, amount, thumbnail, is_reviewed } = orderProduct;
      return {
        id: idx,
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
          {
            c: <ReviewButton isReviewed={is_reviewed} onClick={handleClickReviewBtn(idx)} />,
            colSpan: 1,
          },
        ],
      };
    });
  }, [orderProducts]);

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  const handleOpenModal = () => {
    setActiveModal(true);
  };

  return (
    <OrderContentContainer>
      <ListTable header={tableHeader} body={tableBody} />
      {activeModal && (
        <ModalPortal>
          <PostModal
            title="상품 후기"
            item={selectedProduct}
            onClose={handleCloseModal}
            formType={{ form: 'REVIEW', mode: 'ENROLL' }}
          />
        </ModalPortal>
      )}
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
