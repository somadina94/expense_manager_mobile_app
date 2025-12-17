import { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppSelector, AuthState, RootState } from 'store';
import { budgetService, expenseService, noteService } from 'services';
import { Budget, Expense, Note } from 'types';

export default function Dashboard() {
  const { user, access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (access_token) {
      budgetService.getBudgets(access_token).then((res: any) => {
        setBudgets(res.data.data.budgets as Budget[]);
      });
      expenseService.getExpenses(access_token).then((res: any) => {
        setExpenses(res.data.data.expenses as Expense[]);
      });
      noteService.getNotes(access_token).then((res: any) => {
        setNotes(res.data.data.notes as Note[]);
      });
    }
  }, [access_token]);

  let currentMonthExpenses: Expense[] = [];
  let lastMonthExpenses: Expense[] = [];
  let currentMonthBudgets: Budget[] = [];
  let lastMonthBudgets: Budget[] = [];

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

  const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const totalNotes = notes.length;

  return (
    <View className="flex-1">
      <View className="h-[112px] w-full flex-row items-end justify-between bg-primary-500 p-4 dark:bg-background-dark-secondary">
        <View className="mt-16 flex-row items-end gap-2">
          <Ionicons name="person-outline" size={24} color="white" />
          <Text className="text-md font-bold text-neutral">
            Hi, {user?.name.split(' ')[0].toUpperCase()}
          </Text>
        </View>
        <Pressable className="relative">
          <Ionicons name="notifications" size={24} color="white" />
          <View className="text-md absolute right-0 top-[-12] h-6 w-6 flex-1 items-center justify-center rounded-full bg-red-500 text-center text-neutral">
            <Text className="text-sm text-neutral">33</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView>
        <View className="flex gap-6 p-4">
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#434E78] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Current month budget
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${currentMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0).toFixed(2)}`}</Text>
          </View>
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#607B8F] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Current month expenses
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${currentMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}`}</Text>
          </View>
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#44444E] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Last month budget
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${lastMonthBudgets.reduce((acc, budget) => acc + budget.amount, 0).toFixed(2)}`}</Text>
          </View>
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#522546] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Last month expenses
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${lastMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0).toFixed(2)}`}</Text>
          </View>
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#92487A] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Total budget
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${totalBudget.toFixed(2)}`}</Text>
          </View>
          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#018790] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              Total expenses
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{`${user?.currency}${totalExpenses.toFixed(2)}`}</Text>
          </View>

          <View className="elevation-lg items-center justify-center gap-2 rounded-md bg-[#016B61] py-4">
            <Text className="text-md font-semibold text-text-light dark:text-text-dark">
              All notes
            </Text>
            <Text className="text-md text-gray-300 dark:text-text-dark">{totalNotes}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
