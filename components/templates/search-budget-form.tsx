import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useAppSelector, RootState, AuthState } from 'store';
import { budgetService } from 'services';
import useInput from 'hooks/userInput';
import IconButton from 'components/atoms/icon-button';
import BudgetItem from 'components/molecules/budget-item';
import { Budget } from 'types';
import Select from 'components/atoms/select';
import { getMonthOptions } from 'utils/helpers';
import NoResult from 'components/atoms/no-result';

export default function SearchBudgetForm() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const {
    value: monthInput,
    hasError: monthInputHasError,
    enteredValueIsValid: monthInputIsValid,
    valueInputChangedHandler: monthInputChangedHandler,
    valueInputBlurHandler: monthInputBlurHandler,
    // reset: monthInputReset,
  } = useInput((value) => value.trim() !== '');
  const {
    value: yearInput,
    hasError: yearInputHasError,
    enteredValueIsValid: yearInputIsValid,
    valueInputChangedHandler: yearInputChangedHandler,
    valueInputBlurHandler: yearInputBlurHandler,
    // reset: yearInputReset,
  } = useInput((value) => value.trim() !== '');

  let formIsValid = false;
  if (monthInputIsValid && yearInputIsValid) {
    formIsValid = true;
  }

  async function searchHandler() {
    setIsLoading(true);

    const month = monthInput ? +monthInput : 0;
    const year = yearInput ? +yearInput : 0;

    const res = await budgetService.getBudgets(access_token as string, month, year);

    if (res.status === 200) {
      setBudgets(res.data.data.budgets);
    } else {
      Alert.alert('Error', res.message);
    }
    setIsLoading(false);
  }
  const sortedbudgets = budgets
    .sort((a: any, b: any) => b.year - a.year)
    .sort((a: any, b: any) => b.month - a.month);

  return (
    <View className="p-4">
      <View className="gap-2 rounded-lg bg-background-light-secondary p-2 shadow-sm dark:bg-background-dark-secondary">
        <Select
          label="Month"
          placeholder="Month"
          value={monthInput}
          onValueChange={monthInputChangedHandler}
          onBlur={monthInputBlurHandler}
          error={monthInputHasError ? 'Amount is required' : ''}
          options={getMonthOptions()}
        />
        <Select
          label="Year"
          placeholder="Year"
          value={yearInput}
          onValueChange={yearInputChangedHandler}
          onBlur={yearInputBlurHandler}
          error={yearInputHasError ? 'Amount is required' : ''}
          options={[
            {
              label: new Date().getFullYear().toString(),
              value: new Date().getFullYear().toString(),
            },
          ]}
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
          {sortedbudgets.length === 0 && <NoResult />}
          {sortedbudgets.length > 0 &&
            sortedbudgets.map((budget: Budget) => <BudgetItem key={budget._id} budget={budget} />)}
        </View>
      </ScrollView>
    </View>
  );
}
