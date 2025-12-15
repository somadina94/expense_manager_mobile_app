import { useState } from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import { authService } from 'services';
import useInput from 'hooks/userInput';
import { useAppDispatch, login, setUser } from 'store';

export default function LoginForm() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    value: enteredEmail,
    hasError: emailHasError,
    enteredValueIsValid: enteredEmailIsValid,
    valueInputChangedHandler: emailChangedHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value: string) => value.includes('@'));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    enteredValueIsValid: enteredPasswordIsValid,
    valueInputChangedHandler: passwordChangedHandler,
    valueInputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value: string) => value.trim().length >= 4);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const data = {
        email: enteredEmail!,
        password: enteredPassword!,
      };
      const response = await authService.login(data);
      if (response.status === 200) {
        dispatch(login(response.data.token));
        dispatch(setUser(response.data.user));
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
      resetEmail();
      resetPassword();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="mt-12 flex-1 px-5"
      keyboardVerticalOffset={100}>
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            value={enteredEmail}
            onChangeText={emailChangedHandler}
            onBlur={emailBlurHandler}
            error={emailHasError ? 'Email is required' : ''}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            value={enteredPassword}
            onChangeText={passwordChangedHandler}
            onBlur={passwordBlurHandler}
            isPassword={true}
            error={passwordHasError ? 'Password is required' : ''}
          />
          <Text
            className="text-body-sm text-primary-500  my-2"
            onPress={() => navigation.navigate('ForgotPassword' as never)}>
            Forgot password?
          </Text>
          <Button
            title="Login"
            onPress={submitHandler}
            loading={isLoading}
            variant="primary"
            size="lg"
            disabled={!formIsValid}
          />
        </View>
        <View className="mb-24 mt-6 items-center justify-end">
          <Text className="text-body-sm text-text-light dark:text-text-dark text-center">
            Don&apos;t have an account?{' '}
            <Text
              className="text-primary-500 text-center"
              onPress={() => navigation.navigate('Signup' as never)}>
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
