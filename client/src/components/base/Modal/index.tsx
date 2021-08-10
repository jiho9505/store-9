import React from 'react';
import styled from '@emotion/styled';

type ModalProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const Modal = ({ title, children, isOpen, onClose, onConfirm }: ModalProps) => {
  return isOpen ? (
    <ModalBackDrop>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalAction>
          <CloseButton onClick={onClose}>취소</CloseButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ModalAction>
      </ModalContainer>
    </ModalBackDrop>
  ) : null;
};

const ModalBackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div`
  width: 623px;
  z-index: 1;
  padding: 20px;
  position: absolute;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalHeader = styled.div``;

const ModalContent = styled.div``;

const ModalAction = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const ModalButton = styled.button`
  display: flex;
  padding: 1.5% 4.5%;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(ModalButton)`
  background-color: #ffffff;
  margin-right: 5px;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #000000;
  color: #ffffff;
  margin-left: 5px;
`;

export default Modal;
