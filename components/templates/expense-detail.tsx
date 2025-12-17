import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Expense } from 'types';
import { formatAmount, formatDate } from 'utils/helpers';
import { useAppSelector, RootState, AuthState } from 'store';
import { expenseService } from 'services';

export default function ExpenseDetail() {
  const { params } = useRoute();
  const { expense } = params as { expense: Expense };
  const { user, access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const navigation = useNavigation();

  const deleteHandler = async () => {
    await expenseService.deleteExpense(expense._id as string, access_token as string);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteHandler();
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <View className="gap-6 p-4">
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Title</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{expense.title}</Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Amount</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {user?.currency} {formatAmount(expense.amount)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Date</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {formatDate(expense.date)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Description</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{expense.description}</Text>
        </View>
        <View className="elevation-sm h-[80px} w-full flex-row items-center justify-between rounded-lg bg-primary-500 p-4">
          <Pressable
            className="items-center active:opacity-50"
            onPress={() => (navigation as any).navigate('UpdateExpense', { expense: expense })}>
            <Ionicons name="create-outline" size={24} color="white" />
            <Text className="text-lg text-neutral">Update</Text>
          </Pressable>
          <Pressable className="items-center active:opacity-50" onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={24} color="white" />
            <Text className="text-lg text-neutral">Delete</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
