import React from 'react';

interface UseFormProps {
  type?: string;
  required?: boolean;
  codeUserFormat?: boolean;
}

const useForm = (props: UseFormProps = { type: '', required: true, codeUserFormat: false }) => {
  const required = props?.required ?? true;
  const isCodeUser = props?.codeUserFormat ?? false;

  const [value, setValue] = React.useState<unknown>(null);
  const [error, setError] = React.useState<unknown>(null);

  function validate(value: any) {
    if ((value === null || value === undefined) && required === true) {
      setError('Preencha um valor.');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }: any) {
    if (error) validate(target);
    const newValue = isCodeUser && target?.value ? target.value.replace(/#/g, '').toUpperCase().trim() : target.value;
    setValue(newValue);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
    setError,
  };
};

export default useForm;
