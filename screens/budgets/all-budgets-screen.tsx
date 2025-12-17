import { View } from 'react-native';
import { AllBudgets, NavigationHeader } from 'components';

export default function AllBudgetsScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-secondary">
      <NavigationHeader title="All Budgets" />
      <AllBudgets />
    </View>
  );
}
