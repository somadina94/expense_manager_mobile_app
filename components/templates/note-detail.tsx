import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Note } from 'types';
import { formatDate } from 'utils/helpers';
import { useAppSelector, RootState, AuthState } from 'store';
import { noteService } from 'services';

export default function NoteDetail() {
  const { params } = useRoute();
  const { note } = params as { note: Note };
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const navigation = useNavigation();

  const deleteHandler = async () => {
    await noteService.deleteNote(note._id as string, access_token as string);
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteHandler();
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <View className="gap-6 p-4">
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Title</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{note.title}</Text>
        </View>
        <View className="elevation-sm w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Content</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">{note.content}</Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Remind me at</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {formatDate(note.reminder)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Date created</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {formatDate(note.createdAt)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 dark:bg-background-dark-secondary">
          <Text className="text-lg font-semibold text-gray-600">Last updated</Text>
          <Text className="text-sm text-gray-600 dark:text-neutral">
            {formatDate(note.updatedAt)}
          </Text>
        </View>
        <View className="elevation-sm h-[80px} w-full flex-row items-center justify-between rounded-lg bg-primary-500 p-4">
          <Pressable
            className="items-center active:opacity-50"
            onPress={() => (navigation as any).navigate('UpdateNote', { note: note as Note })}>
            <Ionicons name="create-outline" size={24} color="white" />
            <Text className="text-lg text-neutral">Update</Text>
          </Pressable>
          <Pressable className="items-center active:opacity-50" onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={24} color="white" />
            <Text className="text-lg text-neutral">Delete</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
