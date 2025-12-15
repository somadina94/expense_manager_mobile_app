import { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import OTPInput from 'components/atoms/otp-input';
import useInput from 'hooks/userInput';
import { authService } from 'services';
import { useAppDispatch, login, setUser } from 'store';

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    value: enteredAccessToken,
    enteredValueIsValid: enteredAccessTokenIsValid,
    valueInputChangedHandler: accessTokenChangedHandler,
    valueInputBlurHandler: accessTokenBlurHandler,
    reset: resetAccessToken,
  } = useInput((value: string) => value.trim().length >= 1);

  const {
    value: enteredNewPassword,
    hasError: newPasswordHasError,
    enteredValueIsValid: enteredNewPasswordIsValid,
    valueInputChangedHandler: newPasswordChangedHandler,
    valueInputBlurHandler: newPasswordBlurHandler,
    reset: resetNewPassword,
  } = useInput((value: string) => value.trim().length >= 4);
  const {
    value: enteredConfirmNewPassword,
    hasError: confirmNewPasswordHasError,
    enteredValueIsValid: enteredConfirmNewPasswordIsValid,
    valueInputChangedHandler: confirmNewPasswordChangedHandler,
    valueInputBlurHandler: confirmNewPasswordBlurHandler,
    reset: resetConfirmNewPassword,
  } = useInput((value: string) => value.trim().length >= 4);

  let formIsValid = false;
  if (enteredAccessTokenIsValid && enteredNewPasswordIsValid && enteredConfirmNewPasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const data = {
        token: enteredAccessToken as string,
        password: enteredNewPassword as string,
        passwordConfirm: enteredConfirmNewPassword as string,
      };
      const response = await authService.resetPassword(data);
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
      resetAccessToken();
      resetNewPassword();
      resetConfirmNewPassword();
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" className="mt-6 flex-1 px-5">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-4">
          <OTPInput
            label="Enter the 6-digit code sent to your email"
            value={enteredAccessToken as string}
            length={6}
            onChangeText={(value) => accessTokenChangedHandler(value as string)}
            onBlur={accessTokenBlurHandler}
          />
          <Input
            label="New password"
            placeholder="Enter your new password"
            value={enteredNewPassword}
            onChangeText={newPasswordChangedHandler}
            onBlur={newPasswordBlurHandler}
            error={newPasswordHasError ? 'New password is required' : ''}
            isPassword={true}
          />
          <Input
            label="Confirm new password"
            placeholder="Enter your confirm new password"
            value={enteredConfirmNewPassword}
            onChangeText={confirmNewPasswordChangedHandler}
            onBlur={confirmNewPasswordBlurHandler}
            error={confirmNewPasswordHasError ? 'Confirm new password is required' : ''}
            isPassword={true}
          />
          <Button
            title="Reset password"
            onPress={submitHandler}
            loading={isLoading}
            variant="primary"
            size="lg"
            disabled={!formIsValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
