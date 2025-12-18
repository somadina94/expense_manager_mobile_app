import { View } from 'react-native';
import { NavigationHeader, UpdateMe } from 'components';

export default function UpdateMeScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Update Profile" />
      <UpdateMe />
    </View>
  );
}
