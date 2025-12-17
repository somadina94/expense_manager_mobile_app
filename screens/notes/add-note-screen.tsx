import { View } from 'react-native';
import { AddNote, NavigationHeader } from 'components';

export default function AddNoteScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Add Note" />
      <AddNote />
    </View>
  );
}
