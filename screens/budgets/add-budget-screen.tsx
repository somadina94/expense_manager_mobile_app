import { View } from 'react-native';
import { NavigationHeader, AddBudget } from 'components';

export default function AddBudgetScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Add Budget" />
      <AddBudget />
    </View>
  );
}
