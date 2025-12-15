import { View } from 'react-native';
import { NavigationHeader, ResetPasswordForm } from 'components';

export default function ResetPasswordScreen() {
  return (
    <View className="bg-background-light-primary-500 dark:bg-background-dark-primary flex-1">
      <NavigationHeader title="Reset Password" />
      <ResetPasswordForm />
    </View>
  );
}
