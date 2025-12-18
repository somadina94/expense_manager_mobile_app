import { useState } from 'react';
import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colorScheme } from 'nativewind';
import { Settings } from 'components';
import { useAppDispatch, logout } from 'store';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(colorScheme.get() === 'dark');
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    colorScheme.toggle();
  };

  const dispatch = useAppDispatch();
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <View className="h-[112px] flex-row items-end bg-primary-500 px-4 pb-4 dark:bg-background-dark-secondary">
        <Ionicons
          name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
          size={24}
          color={isDarkMode ? 'white' : 'white'}
          onPress={toggleDarkMode}
        />
        <Text className="flex-1 text-center text-heading-md text-neutral">Settings</Text>
        <View className=" items-center">
          <Ionicons
            name="power-outline"
            size={24}
            color="red"
            onPress={() => {
              dispatch(logout());
            }}
          />
          <Text className="text-white">Logout</Text>
        </View>
      </View>
      <Settings />
    </View>
  );
}
