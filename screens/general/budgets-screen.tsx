import { View } from 'react-native';
import { TabHeader, Budgets } from 'components';

export default function BudgetsScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <TabHeader title="Budgets" />
      <Budgets />
    </View>
  );
}
