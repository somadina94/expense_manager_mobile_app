import { View, ScrollView } from 'react-native';
import TabMenuItem from 'components/molecules/tab-menu-item';

export default function Notes() {
  return (
    <ScrollView>
      <View className="gap-4 p-6">
        <TabMenuItem title="All Notes" destination="AllNotes" icon="document-outline" />
        <TabMenuItem title="Add Note" destination="AddNote" icon="add" />
        <TabMenuItem title="Search Notes" destination="SearchNote" icon="search-outline" />
      </View>
    </ScrollView>
  );
}
