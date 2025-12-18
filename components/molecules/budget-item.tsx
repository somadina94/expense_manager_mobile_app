import { View, Text, Pressable } from 'react-native';
import { Budget } from 'types';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector, RootState, AuthState } from 'store';
import { formatAmount, getMonthName } from 'utils/helpers';

interface BudgetItemProps {
  budget: Budget;
}

export default function BudgetItem({ budget }: BudgetItemProps) {
  const { user } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => (navigation as any).navigate('BudgetDetail', { budget: budget as Budget })}
      className="flex-1 rounded-lg bg-background-light-secondary shadow-sm active:opacity-50 dark:bg-background-dark-secondary">
      <View className="flex-row p-4">
        <Text className="flex-1 text-left text-sm text-gray-900 dark:text-neutral">
          {user?.currency} {formatAmount(budget.amount)}
        </Text>
        <Text className="flex-1 text-left text-sm text-gray-900 dark:text-neutral">
          {getMonthName(budget.month)}
        </Text>
        <Text className="flex-1 text-right text-sm text-gray-900 dark:text-neutral">
          {budget.year}
        </Text>
      </View>
    </Pressable>
  );
}
