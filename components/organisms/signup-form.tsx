import { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'components/atoms/checkbox';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import Select from 'components/atoms/select';
import useInput from 'hooks/userInput';
import { authService } from 'services';
import { fetchCountries } from 'utils/fetch-countries-currencies';
import { useAppDispatch, login, setUser } from 'store';

export default function SignupForm() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [currencies, setCurrencies] = useState<{ label: string; value: string }[]>([]);
  const dispatch = useAppDispatch();

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
    value: enteredEmail,
    hasError: emailHasError,
    enteredValueIsValid: enteredEmailIsValid,
    valueInputChangedHandler: emailChangedHandler,
    valueInputBlurHandler: emailBlurHandler,
    // reset: resetEmail,
  } = useInput((value: string) => value.includes('@'));
  const {
    value: enteredPassword,
    hasError: passwordHasError,
    enteredValueIsValid: enteredPasswordIsValid,
    valueInputChangedHandler: passwordChangedHandler,
    valueInputBlurHandler: passwordBlurHandler,
    // reset: resetPassword,
  } = useInput((value: string) => value.trim().length >= 4);
  const {
    value: enteredFirstName,
    hasError: firstNameHasError,
    enteredValueIsValid: enteredFirstNameIsValid,
    valueInputChangedHandler: firstNameChangedHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    // reset: resetFirstName,
  } = useInput((value: string) => value.trim().length >= 1);
  const {
    value: enteredLastName,
    hasError: lastNameHasError,
    enteredValueIsValid: enteredLastNameIsValid,
    valueInputChangedHandler: lastNameChangedHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    // reset: resetLastName,
  } = useInput((value: string) => value.trim().length >= 1);

  const {
    value: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    enteredValueIsValid: enteredConfirmPasswordIsValid,
    valueInputChangedHandler: confirmPasswordChangedHandler,
    valueInputBlurHandler: confirmPasswordBlurHandler,
    // reset: resetConfirmPassword,
  } = useInput((value: string) => value.trim().length >= 1);

  const {
    value: enteredCountry,
    hasError: countryHasError,
    enteredValueIsValid: enteredCountryIsValid,
    valueInputChangedHandler: countryChangedHandler,
    valueInputBlurHandler: countryBlurHandler,
    // reset: resetcountry,
  } = useInput((value: string) => value.trim().length >= 1);

  const {
    value: enteredCurrency,
    hasError: currencyHasError,
    enteredValueIsValid: enteredCurrencyIsValid,
    valueInputChangedHandler: currencyChangedHandler,
    valueInputBlurHandler: currencyBlurHandler,
    // reset: resetcurrency,
  } = useInput((value: string) => value.trim().length >= 1);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsTouched, setTermsTouched] = useState(false);
  const termsHasError = !acceptedTerms && termsTouched;

  let formIsValid = false;
  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredCountryIsValid &&
    enteredCurrencyIsValid &&
    enteredConfirmPasswordIsValid &&
    acceptedTerms
  ) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setTermsTouched(true);
    if (!acceptedTerms) {
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        name: `${enteredFirstName} ${enteredLastName}` as string,
        email: enteredEmail as string,
        password: enteredPassword as string,
        passwordConfirm: enteredConfirmPassword as string,
        country: enteredCountry as string,
        currency: enteredCurrency as string,
      };
      const response = await authService.signup(data);
      if (response.status === 201) {
        dispatch(login(response.data.token));
        dispatch(setUser(response.data.data.user));
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const cleanCurrencies = currencies.filter((item) => typeof item.label === 'string');

  return (
    <KeyboardAvoidingView behavior="padding" className="mt-6 flex-1 px-5">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={enteredFirstName}
            onChangeText={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
            error={firstNameHasError ? 'First name is required' : ''}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={enteredLastName}
            onChangeText={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
            error={lastNameHasError ? 'Last name is required' : ''}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={enteredEmail}
            onChangeText={emailChangedHandler}
            onBlur={emailBlurHandler}
            error={emailHasError ? 'Email is required' : ''}
          />
          <Select
            label="Country"
            options={[...countries].sort((a, b) => a.label.localeCompare(b.label))}
            value={enteredCountry}
            onValueChange={countryChangedHandler}
            onBlur={countryBlurHandler}
            error={countryHasError ? 'Country is required' : ''}
          />
          <Select
            label="Currency"
            options={Array.from(
              new Map(cleanCurrencies.map((item) => [item.label, item])).values()
            ).sort((a, b) => a.label.localeCompare(b.label))}
            value={enteredCurrency}
            onValueChange={currencyChangedHandler}
            onBlur={currencyBlurHandler}
            error={currencyHasError ? 'Currency is required' : ''}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={enteredPassword}
            onChangeText={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError ? 'Password is required' : ''}
            isPassword={true}
          />
          <Input
            label="Confirm Password"
            placeholder="Enter your confirm password"
            value={enteredConfirmPassword}
            onChangeText={confirmPasswordChangedHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPasswordHasError ? 'Confirm password is required' : ''}
            isPassword={true}
          />
          <Checkbox
            checked={acceptedTerms}
            onPress={() => {
              setAcceptedTerms(!acceptedTerms);
              setTermsTouched(true);
            }}
            labelComponent={
              <Text className="text-body-sm text-text-light dark:text-text-dark">
                By signing up, you agree to our{' '}
                <Text
                  className="text-primary-500"
                  onPress={() => {
                    // Navigate to terms page
                    console.log('Navigate to Terms');
                  }}>
                  Terms and Conditions
                </Text>{' '}
                and{' '}
                <Text
                  className="text-primary-500"
                  onPress={() => {
                    // Navigate to privacy page
                    console.log('Navigate to Privacy');
                  }}>
                  Privacy Policy
                </Text>
              </Text>
            }
            error={termsHasError ? 'You must accept the terms and conditions' : ''}
          />
          <Button
            title="Signup"
            onPress={submitHandler}
            loading={isLoading}
            disabled={!formIsValid}
            variant="primary"
            size="lg"
            className="mt-4"
          />
        </View>
        <View className="mb-24 mt-6 items-center justify-end">
          <Text className="text-body-sm text-text-light dark:text-text-dark">
            Already have an account?{' '}
            <Text
              className="text-primary-500 dark:text-primary-500"
              onPress={() => navigation.navigate('Login' as never)}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
