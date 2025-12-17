import { View } from 'react-native';
import { UpdateExpenseForm, NavigationHeader } from 'components';

export default function UpdateExpenseScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <NavigationHeader title="Update Expense" />
      <UpdateExpenseForm />
    </View>
  );
}
