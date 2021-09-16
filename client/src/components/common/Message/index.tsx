import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { baeminFont, greyBg1, red1 } from '@/static/style/common';
import { showErrorMsgTime } from '@/static/constants';

type Mode = 'success' | 'fail' | 'caution';
type MessageProps = {
  children?: React.ReactNode;
  mode: Mode;
  text: string;
};

const Message = ({ text, children, mode }: MessageProps) => {
  const [adjustAnimation, setAdjustAnimation] = useState(false);
  useEffect(() => {
    setAdjustAnimation(true);
  }, []);
  const createIcon = () => {
    if (mode === 'success') {
      return (
        <SuccessContainer>
          <i className="fas fa-check-circle"></i>
        </SuccessContainer>
      );
    } else if (mode === 'fail') {
      return (
        <FailContainer>
          <i className="fas fa-exclamation-circle"></i>
        </FailContainer>
      );
    } else if (mode === 'caution') {
      return (
        <CautionContainer>
          <i className="fas fa-exclamation-triangle"></i>
        </CautionContainer>
      );
    }
  };
  return (
    <WholeContainer show={adjustAnimation}>
      <MessageContainer>
        <Text>
          {createIcon()}
          {text}
        </Text>
        {children}
      </MessageContainer>
    </WholeContainer>
  );
};

export default Message;

type WholeContainerProps = {
  show: boolean;
};

const showMessage = keyframes`
  from {
    transform: translateY(-15%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-15%);
  }
`;

const WholeContainer = styled.div<WholeContainerProps>`
  display: flex;
  justify-content: center;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  animation: ${showMessage} ${showErrorMsgTime}ms ease;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  padding: 15px 20px;
  width: 430px;
  background: ${greyBg1};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  font-family: ${baeminFont};
`;

const SuccessContainer = styled.div`
  i {
    margin-right: 10px;
    color: #12db47;
  }
`;

const FailContainer = styled.div`
  i {
    margin-right: 10px;
    color: ${red1};
  }
`;

const CautionContainer = styled.div`
  i {
    margin-right: 10px;
    color: #fcf003;
  }
`;
