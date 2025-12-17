import { View } from 'react-native';
import { NavigationHeader, SearchBudgetForm } from 'components';

export default function SearchBudgetsScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Search Budgets" />
      <SearchBudgetForm />
    </View>
  );
}
