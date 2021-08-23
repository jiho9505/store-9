import React from 'react';
import styled from '@emotion/styled';

import { greyBg1, greyLine, baeminThickFont } from '@/static/style/common';

type ModalWrapperProps = {
  onClose(): void;
  title?: string;
  children: React.ReactNode;
};

const ModalWrapper = ({ onClose, title, children }: ModalWrapperProps) => {
  return (
    <ModalContainer>
      <Overlay onClick={onClose} />
      <Modal>
        <ModalHeader>
          <GuideText>{title}</GuideText>
          <i onClick={onClose} className="fas fa-times" />
        </ModalHeader>
        {children}
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
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
  background-color: rgba(0, 0, 0, 0.3);
`;

const Overlay = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 700px;
  height: 700px;
  background: ${greyBg1};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${greyLine};
  padding: 10px 0px;

  i {
    cursor: pointer;
  }
`;

const GuideText = styled.h3`
  font-family: ${baeminThickFont};
`;

export default ModalWrapper;
