import React, { useState, useEffect } from 'react';

import UserApi from '@/apis/UserApi';
import guguStyled from '@/core/styled';
import { greyLine, greySpan, normalRadius } from '@/static/style/common';

import { LikeContent } from '@/components/MyPage';

const LikePage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await UserApi.getLikeList();
      console.log(result.data.likes);
      setLikes(result.data.likes);
    })();
  }, []);

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
    const likeProductId = likes.map(({ id }) => id);
    if (target.checked) {
      setSelectedProducts(new Set(likeProductId));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleClickDeleteBtn = async () => {
    if (selectedProducts.size === 0) return;

    try {
      await UserApi.unlike({ data: { ids: [...selectedProducts] } });
    } catch (err) {
      console.log(err);
      alert('찜 목록 삭제에 실패했습니다.');
    }
  };

  return (
    <LikePageContainer>
      <LikeContent
        likeProducts={likes}
        onCheck={handleClickCheckbox}
        onCheckAll={handleToggleSelectAllBtn}
        selectedProduct={selectedProducts}
      />
      <SelectProductAction>
        <Button onClick={handleClickDeleteBtn}>선택상품 삭제</Button>
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
