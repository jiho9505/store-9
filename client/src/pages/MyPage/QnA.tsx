import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import guguStyled from '@/core/styled';
import useInput from '@/hooks/customHooks/useInput';
import QnaApi from '@/apis/QnaApi';
import RefreshStore from '@/stores/RefreshStore';

import DurationFilter from '@/components/common/DurationFilter';
import { QnAContent } from '@/components/MyPage';
import { getDateFormat } from '@/utils/dateParse';

const QnAPage = () => {
  const { refreshComponent } = RefreshStore;
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    (async () => {
      const questions = await QnaApi.getList();
      setQuestions(questions.data);
    })();
  }, [refreshComponent]);

  const { form, onChange, onSetForm } = useInput({
    initialState: {
      start: '',
      finish: getDateFormat(new Date()),
    },
  });

  return (
    <QnAPageContainer>
      <DurationFilter form={form} onChange={onChange} onSetForm={onSetForm} />
      <QnAContent questions={questions} />
    </QnAPageContainer>
  );
};

const QnAPageContainer = guguStyled.div``;

export default observer(QnAPage);
