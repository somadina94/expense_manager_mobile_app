import { useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string | undefined>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const enteredValueIsValid = validateValue(enteredValue || '');
  const enteredValueIsInvalid = !enteredValueIsValid && isTouched;

  const valueInputChangedHandler = (text: string | undefined) => {
    setEnteredValue(text);
  };

  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: enteredValueIsInvalid,
    enteredValueIsValid,
    valueInputChangedHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
