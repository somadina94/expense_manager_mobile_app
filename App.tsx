import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator, Alert, useColorScheme } from 'react-native';

import './global.css';
import {
  WelcomeScreen,
  Login,
  DashboardScreen,
  Signup,
  SettingsScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  ExpensesScreen,
  BudgetsScreen,
  NotesScreen,
  AllExpensesScreen,
  ExpenseDetailScreen,
  AddExpenseScreen,
  UpdateExpenseScreen,
  SearchExpenseScreen,
  AllBudgetsScreen,
  AddBudgetScreen,
  BudgetDetailScreen,
  UpdateBudgetScreen,
  SearchBudgetsScreen,
  AllNotesScreen,
  AddNoteScreen,
  NoteDetailScreen,
  SearchNoteScreen,
  UpdateNoteScreen,
  UpdateMeScreen,
  UpdatePasswordScreen,
} from 'screens';
import {
  store,
  persistor,
  RootState,
  useAppDispatch,
  useAppSelector,
  AuthState,
  logout,
  setUser,
} from 'store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import { authService } from 'services';
import { User } from 'types';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={SettingsScreen} />
      <Stack.Screen name="UpdateMe" component={UpdateMeScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} />
    </Stack.Navigator>
  );
}

function ExpensesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={ExpensesScreen} />
      <Stack.Screen name="AllExpenses" component={AllExpensesScreen} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="UpdateExpense" component={UpdateExpenseScreen} />
      <Stack.Screen name="SearchExpense" component={SearchExpenseScreen} />
    </Stack.Navigator>
  );
}

function BudgetsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={BudgetsScreen} />
      <Stack.Screen name="AllBudgets" component={AllBudgetsScreen} />
      <Stack.Screen name="AddBudget" component={AddBudgetScreen} />
      <Stack.Screen name="BudgetDetail" component={BudgetDetailScreen} />
      <Stack.Screen name="UpdateBudget" component={UpdateBudgetScreen} />
      <Stack.Screen name="SearchBudget" component={SearchBudgetsScreen} />
    </Stack.Navigator>
  );
}

function NotesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={NotesScreen} />
      <Stack.Screen name="AllNotes" component={AllNotesScreen} />
      <Stack.Screen name="AddNote" component={AddNoteScreen} />
      <Stack.Screen name="NoteDetail" component={NoteDetailScreen} />
      <Stack.Screen name="SearchNote" component={SearchNoteScreen} />
      <Stack.Screen name="UpdateNote" component={UpdateNoteScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedTab() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colorScheme === 'dark' ? '#0D0A09' : '#1F4E79' },
        tabBarActiveTintColor: '#9CCD16',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#FFFFFF',
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { access_token, isLoggedIn } = useAppSelector(
    (state: RootState) => state.auth
  ) as AuthState;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!access_token) return;
    const fetchUser = async () => {
      try {
        const response = await authService.getMe(access_token as string);
        if (response.status === 200) {
          dispatch(setUser(response.data.data.user as User));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
    };
    fetchUser();
  }, [access_token, dispatch]);
  return (
    <NavigationContainer>
      {!isLoggedIn && <AuthStack />}
      {isLoggedIn && <AuthenticatedTab />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate
          loading={<ActivityIndicator size="large" color="#9CCD16" />}
          persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
}
