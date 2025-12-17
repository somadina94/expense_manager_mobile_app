import { View, ScrollView } from 'react-native';
import TabMenuItem from 'components/molecules/tab-menu-item';

export default function Budgets() {
  return (
    <ScrollView>
      <View className="gap-4 p-6">
        <TabMenuItem title="All Budgets" destination="AllBudgets" icon="wallet-outline" />
        <TabMenuItem title="Add Budget" destination="AddBudget" icon="add" />
        <TabMenuItem title="Search Budgets" destination="SearchBudget" icon="search-outline" />
      </View>
    </ScrollView>
  );
}
