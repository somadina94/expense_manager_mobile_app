import { View, Text } from 'react-native';

export default function TabHeader({ title }: { title: string }) {
  return (
    <View className="h-[112px] w-full border-b border-gray-500 bg-primary-500 dark:bg-background-dark-secondary">
      <View className="mt-16 flex-row items-center px-4">
        <Text className="flex-1 text-center text-heading-md text-text-dark">{title}</Text>
      </View>
    </View>
  );
}
