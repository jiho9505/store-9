import React, { useState } from 'react';
import styled from '@emotion/styled';

import Stepper from './Stepper';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Button from '@/components/common/Button';

import useInput from '@/hooks/customHooks/useInput';

import { normalRadius } from '@/static/style/common';

const stage1InitialForm = {
  orderName: '',
  phoneNumber: '',
  email: '',
};

const stage2InitialForm = {
  recName: '',
  recPlace: '',
  recPhoneNumber: '',
};

const OrderForm = () => {
  const { form, onChange } = useInput({
    ...stage1InitialForm,
    ...stage2InitialForm,
  });

  const { orderName, phoneNumber, email, recName, recPlace, recPhoneNumber } = form;

  const [stage, setStage] = useState(1);

  const handleClickNext = () => {
    setStage((prev) => prev + 1);
  };

  const handleClickPrev = () => {
    setStage((prev) => prev - 1);
  };

  const forms = () => {
    if (stage === 1) {
      return <Stage1 onChange={onChange} form={{ orderName, email, phoneNumber }} />;
    } else if (stage === 2) {
      return <Stage2 onChange={onChange} form={{ recName, recPlace, recPhoneNumber }} />;
    }
  };

  return (
    <OrderFormContainer>
      <Stepper steps={2} curStep={stage} />
      {forms()}
      <PageAction>
        {stage !== 1 && (
          <Button size="small" theme="white" value="prev" type="button" onClick={handleClickPrev} />
        )}
        {stage !== 2 && (
          <Button size="small" theme="white" value="next" type="button" onClick={handleClickNext} />
        )}
        {stage === 2 && (
          <Button
            size="small"
            theme="white"
            value="submit"
            type="button"
            onClick={() => console.log('a')}
          />
        )}
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
