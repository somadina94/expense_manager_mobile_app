import { View, Text } from 'react-native';

export default function NoResult() {
  return (
    <View className="flex-1 items-center justify-center bg-background-light-primary dark:bg-background-dark-secondary">
      <Text className="text-2xl text-gray-900 dark:text-neutral">No results.</Text>
    </View>
  );
}
