import { View } from 'react-native';
import { NavigationHeader, SignupForm } from 'components';

export default function Signup() {
  return (
    <View className="bg-background-light-primary-500 dark:bg-background-dark-primary flex-1">
      <NavigationHeader title="Sign up" />
      <SignupForm />
    </View>
  );
}
