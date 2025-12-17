import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { expenseService } from 'services';
import useInput from 'hooks/userInput';
import useDateInput from 'hooks/use-date-input';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from 'components/atoms/input';
import Textarea from 'components/atoms/textarea';
import IconButton from 'components/atoms/icon-button';
import DateInput from 'components/atoms/date-input';
import { useAppSelector, RootState, AuthState } from 'store';
import { Expense } from 'types';

export default function UpdateExpenseForm() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const { params } = useRoute();
  const { expense } = params as { expense: Expense };
  const {
    value: titleInput,
    hasError: titleInputHasError,
    enteredValueIsValid: titleInputIsValid,
    valueInputChangedHandler: titleInputChangedHandler,
    valueInputBlurHandler: titleInputBlurHandler,
    // reset: titleInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: amountInput,
    hasError: amountInputHasError,
    enteredValueIsValid: amountInputIsValid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
    // reset: amountInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: dateInput,
    hasError: dateInputHasError,
    enteredValueIsValid: dateInputIsValid,
    valueInputChangedHandler: dateInputChangedHandler,
    valueInputBlurHandler: dateInputBlurHandler,
    // reset: dateInputReset,
  } = useDateInput((date) => !!date);

  const {
    value: descriptionInput,
    hasError: descriptionInputHasError,
    enteredValueIsValid: descriptionInputIsValid,
    valueInputChangedHandler: descriptionInputChangedHandler,
    valueInputBlurHandler: descriptionInputBlurHandler,
    // reset: descriptionInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  useEffect(() => {
    titleInputChangedHandler(expense.title);
    amountInputChangedHandler(`${expense.amount}`);
    descriptionInputChangedHandler(expense.description);
    dateInputChangedHandler(new Date(expense.date));
  }, [
    expense,
    titleInputChangedHandler,
    amountInputChangedHandler,
    dateInputChangedHandler,
    descriptionInputChangedHandler,
  ]);

  let formIsValid = false;
  if (titleInputIsValid && amountInputIsValid && dateInputIsValid && descriptionInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setLoading(true);

    const data: Expense = {
      title: titleInput as string,
      amount: amountInput ? +amountInput : 0,
      description: descriptionInput as string,
      date: dateInput as Date,
    };

    const res = await expenseService.updateExpense(
      expense._id as string,
      data,
      access_token as string
    );

    if (res.status === 200) {
      Alert.alert('Success', res.message, [
        {
          text: 'OK',
          onPress: () => {
            (navigation as any).navigate('Overview');
          },
        },
      ]);
    } else {
      Alert.alert('Success', res.message, [
        {
          text: 'OK',
        },
      ]);
    }

    setLoading(false);
  };
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View className="flex-1 gap-4 p-4">
          <Input
            label="Title"
            placeholder="Expense title"
            value={titleInput}
            onChangeText={titleInputChangedHandler}
            onBlur={titleInputBlurHandler}
            error={titleInputHasError ? 'Email is required' : ''}
          />
          <DateInput
            label="Date"
            placeholder="Date"
            value={dateInput}
            onChangeText={dateInputChangedHandler}
            onBlur={dateInputBlurHandler}
            error={dateInputHasError ? 'Date is required' : ''}
          />
          <Input
            label="Amount"
            placeholder="2000000"
            value={amountInput}
            onChangeText={amountInputChangedHandler}
            onBlur={amountInputBlurHandler}
            error={amountInputHasError ? 'Amount is required' : ''}
            keyboardType="number-pad"
          />
          <Textarea
            label="Description"
            placeholder="Description"
            value={descriptionInput}
            onChangeText={descriptionInputChangedHandler}
            onBlur={descriptionInputBlurHandler}
            error={descriptionInputHasError ? 'Description is required' : ''}
          />
          <IconButton
            title="UPDATE"
            iconName="sync-outline"
            disabled={!formIsValid}
            onPress={submitHandler}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
