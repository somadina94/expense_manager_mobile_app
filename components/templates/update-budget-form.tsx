import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { budgetService } from 'services';
import useInput from 'hooks/userInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from 'components/atoms/input';
import IconButton from 'components/atoms/icon-button';
import Select from 'components/atoms/select';
import { Budget } from 'types';
import { useAppSelector, RootState, AuthState } from 'store';
import { getMonthOptions } from 'utils/helpers';

export default function UpdateBudget() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const { params } = useRoute();
  const { budget } = params as { budget: Budget };
  const {
    value: amountInput,
    hasError: amountInputHasError,
    enteredValueIsValid: amountInputIsValid,
    valueInputChangedHandler: amountInputChangedHandler,
    valueInputBlurHandler: amountInputBlurHandler,
    // reset: amountInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: monthInput,
    hasError: monthInputHasError,
    enteredValueIsValid: monthInputIsValid,
    valueInputChangedHandler: monthInputChangedHandler,
    valueInputBlurHandler: monthInputBlurHandler,
    // reset: monthInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: yearInput,
    hasError: yearInputHasError,
    enteredValueIsValid: yearInputIsValid,
    valueInputChangedHandler: yearInputChangedHandler,
    valueInputBlurHandler: yearInputBlurHandler,
    // reset: yearInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  useEffect(() => {
    amountInputChangedHandler(`${budget.amount}`);
    yearInputChangedHandler(`${budget.month}`);
    monthInputChangedHandler(`${budget.year}`);
  }, [
    amountInputChangedHandler,
    monthInputChangedHandler,
    yearInputChangedHandler,
    access_token,
    budget,
  ]);

  let formIsValid = false;
  if (yearInputIsValid && amountInputIsValid && monthInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setLoading(true);

    const data: Budget = {
      amount: amountInput ? +amountInput : 0,
      month: monthInput ? +monthInput : 0,
      year: yearInput ? +yearInput : 0,
    };

    const res = await budgetService.updateBudget(
      budget._id as string,
      data,
      access_token as string
    );

    if (res.status === 200) {
      Alert.alert('Success', res.message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
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
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <ScrollView>
        <View className="flex-1 gap-4 p-4">
          <Input
            label="Amount"
            placeholder="2000000"
            value={amountInput}
            onChangeText={amountInputChangedHandler}
            onBlur={amountInputBlurHandler}
            error={amountInputHasError ? 'Amount is required' : ''}
            keyboardType="number-pad"
          />
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
