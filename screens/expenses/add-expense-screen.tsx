import { View } from 'react-native';
import { AddExpense, NavigationHeader } from 'components';

export default function AddExpenseScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Add Expense" />
      <AddExpense />
    </View>
  );
}
