import { Pressable, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface TabMenuItemProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  destination: string;
}

export default function TabMenuItem({ title, destination, icon }: TabMenuItemProps) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(destination as never)}
      className="relative h-[180px] w-full items-center justify-center rounded-md bg-primary-500/50 shadow-sm active:opacity-50">
      <View className="absolute inset-0 items-center justify-center">
        <Ionicons name={icon} size={100} color="#1F4E79" style={{ opacity: 0.2 }} />
      </View>
      <Text className="text-lg text-gray-950 dark:text-neutral">{title}</Text>
    </Pressable>
  );
}
