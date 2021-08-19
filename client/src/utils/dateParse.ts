const appendZero = (number: number): string => {
  return String(number).padStart(2, '0');
};

export const getDashFormat = (date: string | Date): string => {
  const targetDate = new Date(date);

  const year = targetDate.getFullYear();
  const month = appendZero(targetDate.getMonth() + 1);
  const day = appendZero(targetDate.getDate());

  return `${year}-${month}-${day}`;
};
