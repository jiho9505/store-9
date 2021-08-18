import React, { useRef } from 'react';
import styled from '@emotion/styled';

import Button from '../Button';

import { baeminFont, baeminThickFont, greyBg1, greyLine } from '@/static/style/common';

const PostModal = ({ item }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * TODO:
   */
  const handleClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
    const title = inputRef.current.value;
    const content = textAreaRef.current.value;
  };

  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <GuideText>상품 문의</GuideText>
          <i className="fas fa-times"></i>
        </ModalHeader>

        <ItemContainer>
          <ItemImage src={item.image} />
          <ItemName>{item.title}</ItemName>
        </ItemContainer>
        <Form>
          <Label>제목 : </Label>
          <Title ref={inputRef} />
          <Label>내용 : </Label>
          <Content ref={textAreaRef} />
          <ButtonContainer>
            <Button
              size="small"
              value="등록하기"
              type="submit"
              theme="dark"
              onClick={handleClickButton}
            ></Button>
          </ButtonContainer>
        </Form>
      </Modal>
    </ModalContainer>
  );
};

export default PostModal;

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

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 700px;
  height: 700px;
  background: ${greyBg1};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${greyLine};
  padding: 10px 0px;
`;

const GuideText = styled.h3`
  font-family: ${baeminThickFont};
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 10px 0;
  border-bottom: 1px solid ${greyLine};
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ItemName = styled.span`
  font-family: ${baeminFont};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 15px;
`;

const Title = styled.input`
  height: 30px;
  border-radius: 12px;
  padding: 0px 15px;
`;

const Content = styled.textarea`
  border: none;
  resize: none;
  height: 200px;
  padding: 10px;
  border-radius: 12px;
`;

const Label = styled.label`
  font-family: ${baeminFont};
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;
