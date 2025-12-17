import { View } from 'react-native';
import { AllNotes, NavigationHeader } from 'components';

export default function AllNotesScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="All Notes" />
      <AllNotes />
    </View>
  );
}
