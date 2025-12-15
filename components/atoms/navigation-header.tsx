import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from 'nativewind';
import { useState } from 'react';

export default function NavigationHeader({ title }: { title: string }) {
  const navigation = useNavigation();
  const [isDarkMode] = useState(colorScheme.get() === 'dark');
  return (
    <View className="bg-primary-900 dark:bg-background-dark-secondary h-[112px] w-full">
      <View className="mt-16 flex-row items-center px-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? 'white' : 'black'}
          onPress={() => navigation.goBack()}
        />
        <Text className="text-heading-md text-text-light dark:text-text-dark flex-1 text-center">
          {title}
        </Text>
      </View>
    </View>
  );
}
