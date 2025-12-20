import { View } from 'react-native';
import { AllNotifications, NavigationHeader } from 'components';

export default function NotificationScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Notifications" />
      <AllNotifications />
    </View>
  );
}
