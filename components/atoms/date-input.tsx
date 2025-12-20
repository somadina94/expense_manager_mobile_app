import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface DateInputProps {
  label?: string;
  value?: Date;
  onChangeText?: (date: Date | undefined) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  mode?: 'date' | 'time' | 'datetime';
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function DateInput({
  label,
  value,
  onChangeText,
  onBlur,
  error,
  placeholder = 'Select date',
  mode = 'date',
  minimumDate,
  maximumDate,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

  // useEffect to open time picker safely after date picker closes
  useEffect(() => {
    if (Platform.OS === 'android' && timePicker && !showPicker) {
      setShowPicker(true);
    }
  }, [timePicker, showPicker]);

  const formattedValue = value
    ? mode === 'time'
      ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : mode === 'datetime'
        ? `${value.toLocaleDateString()} ${value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : value.toLocaleDateString()
    : placeholder;

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (mode === 'datetime') {
        if (!timePicker && selectedDate) {
          // Save date and prepare time picker
          setTempDate(selectedDate);
          setShowPicker(false); // close date picker first
          setTimePicker(true); // time picker will open in useEffect
          return;
        }
        if (timePicker && selectedDate && tempDate) {
          const combined = new Date(
            tempDate.getFullYear(),
            tempDate.getMonth(),
            tempDate.getDate(),
            selectedDate.getHours(),
            selectedDate.getMinutes()
          );
          onChangeText?.(combined);
          setTimePicker(false);
          setTempDate(undefined);
          setShowPicker(false);
          onBlur?.();
          return;
        }
      } else if (selectedDate) {
        onChangeText?.(selectedDate);
        setShowPicker(false);
        onBlur?.();
        return;
      }
    } else {
      if (selectedDate) {
        onChangeText?.(selectedDate);
      }
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  return (
    <View className="w-full">
      {label && <Text className="mb-2">{label}</Text>}

      <TouchableOpacity
        onPress={openPicker}
        className="flex-row items-center justify-between rounded-lg border px-4 py-3">
        <Text>{formattedValue}</Text>
        <Ionicons name="calendar-outline" size={22} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={
            Platform.OS === 'android' && mode === 'datetime' && timePicker
              ? 'time'
              : mode === 'datetime'
                ? 'date'
                : mode
          }
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {error && <Text className="mt-1 text-red-500">{error}</Text>}
    </View>
  );
}
