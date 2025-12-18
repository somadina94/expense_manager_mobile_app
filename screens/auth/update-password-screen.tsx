import { View } from 'react-native';
import { NavigationHeader, UpdatePassword } from 'components';

export default function UpdatePasswordScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Update Password" />
      <UpdatePassword />
    </View>
  );
}
