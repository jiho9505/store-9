import React from 'react';
import guguStyled from '@/core/styled';

import useInput from '@/hooks/customHooks/useInput';

import DurationFilter from '@/components/common/DurationFilter';
import { QnAContent } from '@/components/MyPage';
import Button from '@/components/common/Button';

const questions = [
  { id: 1, date: new Date(), category: '문구', title: '저기요....', content: '이거 얼마에요?' },
  { id: 2, date: new Date(), cateogry: '완구', title: '계세요?...', content: '이건 뭐죠?' },
];

const QnAPage = () => {
  const { form, onChange, onSetForm } = useInput({
    start: '',
    finish: '',
  });

  return (
    <QnAPageContainer>
      <DurationFilter form={form} onChange={onChange} onSetForm={onSetForm} />
      <QnAContent questions={questions} />
      <ButtonContainer>
        <Button
          type="button"
          size="small"
          theme="normal"
          value="질문하기"
          onClick={() => console.log('a')}
        />
      </ButtonContainer>
    </QnAPageContainer>
  );
};

const QnAPageContainer = guguStyled.div``;

const ButtonContainer = guguStyled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export default QnAPage;
