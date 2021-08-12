import React, { useState, useCallback } from 'react';

const INPUT_ERROR_MESSAGE = (name) => `${name} 입력값이 잘못되었습니다. 다시 한번 확인해주세요.`;

const useInput = <TFields extends {}>(
  initialState: TFields,
  validator?: (value: string) => boolean
): [TFields, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void, string] => {
  const [inputValue, setInput] = useState(initialState);
  const [error, setError] = useState('');

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      let isValidValue = true;
      if (validator !== undefined) {
        isValidValue = validator(value);
      }

      if (isValidValue) {
        setInput((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
        if (error) {
          setError('');
        }
      } else {
        setError(INPUT_ERROR_MESSAGE(name));
      }
    },
    [validator]
  );

  const reset = useCallback(() => {
    setInput(initialState);
    setError('');
  }, [initialState]);

  return [inputValue, onChange, reset, error];
};

export default useInput;
