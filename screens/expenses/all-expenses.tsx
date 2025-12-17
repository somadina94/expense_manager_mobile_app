import { View } from 'react-native';
import { AllExpenses, NavigationHeader } from 'components';

export default function AllExpensesScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="All Expenses" />
      <AllExpenses />
    </View>
  );
}
