import { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/atoms/input';
import Button from 'components/atoms/button';
import useInput from 'hooks/userInput';
import { authService } from 'services';

export default function ForgotPasswordForm() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    value: enteredEmail,
    hasError: emailHasError,
    enteredValueIsValid: enteredEmailIsValid,
    valueInputChangedHandler: emailChangedHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value: string) => value.includes('@'));

  let formIsValid = false;
  if (enteredEmailIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      const response = await authService.forgotPassword({ email: enteredEmail as string });
      if (response.status === 200) {
        navigation.navigate('ResetPassword' as never);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsLoading(false);
      resetEmail();
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="mt-6 flex-1 px-5">
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
          <Button
            title="Proceed"
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
