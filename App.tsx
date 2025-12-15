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
      <Stack.Screen name="overview" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedTab() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: colorScheme === 'dark' ? '#1A120B' : '#004B90' },
        tabBarActiveTintColor: '#9CCD16',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#2F2E38',
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
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
          dispatch(setUser(response.data as User));
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
