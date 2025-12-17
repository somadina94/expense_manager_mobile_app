import { View } from 'react-native';
import { UpdateNote, NavigationHeader } from 'components';

export default function UpdateNoteScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Update Note" />
      <UpdateNote />
    </View>
  );
}
