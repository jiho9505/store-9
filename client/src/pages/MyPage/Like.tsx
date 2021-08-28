import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react';

import UserApi from '@/apis/UserApi';
import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import useAlert from '@/hooks/customHooks/useAlert';
import { greyLine, greySpan, normalRadius } from '@/static/style/common';
import { alertMsg } from '@/utils/errorMessage';

import { LikeContent } from '@/components/MyPage';
import Pagination from '@/components/common/Pagination';
import ModalPortal from '@/utils/portal';
import Message from '@/components/common/Message';

const LikePage = () => {
  const { refresh, refreshComponent } = RefreshStore;

  const { isShow, alertInfo, showAndUnShowAlert } = useAlert();
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [likes, setLikes] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      await getLikeList();
      setCurPage(1);
    })();
  }, [refreshComponent]);

  const getLikeList = useCallback(async (page?: number) => {
    const query: { params?: { page: number } } = {};
    if (page) {
      query.params = { page };
    }
    const result = await UserApi.getLikeList(query);
    const { data } = result;
    setSelectedProducts(new Set());
    setLikes(data.likes);
    setTotalCount(data.totalCount);
    setCurPage(page);
  }, []);

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
    if (selectedProducts.size === 0) {
      showAndUnShowAlert({ mode: 'caution', msg: alertMsg['EMPTY_DELETE'] });
      return;
    }
    try {
      await UserApi.unlike({ data: { ids: [...selectedProducts] } });
      showAndUnShowAlert({ mode: 'success', msg: alertMsg['SUCCESS_DELETE'] });
      refresh();
    } catch (err) {
      showAndUnShowAlert({ mode: 'fail', msg: alertMsg['FAIL_DELETE'] });
    }
  };

  const handleChangePage = async (page: number) => {
    await getLikeList(page);
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
      <Pagination totalCount={totalCount} onChange={handleChangePage} curPage={curPage} />
      {isShow && (
        <ModalPortal>
          <Message text={alertInfo.msg} mode={alertInfo.mode} />
        </ModalPortal>
      )}
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
