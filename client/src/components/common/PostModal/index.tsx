import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import Button from '../Button';
import StarComponent from '@/components/common/Star';

import { baeminFont, baeminThickFont, greyBg1, greyLine, red1 } from '@/static/style/common';

const timeToShowMsg: number = 2000;

const PostModal = ({ item, handleClickForClose, title }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [starScore, setStarScore] = useState<number>(1);

  let timeOutId: number;

  useEffect(() => {
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  /**
   * TODO:
   * 아래 내용과 product userId 등 조합해서 post 요청 보내야합니다.
   * 그 후 mobx를 통해 상태 업뎃해서 상위부터 리렌더링 되게 하면 될것 같습니다.
   */
  const handleClickButton = (e: React.MouseEvent) => {
    e.preventDefault();
    const title: string = inputRef.current.value;
    const content: string = textAreaRef.current.value;

    const result = isPassedValidation(title, content);
    if (result) return;
    handleClickForClose();
  };

  const createErrorMsg = () => {
    setShowErrorMsg(true);
    timeOutId = setTimeout(() => {
      setShowErrorMsg(false);
    }, timeToShowMsg);
  };

  const isPassedValidation = (title: string, content: string): boolean => {
    if (!title.length || !content.length) {
      createErrorMsg();
      return true;
    }
    return false;
  };

  const handleClickStarIcon = (e: React.MouseEvent<HTMLElement>) => {
    const score = Number(e.currentTarget.dataset.idx);
    setStarScore(score);
  };

  return (
    <ModalContainer>
      <Overlay onClick={handleClickForClose} />
      <Modal>
        <ModalHeader>
          <GuideText>{title}</GuideText>
          <i onClick={handleClickForClose} className="fas fa-times"></i>
        </ModalHeader>

        <ItemContainer>
          <ItemImage src={item.image} />
          <ItemName>{item.title}</ItemName>
        </ItemContainer>
        <Form>
          {title === '상품 후기' && (
            <ScoreContainer>
              <Label>별점 : </Label>
              <StarComponent score={starScore} handleClickStarIcon={handleClickStarIcon} />
            </ScoreContainer>
          )}

          <Label>제목 : </Label>
          <Title maxLength={30} ref={inputRef} required />
          <Label>내용 : </Label>
          <Content maxLength={550} ref={textAreaRef} required />
          {showErrorMsg && <ErrorMsg>모든 값을 입력해주시기 바랍니다.</ErrorMsg>}
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

const ScoreContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  i {
    cursor: pointer;
  }

  Label {
    margin-top: 0px;
    margin-right: 5px;
  }
`;

const ErrorMsg = styled.p`
  text-align: center;
  font-family: ${baeminFont};
  color: ${red1};
  font-size: 20px;
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
  font-family: ${baeminFont};
  font-size: 17px;
`;

const Content = styled.textarea`
  border: none;
  resize: none;
  height: 170px;
  padding: 10px;
  border-radius: 12px;
  font-family: ${baeminFont};
  font-size: 17px;
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
