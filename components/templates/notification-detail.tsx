import { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Notification } from 'types';
import { formatRelativeDateTime } from 'utils/helpers';
import { useAppSelector, RootState, AuthState } from 'store';
import { notificationService } from 'services';

export default function NotificationDetail() {
  const { params } = useRoute();
  const { notification } = params as { notification: Notification };
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;

  useEffect(() => {
    const patchData = async () => {
      await notificationService.markNotificationRead(
        notification._id as string,
        access_token as string
      );
    };
    if (notification.read === false) {
      patchData();
    }
  }, [access_token, notification]);

  return (
    <ScrollView>
      <View className="gap-6 p-4">
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Title</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{notification.title}</Text>
        </View>
        <View className="elevation-sm w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Content</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{notification.body}</Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Sent at</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {formatRelativeDateTime(new Date(notification.createdAt as Date))}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
