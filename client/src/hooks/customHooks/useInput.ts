import React, { useState, useCallback, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
/** @function useInput
 * @param {object} inputInfo form의 초기 데이터 { email: '', password: '' ... }
 * @returns {ojbect} { form, onChangeHandler, resetFunction}
 */

type inputInfoType = {
  initialState: { [key: string]: string };
  validationSchema?: object;
};

const useInput = <TFields extends inputInfoType>(inputInfo: TFields) => {
  const { initialState, validationSchema } = inputInfo;

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState({});

  useEffect(() => {
    if (validationSchema) {
      setError(
        Object.keys(validationSchema).reduce((result, name) => {
          return { ...result, [name]: '' };
        }, {})
      );
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: sanitizeHtml(value),
    }));

    setError((prev) => ({
      ...prev,
      [name]: validationSchema[name].isValid(value),
    }));
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setError((prev) => ({
      ...prev,
      [target.name]: validationSchema[target.name].isValid(form[target.name]),
    }));
  };

  const onSetForm = useCallback((obj) => {
    setForm(obj);
  }, []);

  const reset = useCallback(() => {
    setForm(initialState);
  }, [initialState]);

  return { form, onChange, onBlur, error, reset, onSetForm };
};

export default useInput;
