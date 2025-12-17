import { useState } from 'react';
import { Alert, ScrollView, View, Text } from 'react-native';
import { useAppSelector, RootState, AuthState } from 'store';
import { expenseService } from 'services';
import useDateInput from 'hooks/use-date-input';

import DateInput from 'components/atoms/date-input';
import IconButton from 'components/atoms/icon-button';
import ExpenseItem from 'components/molecules/expense-item';
import { Expense } from 'types';

export default function SearchExpenseForm() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const {
    value: startDateInput,
    hasError: startDateInputHasError,
    enteredValueIsValid: startDateInputIsValid,
    valueInputChangedHandler: startDateInputChangedHandler,
    valueInputBlurHandler: startDateInputBlurHandler,
    // reset: startDateInputReset,
  } = useDateInput((date) => !!date);

  const {
    value: endDateInput,
    hasError: endDateInputHasError,
    enteredValueIsValid: endDateInputIsValid,
    valueInputChangedHandler: endDateInputChangedHandler,
    valueInputBlurHandler: endDateInputBlurHandler,
    // reset: endDateInputReset,
  } = useDateInput((date) => !!date);

  let formIsValid = false;
  if (startDateInputIsValid && endDateInputIsValid) {
    formIsValid = true;
  }

  async function searchHandler() {
    setIsLoading(true);

    const res = await expenseService.getExpenses(
      access_token as string,
      startDateInput,
      endDateInput
    );

    if (res.status === 200) {
      setExpenses(res.data.data.expenses);
    } else {
      Alert.alert('Error', res.message);
    }
    setIsLoading(false);
  }

  const sortedExpenses = expenses.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View className="p-4">
      <View className="gap-2 rounded-lg bg-background-light-secondary p-2 shadow-sm dark:bg-background-dark-secondary">
        <DateInput
          label="Start date"
          placeholder="Start Date"
          value={startDateInput}
          onChangeText={startDateInputChangedHandler}
          onBlur={startDateInputBlurHandler}
          error={startDateInputHasError ? 'Start date is required' : ''}
        />
        <DateInput
          label="End date"
          placeholder="End Date"
          value={endDateInput}
          onChangeText={endDateInputChangedHandler}
          onBlur={endDateInputBlurHandler}
          error={endDateInputHasError ? 'End date is required' : ''}
        />
        <IconButton
          title="SEARCH"
          iconName="search-outline"
          onPress={searchHandler}
          loading={isLoading}
          disabled={!formIsValid}
        />
      </View>
      <ScrollView className="mt-4 h-[360px] rounded-lg bg-background-light-secondary p-2 shadow-sm dark:bg-background-dark-secondary">
        <View className="gap-2">
          {sortedExpenses.length === 0 && (
            <View className="items-center justify-center  p-4">
              <Text>No results</Text>
            </View>
          )}
          {sortedExpenses.length > 0 &&
            sortedExpenses.map((expense: Expense) => (
              <ExpenseItem key={expense._id} item={expense} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
