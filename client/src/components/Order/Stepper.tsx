import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { primary1, white, greySpan } from '@/static/style/common';

type StepperProps = {
  steps: number;
  curStep: number;
};

const Stepper = ({ steps, curStep }: StepperProps) => {
  return (
    <StepperContainer>
      {Array.from({ length: steps }).map((_, idx) => (
        <StepContainer key={`${steps}_${idx}`}>
          {idx ? <Dash /> : null}
          <Step isActive={idx + 1 <= curStep}>{idx + 1}</Step>
        </StepContainer>
      ))}
    </StepperContainer>
  );
};

const StepperContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StepContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Dash = styled.div`
  position: absolute;
  left: calc(-50% + 20px);
  right: calc(50% + 20px);
  border: 1px solid black;
`;

type StepProps = {
  isActive: boolean;
};

const Step = styled.div<StepProps>`
  display: flex;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${(props) => (props.isActive ? `${primary1}` : `${greySpan}`)};
  color: ${white};
  justify-content: center;
  align-items: flex-end;
`;

export default Stepper;
