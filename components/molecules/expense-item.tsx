import { View, Text, Pressable } from 'react-native';
import { Expense } from 'types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, RootState, AuthState } from 'store';
import { formatAmount, formatDate } from 'utils/helpers';

interface ExpenseItemProps {
  item: Expense;
}

export default function ExpenseItem({ item }: ExpenseItemProps) {
  const { user } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => (navigation as any).navigate('ExpenseDetail', { expense: item as Expense })}
      className="rounded-lg bg-background-light-secondary shadow-sm active:opacity-50 dark:bg-background-dark-secondary">
      <View className="flex-row p-4">
        <Text className="flex-1 text-left text-sm text-gray-900 dark:text-neutral">
          {item.title}
        </Text>
        <Text className="flex-1 text-left text-sm text-gray-900 dark:text-neutral">
          {user?.currency} {formatAmount(item.amount)}
        </Text>
        <Text className="flex-1 text-right text-sm text-gray-900 dark:text-neutral">
          {formatDate(item.date)}
        </Text>
      </View>
    </Pressable>
  );
}
