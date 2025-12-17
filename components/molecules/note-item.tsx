import { Pressable, Text } from 'react-native';
import { Note } from 'types';
import { useNavigation } from '@react-navigation/native';
import { trimToLength } from 'utils/helpers';

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => (navigation as any).navigate('NoteDetail', { note: note as Note })}
      className="h-[80px] w-full gap-2 rounded-lg bg-background-light-secondary p-4 shadow-sm dark:bg-background-dark-secondary">
      <Text className="text-lg font-semibold text-gray-600">{note.title}</Text>
      <Text className="text-sm text-gray-600 dark:text-neutral">
        {trimToLength(note.content, 56)}
      </Text>
    </Pressable>
  );
}
