import { View } from 'react-native';
import IconButton from 'components/atoms/icon-button';
import { useAppDispatch } from 'store/store';
import { logout } from 'store/authSice';

export default function Settings() {
  const dispatch = useAppDispatch();
  return (
    <View className="mt-auto">
      <IconButton
        iconName="power"
        title="Logout"
        size="lg"
        iconColor="red"
        onPress={() => dispatch(logout())}
      />
    </View>
  );
}
