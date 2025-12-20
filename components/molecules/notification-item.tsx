import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatRelativeDateTime } from 'utils/helpers';
import { Notification } from 'types';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        (navigation as any).navigate('NotificationDetail', {
          notification: notification as Notification,
        })
      }
      className="rounded-lg bg-background-light-secondary shadow-sm active:opacity-50 dark:bg-background-dark-secondary"
      style={!notification.read ? { backgroundColor: '#8FCAFF' } : undefined}>
      <View className="flex-row justify-between p-4">
        <View>
          <Text className="text-lg text-gray-900 dark:text-neutral">{notification.title}</Text>
          <Text className="text-sm text-gray-900 dark:text-neutral">{notification.body}</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-900 dark:text-neutral">
            {formatRelativeDateTime(new Date(notification.createdAt as Date))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
