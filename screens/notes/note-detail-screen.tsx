import { View } from 'react-native';
import { NoteDetail, NavigationHeader } from 'components';

export default function NoteDetailScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Note detail" />
      <NoteDetail />
    </View>
  );
}
