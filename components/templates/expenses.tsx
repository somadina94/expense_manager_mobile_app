import { View, ScrollView } from 'react-native';
import TabMenuItem from 'components/molecules/tab-menu-item';

export default function Expenses() {
  return (
    <ScrollView>
      <View className="gap-4 p-6">
        <TabMenuItem icon="cash-outline" destination="AllExpenses" title="All Expenses" />
        <TabMenuItem icon="add" destination="AddExpense" title="Add Expense" />
        <TabMenuItem icon="search-outline" destination="SearchExpense" title="Search Expenses" />
      </View>
    </ScrollView>
  );
}
