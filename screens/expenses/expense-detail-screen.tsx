import { View } from 'react-native';
import { ExpenseDetail, NavigationHeader } from 'components';

export default function ExpenseDetailScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Expense Detail" />
      <ExpenseDetail />
    </View>
  );
}
