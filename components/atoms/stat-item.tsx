import { View, Text } from 'react-native';

export default function StatItem({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <View className="items-center justify-center gap-2 rounded-md bg-background-light-secondary py-4 shadow-sm dark:bg-background-dark-secondary">
      <Text className="text-md font-semibold text-gray-900">{title.toUpperCase()}</Text>
      <Text className="text-md text-gray-300">{value}</Text>
    </View>
  );
}
