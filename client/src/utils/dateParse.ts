const appendZero = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

export const getDashFormat = (date: string | Date): string => {
  const targetDate = new Date(date);

  const year = targetDate.getFullYear();
  const month = appendZero(targetDate.getMonth() + 1);
  const day = appendZero(targetDate.getDate());

  return `${year}-${month}-${day}`;
};
