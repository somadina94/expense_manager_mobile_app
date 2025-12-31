import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppSelector, AuthState, RootState } from 'store';
import { budgetService, expenseService, noteService, notificationService } from 'services';
import { Budget, Expense, Note, Notification } from 'types';
import StatItem from 'components/atoms/stat-item';
import { formatAmount } from 'utils/helpers';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loading from 'components/molecules/loading';

export default function Dashboard() {
  const { user, access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (access_token) {
      setIsloading(true);
      budgetService.getBudgets(access_token).then((res: any) => {
        setBudgets(res.data.data.budgets as Budget[]);
      });
      expenseService.getExpenses(access_token).then((res: any) => {
        setExpenses(res.data.data.expenses as Expense[]);
      });
      notificationService.getNotifications(access_token).then((res: any) => {
        setNotifications(res.data.data.notifications as Notification[]);
      });
      noteService.getNotes(access_token).then((res: any) => {
        setNotes(res.data.data.notes as Note[]);
        setIsloading(false);
      });
    }
  }, [access_token, isFocused]);

  let currentMonthExpenses: Expense[] = [];
  let lastMonthExpenses: Expense[] = [];
  let currentMonthBudgets: Budget[] = [];
  let lastMonthBudgets: Budget[] = [];
  let unreadNotifications: Notification[] = [];

  if (expenses.length > 0) {
    currentMonthExpenses = expenses.filter(
      (expense) =>
        new Date(expense?.date).getMonth() === new Date().getMonth() &&
        new Date(expense?.date).getFullYear() === new Date().getFullYear()
    );
    lastMonthExpenses = expenses.filter(
      (expense) =>
        new Date(expense?.date).getMonth() === new Date().getMonth() - 1 &&
        new Date(expense?.date).getFullYear() === new Date().getFullYear()
    );
  }

  if (budgets.length > 0) {
    currentMonthBudgets = budgets.filter(
      (budget) =>
        budget?.month === new Date().getMonth() && budget?.year === new Date().getFullYear()
    );
    lastMonthBudgets = budgets.filter(
      (budget) =>
        budget?.month === new Date().getMonth() - 1 && budget?.year === new Date().getFullYear()
    );
  }

  if (notifications.length > 0) {
    unreadNotifications = notifications.filter((notification) => notification.read === false);
  }

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalNotes = notes.length;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <View className="h-[112px] w-full flex-row items-end justify-between bg-primary-500 p-4 dark:bg-background-dark-secondary">
        <View className="mt-16 flex-row items-end gap-2">
          <Ionicons name="person-outline" size={24} color="white" />
          <Text className="text-md font-bold text-neutral">
            Hi, {user?.name.split(' ')[0].toUpperCase()}
          </Text>
        </View>
        <Pressable
          className="relative"
          onPress={() => (navigation as any).navigate('Notifications')}>
          <Ionicons name="notifications" size={24} color="white" />
          {unreadNotifications.length > 0 && (
            <View className="text-md absolute right-0 top-[-12] h-6 w-6 flex-1 items-center justify-center rounded-full bg-red-500 text-center text-neutral">
              <Text className="text-sm text-neutral">{unreadNotifications.length}</Text>
            </View>
          )}
        </Pressable>
      </View>
      <ScrollView>
        <View className="flex gap-6 p-4">
          <StatItem
            title="Current month budget"
            value={`${user?.currency} ${formatAmount(
              currentMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0)
            )}`}
            color="#1E3A8A"
          />

          <StatItem
            title="Current month expenses"
            value={`${user?.currency} ${formatAmount(
              currentMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0)
            )}`}
            color="#2563EB"
          />

          <StatItem
            title="Last month budget"
            value={`${user?.currency} ${formatAmount(
              lastMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0)
            )}`}
            color="#334155"
          />

          <StatItem
            title="Last month expenses"
            value={`${user?.currency} ${formatAmount(
              lastMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0)
            )}`}
            color="#d9480f"
          />

          <StatItem
            title="Total budget"
            value={`${user?.currency} ${formatAmount(totalBudget)}`}
            color="#7C3AED"
          />

          <StatItem
            title="Total expenses"
            value={`${user?.currency} ${formatAmount(totalExpenses)}`}
            color="#0F766E"
          />

          <StatItem title="All notes" value={`${totalNotes}`} color="#065F46" />
        </View>
      </ScrollView>
    </View>
  );
}
