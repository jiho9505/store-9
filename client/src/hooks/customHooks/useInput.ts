import React, { useState, useCallback } from 'react';
import sanitizeHtml from 'sanitize-html';
/** @function useInput
 * @param {object} initialState form의 초기 데이터 { email: '', password: '' ... }
 * @returns {ojbect} { form, onChangeHandler, resetFunction}
 */

const useInput = <TFields extends {}>(initialState: TFields) => {
  const [form, setForm] = useState(initialState);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: sanitizeHtml(value),
    }));
  }, []);

  const reset = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return { form, onChange, reset };
};

export default useInput;
