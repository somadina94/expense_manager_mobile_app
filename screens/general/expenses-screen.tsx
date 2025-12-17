import { View } from 'react-native';
import { TabHeader, Expenses } from 'components';

export default function ExpensesScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <TabHeader title="Expenses" />
      <Expenses />
    </View>
  );
}
