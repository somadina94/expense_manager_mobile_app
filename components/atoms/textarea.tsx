import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface TextareaProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  minHeight?: number;
  maxHeight?: number;
}

export default function Textarea({
  label,
  error,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  minHeight = 100,
  maxHeight,
  ...props
}: TextareaProps) {
  return (
    <View className={`${containerClassName} w-full`}>
      {label && (
        <Text
          className={`mb-2 text-sm font-medium text-text-light dark:text-text-dark ${labelClassName}`}>
          {label}
        </Text>
      )}
      <View className="relative">
        <TextInput
          className={`
            w-full rounded-lg border bg-neutral px-4 py-3 
            text-text-light 
            focus:outline-none 
            dark:bg-background-dark-secondary dark:text-text-dark
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
            ${inputClassName}
          `}
          placeholderTextColor="#5E6170"
          multiline
          textAlignVertical="top"
          style={{ minHeight, maxHeight }}
          {...props}
        />
      </View>
      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
}

