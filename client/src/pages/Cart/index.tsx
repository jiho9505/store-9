import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import {
  normalContainerWidth,
  greyLine,
  greySpan,
  normalRadius,
  baeminFont,
} from '@/static/style/common';
import useLocalStorage from '@/hooks/customHooks/useLocalStorage';
import useAlert from '@/hooks/customHooks/useAlert';
import RefreshStore from '@/stores/RefreshStore';
import OrderApi from '@/apis/OrderApi';
import UserApi from '@/apis/UserApi';

import { CartContent } from '@/components/Cart';
import PricePannel from '@/components/common/PricePannel';
import OrderStageHeader from '@/components/common/OrderStageHeader';
import ModalPortal from '@/utils/portal';
import Message from '@/components/common/Message';
import { alertMsg } from '@/utils/errorMessage';

const CartPage = () => {
  const { refresh, refreshComponent } = RefreshStore;

  const [cartInfo, setCartInfo] = useLocalStorage<{ cartId?: number; products?: any[] }>(
    'cartInfo',
    {}
  );

  const { isShow, alertInfo, showAndUnShowAlert } = useAlert();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [cartProducts, setCartProducts] = useState([]);
  const [curCartId, setCurCartId] = useState(0);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    localStorage.clear();
    setCartInfo({ cartId: curCartId, products: [] });
  }, [curCartId]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const { data } = await OrderApi.getCart();
        setCartProducts(data.orderItems);
        setCurCartId(data.id);
      } catch (err) {
        // setError(err.message);
      }
    };
    getCartItems();
  }, [refreshComponent]);

  const addProductInLocalStorage = (id) => {
    const [selectedProduct] = cartProducts.filter(({ id: cartId }) => id === cartId);
    setCartInfo({ ...cartInfo, products: [...cartInfo.products, selectedProduct] });
  };

  const removeProductInLocalStorage = useCallback((id) => {
    const newProducts = cartInfo.products.filter(({ id: orderId }) => orderId !== id);
    setCartInfo({ ...cartInfo, products: newProducts });
  }, []);

  const handleClickCheckbox = (id) => {
    if (selectedItems.has(id)) {
      removeProductInLocalStorage(id);
      setSelectedItems((prev) => {
        prev.delete(id);
        return new Set(prev);
      });
    } else {
      addProductInLocalStorage(id);
      setSelectedItems((prev) => new Set(prev.add(id)));
    }
  };

  const handleToggleSelectAllBtn = (e) => {
    const { target } = e;
    const curProductId = cartProducts.map((cartProduct) => cartProduct.id);
    if (target.checked) {
      setSelectedItems(new Set(curProductId));
      setCartInfo({ ...cartInfo, products: cartProducts });
    } else {
      setSelectedItems(new Set());
      setCartInfo({ cartId: curCartId, products: [] });
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

  const handleDeleteClick = async () => {
    if (selectedItems.size === 0) {
      showAndUnShowAlert({ mode: 'caution', msg: alertMsg['EMPTY_DELETE'] });
      return;
    }
    const selected = Array.from(selectedItems);

    try {
      const result = await OrderApi.removeCartItem({ orderItemId: selected });
      if (result.ok) {
        showAndUnShowAlert({ mode: 'success', msg: alertMsg['SUCCESS_DELETE'] });
        refresh();
      }
    } catch (err) {
      showAndUnShowAlert({ mode: 'fail', msg: alertMsg['FAIL_DELETE'] });
    }
  };

  const orderItemIdtoProductId = (selected) => {
    return selected.map((itemId) => {
      const item = cartProducts.find((cartProduct) => cartProduct.id === itemId);
      return item.product.id;
    });
  };

  const handleLikeClick = async () => {
    if (selectedItems.size === 0) {
      showAndUnShowAlert({ mode: 'caution', msg: alertMsg['EMPTY_LIKE'] });
      return;
    }
    const selected = Array.from(selectedItems);
    const productId: number[] = orderItemIdtoProductId(selected);

    try {
      const result = await UserApi.likeMany({ productId });
      showAndUnShowAlert({ mode: 'success', msg: alertMsg['SUCCESS_ADD_LIKE'] });
    } catch (err) {
      showAndUnShowAlert({ mode: 'fail', msg: alertMsg['FAIL_ADD_LIKE'] });
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
        <PricePannel productTotalPrice={calTotalProductPrice()} cartInfo={cartInfo} />
      </CartFooter>
      {isShow && (
        <ModalPortal>
          <Message text={alertInfo.msg} mode={alertInfo.mode} />
        </ModalPortal>
      )}
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
