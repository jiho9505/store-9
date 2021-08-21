const appendZero = (number: number): string => {
  return String(number).padStart(2, '0');
};

type DateType = string | Date;

export const getDateFormat = (date?: DateType, shape = 'dash'): string => {
  const targetDate = date ? new Date(date) : new Date();

  const year = targetDate.getFullYear();
  const month = appendZero(targetDate.getMonth() + 1);
  const day = appendZero(targetDate.getDate());

  if (shape === 'dash') return `${year}-${month}-${day}`;
  if (shape === 'dot') return `${year}.${month}.${day}`;
};
