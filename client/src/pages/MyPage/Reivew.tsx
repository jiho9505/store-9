import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { ReviewContent } from '@/components/MyPage';

import RefreshStore from '@/stores/RefreshStore';
import ReviewApi from '@/apis/ReviewApi';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const { refreshToken } = RefreshStore;

  useEffect(() => {
    (async () => {
      const result = await ReviewApi.getList();
      setReviews(result.reviews);
    })();
  }, [refreshToken]);
  return <ReviewContent reviews={reviews} />;
};

export default observer(ReviewPage);
