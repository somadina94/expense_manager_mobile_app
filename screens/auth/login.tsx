import { View } from 'react-native';
import { LoginForm, NavigationHeader } from 'components';

export default function Login() {
  return (
    <View className="bg-background-light-primary-500 dark:bg-background-dark-primary flex-1">
      <NavigationHeader title="Login" />
      <LoginForm />
    </View>
  );
}
