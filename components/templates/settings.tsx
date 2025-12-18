import { useState, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import { useAppSelector, RootState, AuthState, useAppDispatch, logout, setUser } from 'store';
import IconButton from 'components/atoms/icon-button';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { authService } from 'services';
import { User } from 'types';
import Loading from 'components/molecules/loading';

export default function Settings() {
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [user, setUserState] = useState<User | null>(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true);
      const res = await authService.getMe(access_token as string);
      if (res.status === 200) {
        setUserState(res.data.data.user);
        dispatch(setUser(res.data.data.user));
      } else {
        Alert.alert('Error fetching profile', res.message);
      }
      setIsLoading(false);
    };
    fetchMe();
  }, [access_token, dispatch, isFocused]);

  const deleteHandler = async () => {
    setIsLoading(true);
    await authService.deleteMe(access_token as string);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Deleting your account will delete all information of you from our database and there is no restore option, are you sure you want to continue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteHandler();
            setIsLoading(false);
            dispatch(logout());
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="p-4">
      <View className="gap-8 rounded-lg bg-background-light-secondary p-4 shadow-sm dark:bg-background-dark-secondary">
        <View className="flex-row items-center justify-between border-b border-gray-500 py-2">
          <Text className="text-gray-500">Name</Text>
          <Text className="text-gray-500">{user?.name}</Text>
        </View>
        <View className="flex-row items-center justify-between border-b border-gray-500 py-2">
          <Text className="text-gray-500">Email</Text>
          <Text className="text-gray-500">{user?.email}</Text>
        </View>
        <View className="flex-row items-center justify-between border-b border-gray-500 py-2">
          <Text className="text-gray-500">Country</Text>
          <Text className="text-gray-500">{user?.country}</Text>
        </View>
        <View className="flex-row items-center justify-between border-b border-gray-500 py-2">
          <Text className="text-gray-500">Currency</Text>
          <Text className="text-gray-500">{user?.currency}</Text>
        </View>
      </View>
      <View className="mt-12 gap-12">
        <IconButton
          title="Update account"
          iconName="create-outline"
          onPress={() => (navigation as any).navigate('UpdateMe')}
        />
        <IconButton
          title="Update password"
          iconName="create-outline"
          onPress={() => (navigation as any).navigate('UpdatePassword')}
        />
        <IconButton
          title="Delete account"
          variant="danger"
          iconName="trash-outline"
          onPress={confirmDelete}
          loading={isLoading}
        />
      </View>
    </View>
  );
}
