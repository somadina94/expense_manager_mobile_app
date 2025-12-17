import { useState, useEffect } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import { noteService } from 'services';
import NoteItem from 'components/molecules/note-item';
import NoResult from 'components/atoms/no-result';
import { useAppSelector, RootState, AuthState } from 'store';
import { Note } from 'types';
import { useIsFocused } from '@react-navigation/native';
import Loading from 'components/molecules/loading';

export default function AllNotes() {
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const [notes, setNotes] = useState<Note[]>([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchNotes = async () => {
      setIsloading(true);
      const response = await noteService.getNotes(access_token as string);
      if (response.status === 200) {
        setNotes(response.data.data.notes);
      } else {
        Alert.alert(response.message);
      }
      setIsloading(false);
    };
    fetchNotes();
  }, [access_token, isFocused]);

  const sortedNotes = notes.sort(
    (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updateAt).getTime()
  );

  if (isLoading) {
    return <Loading />;
  }

  if (notes.length === 0) {
    return <NoResult />;
  }

  return (
    <ScrollView>
      <View className="gap-4 p-4">
        {sortedNotes.map((note: Note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </View>
    </ScrollView>
  );
}
