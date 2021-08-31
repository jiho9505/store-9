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

const isoDateRe = /\d{4,6}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z/;

export const formatToDateFromResponse = (data: Object) => {
  const obj = JSON.parse(JSON.stringify(data));

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object') {
      obj[key] = formatToDateFromResponse(value);
    }

    if (typeof value === 'string' && isoDateRe.test(value)) {
      obj[key] = new Date(value);
    }
  });

  return obj;
};
