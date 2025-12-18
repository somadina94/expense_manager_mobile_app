import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { authService } from 'services';
import useInput from 'hooks/userInput';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/atoms/input';
import IconButton from 'components/atoms/icon-button';
import Select from 'components/atoms/select';
import { User } from 'types';
import { useAppSelector, RootState, AuthState } from 'store';
import { fetchCountries } from 'utils/fetch-countries-currencies';

export default function UpdateMe() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { access_token, user } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [currencies, setCurrencies] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      const res = await fetchCountries();
      if (res) {
        setCountries(
          res.map((el: any) => {
            return { label: el.name, value: el.name };
          })
        );
        setCurrencies(
          res.map((el: any) => {
            return { label: el.currencyCode, value: el.currencyCode };
          })
        );
      }
    };
    fetchCountriesData();
  }, [setCountries, setCurrencies]);

  const {
    value: firstNameInput,
    hasError: firstNameInputHasError,
    enteredValueIsValid: firstNameInputIsValid,
    valueInputChangedHandler: firstNameInputChangedHandler,
    valueInputBlurHandler: firstNameInputBlurHandler,
    // reset: firstNameInputReset,
  } = useInput((value: string) => value.trim().length > 0);
  const {
    value: lastNameInput,
    hasError: lastNameInputHasError,
    enteredValueIsValid: lastNameInputIsValid,
    valueInputChangedHandler: lastNameInputChangedHandler,
    valueInputBlurHandler: lastNameInputBlurHandler,
    // reset: lastNameInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: emailInput,
    hasError: emailInputHasError,
    enteredValueIsValid: emailInputIsValid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    // reset: emailInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: countryInput,
    hasError: countryInputHasError,
    enteredValueIsValid: countryInputIsValid,
    valueInputChangedHandler: countryInputChangedHandler,
    valueInputBlurHandler: countryInputBlurHandler,
    // reset: countryInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: currencyInput,
    hasError: currencyInputHasError,
    enteredValueIsValid: currencyInputIsValid,
    valueInputChangedHandler: currencyInputChangedHandler,
    valueInputBlurHandler: currencyInputBlurHandler,
    // reset: currencyInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  useEffect(() => {
    firstNameInputChangedHandler(`${user?.name.split(' ')[0]}`);
    lastNameInputChangedHandler(`${user?.name.split(' ')[1]}`);
    emailInputChangedHandler(`${user?.email}`);
    countryInputChangedHandler(`${user?.country}`);
    currencyInputChangedHandler(`${user?.currency}`);
  }, [
    firstNameInputChangedHandler,
    lastNameInputChangedHandler,
    emailInputChangedHandler,
    countryInputChangedHandler,
    currencyInputChangedHandler,
    user,
  ]);

  let formIsValid = false;
  if (
    firstNameInputIsValid &&
    lastNameInputIsValid &&
    emailInputIsValid &&
    countryInputIsValid &&
    currencyInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setLoading(true);

    const data: User = {
      name: `${firstNameInput} ${lastNameInput}`,
      email: emailInput as string,
      country: countryInput as string,
      currency: currencyInput as string,
    };

    const res = await authService.updateMe(access_token as string, data);

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
            label="First name"
            placeholder="John"
            value={firstNameInput}
            onChangeText={firstNameInputChangedHandler}
            onBlur={firstNameInputBlurHandler}
            error={firstNameInputHasError ? 'First name is required' : ''}
          />
          <Input
            label="Last name"
            placeholder="Doe"
            value={lastNameInput}
            onChangeText={lastNameInputChangedHandler}
            onBlur={lastNameInputBlurHandler}
            error={lastNameInputHasError ? 'last name is required' : ''}
          />
          <Input
            label="Email"
            placeholder="john@example.com"
            value={emailInput}
            onChangeText={emailInputChangedHandler}
            onBlur={emailInputBlurHandler}
            error={emailInputHasError ? 'Email address is required' : ''}
          />
          <Select
            label="Country"
            placeholder="Country"
            value={countryInput}
            onValueChange={countryInputChangedHandler}
            onBlur={countryInputBlurHandler}
            error={countryInputHasError ? 'Country is required' : ''}
            options={Array.from(new Map(countries.map((c) => [c.value, c])).values()).sort((a, b) =>
              (a.label ?? '').localeCompare(b.label ?? '')
            )}
          />
          <Select
            label="Currency"
            placeholder="USD"
            value={currencyInput}
            onValueChange={currencyInputChangedHandler}
            onBlur={currencyInputBlurHandler}
            error={currencyInputHasError ? 'Currency is required' : ''}
            options={Array.from(new Map(currencies.map((c) => [c.value, c])).values()).sort(
              (a, b) => (a.label ?? '').localeCompare(b.label ?? '')
            )}
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
