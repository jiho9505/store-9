import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';

import Stepper from './Stepper';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Button from '@/components/common/Button';

import { FormContext } from '@/hooks/context';
import { normalRadius } from '@/static/style/common';
import useInput from '@/hooks/customHooks/useInput';
import Validation from '@/utils/validation';
import OrderApi from '@/apis/OrderApi';
import useHistory from '@/hooks/customHooks/useHistory';

const stage1InitialForm = {
  buyerName: '',
  phone: '',
  email: '',
};

const stage2InitialForm = {
  receiverName: '',
  receiverAddress: '',
  receiverPhone: '',
};

const validationSchema = {
  buyerName: Validation().require().isName(),
  phone: Validation().require().isPhone(),
  email: Validation().require().isEmail(),
  receiverName: Validation().require().isName(),
  receiverAddress: Validation().require(),
  receiverPhone: Validation().require().isPhone(),
};

const OrderForm = () => {
  const history = useHistory();
  const { form, onChange, onBlur, check, error } = useInput({
    initialState: { ...stage1InitialForm, ...stage2InitialForm },
    validationSchema,
  });
  const { buyerName, phone, email, receiverName, receiverAddress, receiverPhone } = form;

  const [stage, setStage] = useState(1);

  const handleClickNext = () => {
    const pass = check('buyerName', 'phone', 'email');
    if (!pass) {
      return;
    }
    setStage((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    setStage((prev) => prev - 1);
  };

  const handleSumitOrderForm = async () => {
    const cartInfo = JSON.parse(localStorage.getItem('cartInfo'));
    const { cartId, products } = cartInfo;

    const orderId = products.map(({ id }) => id);
    await OrderApi.order({
      id: cartId,
      buyerName,
      phone,
      email,
      receiverName,
      receiverAddress,
      receiverPhone,
      selectedItem: orderId,
    });
    history.push('/end-order');
  };

  const Forms = () => {
    if (stage === 1) {
      return (
        <Stage1
          onChange={onChange}
          onBlur={onBlur}
          form={{ buyerName, email, phone }}
          error={error}
        />
      );
    } else if (stage === 2) {
      return (
        <Stage2
          onChange={onChange}
          onBlur={onBlur}
          form={{ receiverName, receiverAddress, receiverPhone }}
          error={error}
        />
      );
    }
  };

  const FormButtons = () => {
    if (stage === 1) {
      return (
        <Button size="small" theme="white" value="next" type="button" onClick={handleClickNext} />
      );
    } else if (stage === 2) {
      return (
        <>
          <Button size="small" theme="white" value="prev" type="button" onClick={handleClickPrev} />
          <Button
            size="small"
            theme="white"
            value="submit"
            type="button"
            onClick={handleSumitOrderForm}
          />
        </>
      );
    }
  };

  return (
    <OrderFormContainer>
      <Stepper steps={2} curStep={stage} />
      {Forms()}
      <PageAction>
        <FormButtons />
      </PageAction>
    </OrderFormContainer>
  );
};

const OrderFormContainer = styled.form`
  width: fit-content;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: ${normalRadius};
  overflow: hidden;
`;

const PageAction = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default OrderForm;
