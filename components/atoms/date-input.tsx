import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, useColorScheme } from 'react-native';
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [showPicker, setShowPicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (Platform.OS === 'android' && timePicker && !showPicker) {
      setShowPicker(true);
    }
  }, [timePicker, showPicker]);

  const formattedValue = value
    ? mode === 'time'
      ? value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : mode === 'datetime'
        ? `${value.toLocaleDateString()} ${value.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}`
        : value.toLocaleDateString()
    : placeholder;

  const isPlaceholder = !value;

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      if (mode === 'datetime') {
        if (!timePicker && selectedDate) {
          setTempDate(selectedDate);
          setShowPicker(false);
          setTimePicker(true);
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
      }
    } else {
      if (selectedDate) {
        onChangeText?.(selectedDate);
      }
    }
  };

  return (
    <View className="w-full">
      {label && <Text className="mb-2 text-sm text-gray-700 dark:text-gray-300">{label}</Text>}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="
          dark:border-neutral-700 flex-row items-center
          justify-between rounded-lg border border-gray-300 bg-white
          px-4 py-3
          dark:border-gray-700 dark:bg-background-dark-secondary
        ">
        <Text
          className={`text-sm ${
            isPlaceholder ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'
          }`}>
          {formattedValue}
        </Text>

        <Ionicons name="calendar-outline" size={22} color={isDark ? '#e5e7eb' : '#111827'} />
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

      {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
    </View>
  );
}
