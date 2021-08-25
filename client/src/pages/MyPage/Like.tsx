import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import UserApi from '@/apis/UserApi';
import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import { greyLine, greySpan, normalRadius } from '@/static/style/common';

import { LikeContent } from '@/components/MyPage';

const LikePage = () => {
  const { refresh, refreshComponent } = RefreshStore;
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await UserApi.getLikeList();
      setSelectedProducts(new Set());
      setLikes(result.data.likes);
    })();
  }, [refreshComponent]);

  const handleClickCheckbox = (id) => {
    if (selectedProducts.has(id)) {
      setSelectedProducts((prev) => {
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
      refresh();
    } catch (err) {
      console.log(err);
      alert('찜 목록 삭제에 실패했습니다.');
    }
  };

  const handleAddLike = async () => {
    try {
      const result = await UserApi.like({ productId: 4 });
      refresh();
    } catch (err) {
      alert('추가 실패');
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
        <Button onClick={handleAddLike}>추가 테스트</Button>
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

export default observer(LikePage);
