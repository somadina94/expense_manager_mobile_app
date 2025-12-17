import { ScrollView, Alert, View } from 'react-native';
import { expenseService } from 'services';
import ExpenseItem from 'components/molecules/expense-item';
import { useState, useEffect } from 'react';
import { useAppSelector, RootState, AuthState } from 'store';
import { Expense } from 'types';
import { useIsFocused } from '@react-navigation/native';
import Loading from 'components/molecules/loading';

export default function AllExpenses() {
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchExpenses = async () => {
      setIsloading(true);
      const response = await expenseService.getExpenses(access_token as string);
      if (response.status === 200) {
        setExpenses(response.data.data.expenses);
      } else {
        Alert.alert(response.message);
      }
      setIsloading(false);
    };
    fetchExpenses();
  }, [access_token, isFocused]);

  const sortedExpenses = expenses.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View className="gap-4 p-4">
        {sortedExpenses.map((item: Expense) => (
          <ExpenseItem key={item._id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}
