import React from 'react';
import guguStyled from '@/core/styled';

import useInput from '@/hooks/customHooks/useInput';

import DurationFilter from '@/components/base/DurationFilter';
import { QnAContent } from '@/components/MyPage';

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
    </QnAPageContainer>
  );
};

const QnAPageContainer = guguStyled.div``;

export default QnAPage;
