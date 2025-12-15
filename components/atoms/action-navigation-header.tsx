import { View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colorScheme } from 'nativewind';
import { useState } from 'react';

export default function ActionNavigationHeader({
  title,
  actionIcon,
}: {
  title: string;
  actionIcon: React.ReactNode;
}) {
  const navigation = useNavigation();
  const [isDarkMode] = useState(colorScheme.get() === 'dark');
  return (
    <View className="h-[112px] w-full bg-primary-300 dark:bg-background-dark-secondary">
      <View className="mt-16 flex-row items-center px-4">
        <Ionicons
          name="arrow-back"
          size={24}
          color={isDarkMode ? 'white' : 'black'}
          onPress={() => navigation.goBack()}
        />
        <Text className="flex-1 text-center text-heading-md text-text-light dark:text-text-dark">
          {title}
        </Text>
        {actionIcon && actionIcon}
      </View>
    </View>
  );
}
