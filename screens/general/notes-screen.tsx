import { View } from 'react-native';
import { TabHeader, Notes } from 'components';

export default function NotesScreen() {
  return (
    <View className="flex-1 bg-background-light-primary dark:bg-background-dark-primary">
      <TabHeader title="Notes" />
      <Notes />
    </View>
  );
}
