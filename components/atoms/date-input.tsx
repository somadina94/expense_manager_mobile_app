import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

interface DateInputProps {
  label?: string;
  value?: Date;
  onChangeText?: (date: Date | undefined) => void;
  onBlur?: () => void;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
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
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  placeholder = 'Select date',
  mode = 'date',
  minimumDate,
  maximumDate,
}: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const hasWidthOrFlex = /(w-|flex-|flex\s)/.test(containerClassName);
  const containerClass = hasWidthOrFlex ? containerClassName : `${containerClassName} w-full`;

  const formattedValue = value ? value.toLocaleDateString() : placeholder;

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
      onBlur?.();
    }

    if (selectedDate) {
      onChangeText?.(selectedDate);
    }
  };

  const openPicker = () => {
    setShowPicker(true);
  };

  const closeIOSPicker = () => {
    setShowPicker(false);
    onBlur?.();
  };

  return (
    <View className={containerClass}>
      {label && (
        <Text
          className={`mb-2 text-sm font-medium text-text-light dark:text-text-dark ${labelClassName}`}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openPicker}
        onBlur={onBlur}
        className={`
          w-full flex-row items-center justify-between rounded-lg border bg-neutral px-4 py-3
          dark:bg-background-dark-secondary
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
          ${inputClassName}
        `}>
        <Text className={`${value ? 'text-text-light dark:text-text-dark' : 'text-gray-400'}`}>
          {formattedValue}
        </Text>

        <Ionicons name="calendar-outline" size={22} color="#6B7280" />
      </TouchableOpacity>

      {showPicker && Platform.OS === 'ios' && (
        <View className="mt-2 overflow-hidden rounded-lg">
          <DateTimePicker
            value={value ?? new Date()}
            mode={mode}
            display="spinner"
            onChange={handleChange}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />

          <TouchableOpacity className="bg-primary items-center py-3" onPress={closeIOSPicker}>
            <Text className="font-medium text-white">Done</Text>
          </TouchableOpacity>
        </View>
      )}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}

      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
}
