import { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { noteService } from 'services';
import useInput from 'hooks/userInput';
import useDateInput from 'hooks/use-date-input';
import { useNavigation } from '@react-navigation/native';
import Input from 'components/atoms/input';
import IconButton from 'components/atoms/icon-button';
import { Note } from 'types';
import { useAppSelector, RootState, AuthState } from 'store';
import DateInput from 'components/atoms/date-input';
import Textarea from 'components/atoms/textarea';

export default function AddNote() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const { access_token } = useAppSelector((state: RootState) => state.auth) as AuthState;
  const {
    value: titleInput,
    hasError: titleInputHasError,
    enteredValueIsValid: titleInputIsValid,
    valueInputChangedHandler: titleInputChangedHandler,
    valueInputBlurHandler: titleInputBlurHandler,
    // reset: titleInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: contentInput,
    hasError: contentInputHasError,
    enteredValueIsValid: contentInputIsValid,
    valueInputChangedHandler: contentInputChangedHandler,
    valueInputBlurHandler: contentInputBlurHandler,
    // reset: contentInputReset,
  } = useInput((value: string) => value.trim().length > 0);

  const {
    value: dateInput,
    hasError: dateInputHasError,
    enteredValueIsValid: dateInputIsValid,
    valueInputChangedHandler: dateInputChangedHandler,
    valueInputBlurHandler: dateInputBlurHandler,
    // reset: dateInputReset,
  } = useDateInput((date) => !!date);

  let formIsValid = false;
  if (titleInputIsValid && contentInputIsValid && dateInputIsValid) {
    formIsValid = true;
  }

  const submitHandler = async () => {
    setLoading(true);

    const data: Note = {
      title: titleInput as string,
      content: contentInput as string,
      reminder: dateInput as Date,
    };

    const res = await noteService.createNote(data, access_token as string);

    if (res.status === 201) {
      Alert.alert('Success', res.message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Success', res.message, [
        {
          text: 'OK',
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <ScrollView>
        <View className="flex-1 gap-4 p-4">
          <Input
            label="Title"
            placeholder="Title"
            value={titleInput}
            onChangeText={titleInputChangedHandler}
            onBlur={titleInputBlurHandler}
            error={titleInputHasError ? 'Title is required' : ''}
          />
          <Textarea
            label="Content"
            placeholder="Content"
            value={contentInput}
            onChangeText={contentInputChangedHandler}
            onBlur={contentInputBlurHandler}
            error={contentInputHasError ? 'Content is required' : ''}
          />
          <DateInput
            label="Reminder"
            placeholder="Date"
            value={dateInput}
            onChangeText={dateInputChangedHandler}
            onBlur={dateInputBlurHandler}
            error={dateInputHasError ? 'Reminder is required' : ''}
            mode="datetime"
          />
          <IconButton
            title="ADD"
            iconName="add-outline"
            disabled={!formIsValid}
            onPress={submitHandler}
            loading={loading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
