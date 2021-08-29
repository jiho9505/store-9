import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';

import Button from '../Button';
import StarComponent from '@/components/common/Star';
import ModalWrapper from '@/components/common/ModalWrapper';

import ReviewApi from '@/apis/ReviewApi';
import QnaApi from '@/apis/QnaApi';
import DetailProductStore from '@/stores/DetailProductStore';
import RefreshStore from '@/stores/RefreshStore';
import { baeminFont, greyLine, red1 } from '@/static/style/common';

const timeToShowMsg: number = 2000;

type PostModalProps = {
  item: { [key: string]: any };
  onClose(): void;
  title: string;
  formType: { form: 'REVIEW' | 'QNA'; mode: 'ENROLL' | 'MODIFY' };
};

let timeOutId: number;

const PostModal = ({
  item,
  onClose,
  title,
  formType = { form: 'REVIEW', mode: 'ENROLL' },
}: PostModalProps) => {
  const { load } = DetailProductStore;
  const { refresh } = RefreshStore;
  const { id, title: formTitle, content, rate, product } = item;

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
  const [starScore, setStarScore] = useState<number>(5);

  useEffect(() => {
    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    if (formTitle && content) {
      inputRef.current.value = formTitle;
      textAreaRef.current.value = content;
      setStarScore(rate);
    }
  }, []);

  const handleClickEnrollBtn = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { form } = formType;
    const title: string = inputRef.current.value;
    const content: string = textAreaRef.current.value;

    const result = isPassedValidation(title, content);
    if (result) return;

    if (form === 'REVIEW') {
      try {
        await ReviewApi.create(product.id, {
          title,
          content,
          rate: starScore,
          images: [],
        });
        refresh();
        load(product.id);
        onClose();
      } catch (err) {
        alert('리뷰등록에 실패했습니다.');
      }
    } else if (form === 'QNA') {
      try {
        await QnaApi.create({
          title,
          content,
          productId: product.id,
        });
        load(product.id);
        onClose();
      } catch (err) {
        alert('문의등록에 실패했습니다.');
      }
    }
  };

  const handleClickModifyBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { form } = formType;
    const title: string = inputRef.current.value;
    const content: string = textAreaRef.current.value;
    const rate = starScore || 1;

    if (isPassedValidation(title, content)) return;

    const modifyAction = { fn: null, msg: '' };
    if (form === 'REVIEW') {
      modifyAction.fn = async () =>
        await ReviewApi.update(product.id, {
          title: inputRef.current.value,
          content: textAreaRef.current.value,
          rate,
        });
      modifyAction.msg = '리뷰수정에 실패했습니다.';
    } else if (form === 'QNA') {
      modifyAction.fn = async () => {
        await QnaApi.update({
          qnaId: id,
          content,
          title,
        });
      };
      modifyAction.msg = 'QNA 수정에 실패했습니다.';
    }

    try {
      await modifyAction.fn();
      onClose();
      refresh();
    } catch (err) {
      alert(modifyAction.msg);
    }
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

  const Buttons = () => {
    const { mode } = formType;
    if (mode === 'ENROLL') {
      return (
        <Button
          size="small"
          value="등록하기"
          type="submit"
          theme="dark"
          onClick={handleClickEnrollBtn}
        />
      );
    } else if (mode === 'MODIFY') {
      return (
        <Button
          size="small"
          value="수정하기"
          type="submit"
          theme="white"
          onClick={handleClickModifyBtn}
        />
      );
    }
  };

  return (
    <ModalWrapper onClose={onClose} title={title}>
      <ItemContainer>
        <ItemImage src={product.thumbnail} />
        <ItemName>{product.name}</ItemName>
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
        <ButtonContainer>{Buttons()}</ButtonContainer>
      </Form>
    </ModalWrapper>
  );
};

export default observer(PostModal);

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
