import { View } from 'react-native';
import { SearchNoteForm, NavigationHeader } from 'components';

export default function SearchNoteScreen() {
  return (
    <View className="bg-background-light-primary-500 flex-1 dark:bg-background-dark-primary">
      <NavigationHeader title="Search Notes" />
      <SearchNoteForm />
    </View>
  );
}
