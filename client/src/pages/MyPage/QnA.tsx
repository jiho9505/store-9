import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import useInput from '@/hooks/customHooks/useInput';
import QnaApi from '@/apis/QnaApi';
import RefreshStore from '@/stores/RefreshStore';

import DurationFilter from '@/components/common/DurationFilter';
import Pagination from '@/components/common/Pagination';
import { QnAContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const QnAPage = () => {
  const { refreshComponent, refresh } = RefreshStore;
  const [questions, setQuestions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [curPage, setCurPage] = useState(1);
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      await getQnas(form.start, form.finish, curPage - 1);
    })();
  }, [refreshComponent]);

  const getQnas = useCallback(async (startDate, endDate, page = 0) => {
    let query: { startDate?: string; endDate?: string; page?: number } = {};
    if (startDate && endDate) {
      query = { startDate, endDate };
    }
    query.page = page;
    const questions = await QnaApi.getList(query);
    const { data } = questions;
    setQuestions(data.qnas);
    setTotalCount(data.totalCount);
    setCurPage(page + 1);
  }, []);

  const handleSubmitDate = async () => {
    const { start, finish } = form;
    if (!start || !finish) {
      return;
    }
    await getQnas(start, finish);
  };

  const handleChangePage = async (page: number) => {
    const { start, finish } = form;
    await getQnas(start, finish, page - 1);
    setCurPage(page);
  };

  return (
    <QnAPageContainer>
      <DurationFilter
        form={form}
        onChange={onChange}
        onSetForm={onSetForm}
        onSubmit={handleSubmitDate}
      />
      <QnAContent questions={questions} />
      <Pagination totalCount={totalCount} curPage={curPage} onChange={handleChangePage} />
    </QnAPageContainer>
  );
};

const QnAPageContainer = guguStyled.div``;

export default observer(QnAPage);
