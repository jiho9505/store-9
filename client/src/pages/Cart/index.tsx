import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import {
  normalContainerWidth,
  greyLine,
  greySpan,
  normalRadius,
  baeminFont,
} from '@/static/style/common';

import { CartContent } from '@/components/Cart';
import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import OrderApi from '@/apis/OrderApi';
import RefreshStore from '@/stores/RefreshStore';
import UserApi from '@/apis/UserApi';

const CartPage = () => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [cartProducts, setCartProducts] = useState([]);
  const [error, setError] = useState('');
  const { refresh, refreshComponent } = RefreshStore;

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { data } = await OrderApi.getCart();
        setCartProducts(data.orderItems);
      } catch (err) {
        setError(err.message);
      }
    };
    getCartItems();
  }, [refreshComponent]);

  const handleClickCheckbox = (id) => {
    if (selectedItems.has(id)) {
      setSelectedItems((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    } else {
      setSelectedItems((prev) => new Set(prev.add(id)));
    }
  };

  const calTotalProductPrice = () => {
    return cartProducts.reduce((acc, { id, amount, product }) => {
      if (selectedItems.has(id)) {
        return acc + amount * product.price;
      }
      return acc;
    }, 0);
  };

  const handleToggleSelectAllBtn = (e) => {
    const { target } = e;
    const curProductId = cartProducts.map((cartProduct) => cartProduct.id);
    if (target.checked) {
      setSelectedItems(new Set(curProductId));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleDeleteClick = async () => {
    if (selectedItems.size === 0) return;
    const selected = Array.from(selectedItems);

    try {
      const result = await OrderApi.removeCartItem({ orderItemId: selected });
      if (result.ok) {
        refresh();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const orderItemIdtoProductId = (selected) => {
    return selected.map((itemId) => {
      const item = cartProducts.find((cartProduct) => cartProduct.id === itemId);
      return item.product.id;
    });
  };

  const handleLikeClick = async () => {
    if (selectedItems.size === 0) return;
    const selected = Array.from(selectedItems);
    const productId: number[] = orderItemIdtoProductId(selected);

    try {
      const result = await UserApi.likeMany({ productId });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <CartPageContainer>
      <OrderStageHeader title="장바구니" />
      <CartContent
        cartProducts={cartProducts}
        onCheck={handleClickCheckbox}
        onCheckAll={handleToggleSelectAllBtn}
        selectedItems={selectedItems}
      />
      <CartFooter>
        <SelectProductAction>
          <Button onClick={handleDeleteClick}>선택상품 삭제</Button>
          <Button onClick={handleLikeClick}>선택상품 찜</Button>
        </SelectProductAction>
        <PricePannel productTotalPrice={calTotalProductPrice()} />
      </CartFooter>
    </CartPageContainer>
  );
};

const CartPageContainer = styled.div`
  width: ${normalContainerWidth};
  margin: 0 auto;
  padding-top: 40px;
`;

const CartFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 30px;
`;

const SelectProductAction = styled.div`
  Button {
    font-family: ${baeminFont};
  }
`;

const Button = styled.button`
  width: 120px;
  height: 30px;
  border: 1px solid ${greyLine};
  border-radius: ${normalRadius};
  color: ${greySpan};
  &:first-of-type {
    margin-right: 10px;
  }
`;

export default observer(CartPage);
