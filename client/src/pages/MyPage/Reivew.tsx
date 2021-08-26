import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import RefreshStore from '@/stores/RefreshStore';
import ReviewApi from '@/apis/ReviewApi';

import { ReviewContent } from '@/components/MyPage';
import Pagination from '@/components/common/Pagination';

const ReviewPage = () => {
  const { refreshComponent } = RefreshStore;

  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    (async () => {
      console.log(curPage);
      await getReviews(curPage - 1);
    })();
  }, [refreshComponent]);

  const getReviews = useCallback(async (page: number = 0) => {
    try {
      const { data } = await ReviewApi.getList({ page });
      setReviews(data.reviews);
      setTotalCount(data.totalCount);
      setCurPage(page + 1);
    } catch (err) {
      console.log('데이터 불러오기 실패');
    }
  }, []);

  const handlePageChange = async (page: number) => {
    await getReviews(page - 1);
  };

  return (
    <ReviewPageContainer>
      <ReviewContent reviews={reviews} />
      <Pagination curPage={curPage} totalCount={totalCount} onChange={handlePageChange} />
    </ReviewPageContainer>
  );
};

export default observer(ReviewPage);

const ReviewPageContainer = guguStyled.div``;
