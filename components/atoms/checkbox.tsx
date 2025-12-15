import React from 'react';
import { View, Text, TouchableOpacity, TextProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  labelComponent?: React.ReactNode;
  error?: string;
  containerClassName?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
}

export default function Checkbox({
  checked,
  onPress,
  label,
  labelComponent,
  error,
  containerClassName = '',
  checkboxClassName = '',
  labelClassName = '',
  errorClassName = '',
  disabled = false,
}: CheckboxProps) {
  return (
    <View className={`${containerClassName} w-full`}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        className={`flex-row items-start ${disabled ? 'opacity-50' : ''}`}>
        {/* Checkbox */}
        <View
          className={`
            mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded border-2
            ${checked ? 'border-accent-500 bg-accent-500' : 'border-gray-300 dark:border-gray-700'}
            ${error ? 'border-red-500' : ''}
            ${checkboxClassName}
          `}>
          {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
        </View>

        {/* Label */}
        <View className="flex-1">
          {labelComponent ? (
            labelComponent
          ) : (
            <Text
              className={`text-body text-text-light dark:text-text-dark ${labelClassName}`}>
              {label}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
}

