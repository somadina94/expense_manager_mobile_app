import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Budget } from 'types';
import { formatAmount, getMonthName } from 'utils/helpers';
import { useAppSelector, RootState, AuthState } from 'store';
import { budgetService } from 'services';

export default function BudgetDetail() {
  const { params } = useRoute();
  const { budget } = params as { budget: Budget };
  const { user, access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const navigation = useNavigation();

  const deleteHandler = async () => {
    await budgetService.deleteBudget(budget._id as string, access_token as string);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this budget?',
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
          <Text className="text-lg font-semibold text-gray-600">Amount</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {user?.currency} {formatAmount(budget.amount)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Month</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {getMonthName(budget.month)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Year</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{budget.year}</Text>
        </View>
        <View className="elevation-sm h-[80px} w-full flex-row items-center justify-between rounded-lg bg-primary-500 p-4">
          <Pressable
            className="items-center active:opacity-50"
            onPress={() => (navigation as any).navigate('UpdateBudget', { budget: budget })}>
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
