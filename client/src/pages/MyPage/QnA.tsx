import React from 'react';
import guguStyled from '@/core/styled';

import useInput from '@/hooks/customHooks/useInput';

import DurationFilter from '@/components/base/DurationFilter';
import { QnAContent } from '@/components/MyPage';
import Button from '@/components/base/Button';

const questions = [
  {
    id: 1,
    date: new Date(),
    category: '문구',
    title: '저기요....',
    content: '이거 얼마에요?',
    productId: 5,
    name: '똑똑똑 실내홥니다',
    quantity: 1,
    price: 6000,
    totalPrice: 6000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
  {
    id: 2,
    date: new Date(),
    cateogry: '완구',
    title: '계세요?...',
    content: '이건 뭐죠?',
    productId: 3,
    name: 'ㅋㅋ 슬리퍼',
    quantity: 2,
    price: 12000,
    totalPrice: 24000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
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
