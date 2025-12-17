import { View } from 'react-native';
import { NavigationHeader, UpdateBudget } from 'components';

export default function UpdateBudgetScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Update Budget" />
      <UpdateBudget />
    </View>
  );
}
