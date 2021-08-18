import React from 'react';

import { ReviewContent } from '@/components/MyPage';

const reviews = [
  { id: 1, title: '이거...', date: new Date(), writer: 'ag502', content: '별론데요?' },
  { id: 2, title: '이것도...', date: new Date(), writer: 'ag502', content: '좀 그래요' },
];

const ReviewPage = () => {
  return <ReviewContent reviews={reviews} />;
};

export default ReviewPage;
