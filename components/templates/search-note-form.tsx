import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { useAppSelector, RootState, AuthState } from 'store';
import { noteService } from 'services';
import useDateInput from 'hooks/use-date-input';
import DateInput from 'components/atoms/date-input';
import IconButton from 'components/atoms/icon-button';
import NoteItem from 'components/molecules/note-item';
import { Note } from 'types';
import NoResult from 'components/atoms/no-result';

export default function SearchNoteForm() {
  const [notes, setnotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const {
    value: startdateInput,
    hasError: startdateInputHasError,
    enteredValueIsValid: startdateInputIsValid,
    valueInputChangedHandler: startdateInputChangedHandler,
    valueInputBlurHandler: startdateInputBlurHandler,
    // reset: startdateInputReset,
  } = useDateInput((date) => !!date);
  const {
    value: endDateInput,
    hasError: endDateInputHasError,
    enteredValueIsValid: endDateInputIsValid,
    valueInputChangedHandler: endDateInputChangedHandler,
    valueInputBlurHandler: endDateInputBlurHandler,
    // reset: endDateInputReset,
  } = useDateInput((date) => !!date);

  let formIsValid = false;
  if (endDateInputIsValid && startdateInputIsValid) {
    formIsValid = true;
  }

  async function searchHandler() {
    setIsLoading(true);

    const res = await noteService.getNotes(access_token as string, startdateInput, endDateInput);

    if (res.status === 200) {
      setnotes(res.data.data.notes);
    } else {
      Alert.alert('Error', res.message);
    }
    setIsLoading(false);
  }
  const sortednotes = notes.sort(
    (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <View className="p-4">
      <View className="gap-2 rounded-lg bg-background-light-secondary p-2 shadow-sm dark:bg-background-dark-secondary">
        <DateInput
          label="Start date"
          placeholder="Date"
          value={startdateInput}
          onChangeText={startdateInputChangedHandler}
          onBlur={startdateInputBlurHandler}
          error={startdateInputHasError ? 'Start date is required' : ''}
        />
        <DateInput
          label="End date"
          placeholder="Date"
          value={endDateInput}
          onChangeText={endDateInputChangedHandler}
          onBlur={endDateInputBlurHandler}
          error={endDateInputHasError ? 'End date is required' : ''}
        />
        <IconButton
          title="SEARCH"
          iconName="search-outline"
          onPress={searchHandler}
          loading={isLoading}
          disabled={!formIsValid}
        />
      </View>
      <ScrollView className="mt-4 h-[360px] rounded-lg bg-background-light-secondary p-2 shadow-sm dark:bg-background-dark-secondary">
        <View className="gap-2">
          {sortednotes.length === 0 && <NoResult />}
          {sortednotes.length > 0 &&
            sortednotes.map((note: Note) => <NoteItem key={note._id} note={note} />)}
        </View>
      </ScrollView>
    </View>
  );
}
