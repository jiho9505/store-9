import React, { useState, useCallback } from 'react';

const useInput = <TFields extends {}>(initialState: TFields) => {
  const [form, setForm] = useState(initialState);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return { form, onChange, reset };
};

export default useInput;
