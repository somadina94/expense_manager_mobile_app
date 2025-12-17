import { View } from 'react-native';
import { SearchExpenseForm, NavigationHeader } from 'components';

export default function SearchExpenseScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Search Expense" />
      <SearchExpenseForm />
    </View>
  );
}
