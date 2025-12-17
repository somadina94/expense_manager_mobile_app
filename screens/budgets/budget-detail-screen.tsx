import { View } from 'react-native';
import { NavigationHeader, BudgetDetail } from 'components';

export default function BudgetDetailScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Budget Detail" />
      <BudgetDetail />
    </View>
  );
}
