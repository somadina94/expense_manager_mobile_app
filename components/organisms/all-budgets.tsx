import { ScrollView, Alert, View } from 'react-native';
import { budgetService } from 'services';
import { useState, useEffect } from 'react';
import { useAppSelector, RootState, AuthState } from 'store';
import { Budget } from 'types';
import { useIsFocused } from '@react-navigation/native';
import Loading from 'components/molecules/loading';
import BudgetItem from 'components/molecules/budget-item';
import NoResult from 'components/atoms/no-result';

export default function AllBudgets() {
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchBudgets = async () => {
      setIsloading(true);
      const response = await budgetService.getBudgets(access_token as string);
      if (response.status === 200) {
        setBudgets(response.data.data.budgets);
      } else {
        Alert.alert(response.message);
      }
      setIsloading(false);
    };
    fetchBudgets();
  }, [access_token, isFocused]);

  const sortedBudgets = budgets
    .sort((a: any, b: any) => b.year - a.year)
    .sort((a: any, b: any) => b.month - a.month);

  if (isLoading) {
    return <Loading />;
  }

  if (budgets.length === 0) {
    return <NoResult />;
  }

  return (
    <ScrollView className="flex-1">
      <View className="gap-4 p-4">
        {sortedBudgets.map((budget: Budget) => (
          <BudgetItem key={budget._id} budget={budget} />
        ))}
      </View>
    </ScrollView>
  );
}
