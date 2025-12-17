import { useCallback, useState } from 'react';

const useDateInput = (validateValue: (value: Date | undefined) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<Date | undefined>(undefined);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const enteredValueIsInvalid = !enteredValueIsValid && isTouched;

  const valueInputChangedHandler = useCallback((date: Date | undefined) => {
    setEnteredValue(date);
  }, []);

  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue(undefined);
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

export default useDateInput;
