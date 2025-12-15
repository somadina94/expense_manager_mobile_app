import { View } from 'react-native';
import { ForgotPasswordForm, NavigationHeader } from 'components';

export default function ForgotPasswordScreen() {
  return (
    <View className="bg-background-light-primary-500 dark:bg-background-dark-primary flex-1">
      <NavigationHeader title="Forgot Password" />
      <ForgotPasswordForm />
    </View>
  );
}
