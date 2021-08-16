import { useState, useCallback, useEffect } from 'react';

type validateReturn = {
  isValid: boolean;
  check(): void;
};

const useValidate = (formValue: string): validateReturn => {
  const [isValid, setValid] = useState(true);

  const check = useCallback(() => {
    setValid(formValue.length !== 0);
  }, [formValue]);

  return { isValid, check };
};

export default useValidate;
