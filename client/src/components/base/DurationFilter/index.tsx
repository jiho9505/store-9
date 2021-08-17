import React from 'react';
import guguStyled from '@/core/styled';

import Input from '../Input';
import Button from '../Button';

import useInput from '@/hooks/customHooks/useInput';
import { primary1, normalRadius } from '@/static/style/common';

const durationFilter = [
  { type: 'day', value: 0, content: '오늘' },
  { type: 'day', value: 7, content: '7일' },
  { type: 'day', value: 15, content: '15일' },
  { type: 'month', value: 1, content: '1개월' },
  { type: 'month', value: 3, content: '3개월' },
  { type: 'year', value: 1, content: '1년' },
];

const DurationFilter = () => {
  const { form, onChange, reset } = useInput({
    start: '',
    finish: '',
  });

  return (
    <DurationFilterContainer>
      <FilterContainer>
        <DateInputContainer>
          <Input
            name="start"
            size="small"
            type="date"
            variant="outlined"
            required
            value={form.start}
            onChange={onChange}
          />
          <span>-</span>
          <Input
            name="finish"
            size="small"
            type="date"
            variant="outlined"
            required
            value={form.finish}
            onChange={onChange}
          />
        </DateInputContainer>
        <DurationButtons>
          {durationFilter.map(({ type, value, content }) => (
            <DuartionButton>{content}</DuartionButton>
          ))}
        </DurationButtons>
      </FilterContainer>
      <Button
        size="small"
        type="button"
        theme="white"
        onClick={() => console.log('a')}
        value="검색"
      />
    </DurationFilterContainer>
  );
};

const DurationFilterContainer = guguStyled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: ${normalRadius};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 10px;
  margin-right: 40px;
`;

const FilterContainer = guguStyled.div`
  display: flex;
  flex-direction: column;
`;

const DateInputContainer = guguStyled.div`
  display: flex;
  align-items: center;
`;

const DurationButtons = guguStyled.div`
  display: flex;
  margin-top: 20px;
`;

const DuartionButton = guguStyled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 80px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid ${primary1};
  cursor: pointer;
`;

export default DurationFilter;
