import React, { useState } from 'react';
import guguStyled from '@/core/styled';

import { greyLine, greySpan, normalRadius } from '@/static/style/common';

import { LikeContent } from '@/components/MyPage';

const likeProducts = [
  {
    productId: 5,
    name: '똑똑똑 실내홥니다',
    quantity: 1,
    price: 6000,
    totalPrice: 6000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
  {
    productId: 3,
    name: 'ㅋㅋ 슬리퍼',
    quantity: 2,
    price: 12000,
    totalPrice: 24000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
];

const LikePage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

  const handleClickCheckbox = (id) => {
    if (selectedProducts.has(id)) {
      setSelectedProducts((prev) => {
        // prev.delete(id);
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } else {
      setSelectedProducts((prev) => new Set(prev.add(id)));
    }
  };

  const handleToggleSelectAllBtn = (e) => {
    const { target } = e;
    const likeProductId = likeProducts.map(({ productId }) => productId);
    if (target.checked) {
      setSelectedProducts(new Set(likeProductId));
    } else {
      setSelectedProducts(new Set());
    }
  };

  return (
    <LikePageContainer>
      <LikeContent
        likeProducts={likeProducts}
        onCheck={handleClickCheckbox}
        onCheckAll={handleToggleSelectAllBtn}
        selectedProduct={selectedProducts}
      />
      <SelectProductAction>
        <Button>선택상품 삭제</Button>
        <Button>장바구니에 담기</Button>
      </SelectProductAction>
    </LikePageContainer>
  );
};

const LikePageContainer = guguStyled.div``;

const SelectProductAction = guguStyled.div`
  margin-top: 30px;
`;

const Button = guguStyled.button`
  width: 120px;
  height: 30px;
  border: 1px solid ${greyLine};
  border-radius: ${normalRadius};
  color: ${greySpan};
  &:first-child {
    margin-right: 10px;
  }
`;

export default LikePage;
