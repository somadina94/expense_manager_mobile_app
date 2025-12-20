import { View } from 'react-native';
import { NotificationDetail, NavigationHeader } from 'components';

export default function NotificationDetailScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Notification" />
      <NotificationDetail />
    </View>
  );
}
