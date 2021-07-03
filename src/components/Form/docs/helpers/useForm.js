import { useCallback, useState } from 'react';

export const useForm = (callback, initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = useCallback(
    event => {
      event && event.preventDefault();
      callback(event);
    },
    [callback],
  );

  const handleChange = useCallback((event, value) => {
    setValues(values => ({ ...values, [event.target.name]: value === undefined ? event.target.value : value }));
  }, []);

  const handleClear = useCallback((event, value) => {
    setValues(values => ({ ...values, [event.target.name]: '' }));
  }, []);

  return {
    handleChange,
    handleClear,
    handleSubmit,
    setValues,
    values,
  };
};
