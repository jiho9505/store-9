import React, { MouseEvent, ChangeEvent, useState, memo } from 'react';
import guguStyled from '@/core/styled';

import styled from '@emotion/styled';

import Input from '../Input';
import Button from '../Button';

import { primary1, normalRadius, baeminFont } from '@/static/style/common';
import { getDateFormat } from '@/utils/dateParse';

const durationFilter = [
  { type: 'day', value: 0, content: '오늘' },
  { type: 'day', value: 7, content: '7일' },
  { type: 'day', value: 15, content: '15일' },
  { type: 'month', value: 1, content: '1개월' },
  { type: 'month', value: 3, content: '3개월' },
  { type: 'year', value: 1, content: '1년' },
];

type Form = { [key: string]: string };

type DurationFilterProps = {
  form: Form;
  onSubmit?(): void;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onSetForm(obj: Form): void;
};

const DurationFilter = ({ form, onSubmit, onChange, onSetForm }: DurationFilterProps) => {
  const [curActiveFilter, setActiveFilter] = useState<string>('');

  const handleClickButton = (type, value, content) => (e: MouseEvent<HTMLDivElement>) => {
    const curDate = new Date();
    let pastDate = null;
    if (type === 'day') {
      pastDate = new Date().setDate(new Date().getDate() - value);
    } else if (type === 'month') {
      pastDate = new Date().setMonth(new Date().getMonth() - value);
    } else if (type === 'year') {
      pastDate = new Date().setFullYear(new Date().getFullYear() - value);
    }
    setActiveFilter(content);
    onSetForm({ start: getDateFormat(pastDate), finish: getDateFormat(curDate) });
  };

  const handleChangeDateFilter = (e) => {
    onChange(e);
    setActiveFilter('');
  };

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
            onChange={handleChangeDateFilter}
          />
          <span>-</span>
          <Input
            name="finish"
            size="small"
            type="date"
            variant="outlined"
            required
            value={form.finish}
            onChange={handleChangeDateFilter}
          />
        </DateInputContainer>
        <DurationButtons>
          {durationFilter.map(({ type, value, content }) => (
            <DuartionButton
              key={content}
              isActive={curActiveFilter === content}
              onClick={handleClickButton(type, value, content)}
            >
              {content}
            </DuartionButton>
          ))}
        </DurationButtons>
      </FilterContainer>
      <Button size="small" type="button" theme="white" onClick={onSubmit} value="검색" />
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
  margin: 0 auto 30px auto;
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

type test = {
  isActive: boolean;
};

const DuartionButton = guguStyled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 80px;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
  font-family: ${baeminFont};
  border: ${({ isActive }) => (isActive ? `1px solid ${primary1}` : 'none')};
`;

export default memo(DurationFilter);
