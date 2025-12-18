import { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { authService } from 'services';
import useInput from 'hooks/userInput';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/atoms/input';
import IconButton from 'components/atoms/icon-button';
import { useAppSelector, RootState, AuthState } from 'store';

export default function UpdatePassword() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;

  const {
    value: currentPasswordInput,
    hasError: currentPasswordInputHasError,
    enteredValueIsValid: currentPasswordInputIsValid,
    valueInputChangedHandler: currentPasswordInputChangedHandler,
    valueInputBlurHandler: currentPasswordInputBlurHandler,
    // reset: currentPasswordInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: newPasswordInput,
    hasError: newPasswordInputHasError,
    enteredValueIsValid: newPasswordInputIsValid,
    valueInputChangedHandler: newPasswordInputChangedHandler,
    valueInputBlurHandler: newPasswordInputBlurHandler,
    // reset: newPasswordInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: confirmPasswordInput,
    hasError: confirmPasswordInputHasError,
    enteredValueIsValid: confirmPasswordInputIsValid,
    valueInputChangedHandler: confirmPasswordInputChangedHandler,
    valueInputBlurHandler: confirmPasswordInputBlurHandler,
    // reset: confirmPasswordInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  let formIsValid = false;
  if (currentPasswordInputIsValid && newPasswordInputIsValid && confirmPasswordInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setLoading(true);

    const data = {
      passwordCurrent: currentPasswordInput as string,
      password: newPasswordInput as string,
      passwordConfirm: confirmPasswordInput as string,
    };

    const res = await authService.updatePassword(access_token as string, data);

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
            label="Current password"
            placeholder="****************"
            value={currentPasswordInput}
            onChangeText={currentPasswordInputChangedHandler}
            onBlur={currentPasswordInputBlurHandler}
            error={currentPasswordInputHasError ? 'Field is required' : ''}
            isPassword={true}
          />
          <Input
            label="New password"
            placeholder="****************"
            value={newPasswordInput}
            onChangeText={newPasswordInputChangedHandler}
            onBlur={newPasswordInputBlurHandler}
            error={newPasswordInputHasError ? 'Field is required' : ''}
            isPassword={true}
          />
          <Input
            label="Confirm new password"
            placeholder="****************"
            value={confirmPasswordInput}
            onChangeText={confirmPasswordInputChangedHandler}
            onBlur={confirmPasswordInputBlurHandler}
            error={confirmPasswordInputHasError ? 'Field is required' : ''}
            isPassword={true}
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
