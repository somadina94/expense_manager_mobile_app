import { View } from 'react-native';
import { Dashboard } from 'components';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-secondary">
      <Dashboard />
    </View>
  );
}
