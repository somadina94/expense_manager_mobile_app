import { useState, useEffect } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { notificationService } from 'services';
import NotificationItem from 'components/molecules/notification-item';
import NoResult from 'components/atoms/no-result';
import { useAppSelector, RootState, AuthState } from 'store';
import { Notification } from 'types';
import { useIsFocused } from '@react-navigation/native';
import Loading from 'components/molecules/loading';

export default function AllNotifications() {
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchNotes = async () => {
      setIsloading(true);
      const response = await notificationService.getNotifications(access_token as string);
      if (response.status === 200) {
        setNotifications(response.data.data.notifications);
      } else {
        Alert.alert(response.message);
      }
      setIsloading(false);
    };
    fetchNotes();
  }, [access_token, isFocused]);

  const sortedNotifications = notifications.sort(
    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  if (notifications.length === 0) {
    return <NoResult />;
  }

  return (
    <ScrollView>
      <View className="gap-4 p-4">
        {sortedNotifications.map((notification: Notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))}
      </View>
    </ScrollView>
  );
}
