import React, { useEffect, useState } from 'react';

import { ReviewContent } from '@/components/MyPage';

import ReviewApi from '@/apis/ReviewApi';

const reviews = [
  {
    id: 1,
    title: '이거...',
    date: new Date(),
    writer: 'ag502',
    content: '별론데요?',
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
    title: '이것도...',
    date: new Date(),
    writer: 'ag502',
    content: '좀 그래요',
    productId: 3,
    name: 'ㅋㅋ 슬리퍼',
    quantity: 2,
    price: 12000,
    totalPrice: 24000,
    thumbNail: 'https://via.placeholder.com/150',
    option: { size: 'small' },
  },
];

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await ReviewApi.getList();
      setReviews(result.reviews);
    })();
  }, []);
  return <ReviewContent reviews={reviews} />;
};

export default ReviewPage;
