import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { baeminFont, greyBg1, red1 } from '@/static/style/common';

type Mode = 'success' | 'fail';
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
          <i className="fas fa-exclamation-triangle"></i>
        </FailContainer>
      );
    }
  };
  return (
    <WholeContainer>
      <MessageContainer show={adjustAnimation}>
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

type MessageContainerProps = {
  show: boolean;
};

const WholeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
`;

const MessageContainer = styled.div<MessageContainerProps>`
  transition: all 0.5s ease-in-out;
  transform: translateY(${(props) => (props.show ? '-350px' : '-500px')});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 70px;
  max-height: 120px;
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
