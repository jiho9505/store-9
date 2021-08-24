import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import useInput from '@/hooks/customHooks/useInput';
import QnaApi from '@/apis/QnaApi';
import RefreshStore from '@/stores/RefreshStore';

import DurationFilter from '@/components/common/DurationFilter';
import { QnAContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const QnAPage = () => {
  const { refreshComponent, refresh } = RefreshStore;
  const [questions, setQuestions] = useState({});
  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  useEffect(() => {
    (async () => {
      const questions = await getQnas(form.start, form.finish);
      setQuestions(questions.data);
    })();
  }, [refreshComponent]);

  const getQnas = useCallback(async (startDate, endDate) => {
    const query: { params?: { [key: string]: string } } = {};
    if (startDate && endDate) {
      query.params = { startDate, endDate };
    }
    return await QnaApi.getList(query);
  }, []);

  const handleSubmitDate = async () => {
    const { start, finish } = form;
    if (!start || !finish) {
      return;
    }
    refresh();
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
    </QnAPageContainer>
  );
};

const QnAPageContainer = guguStyled.div``;

export default observer(QnAPage);
