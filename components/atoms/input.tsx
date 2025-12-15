import React, { useState } from 'react';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  isPassword?: boolean;
}

export default function Input({
  label,
  error,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  isPassword = false,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Only apply w-full if containerClassName doesn't already have width/flex classes
  const hasWidthOrFlex = /(w-|flex-|flex\s)/.test(containerClassName);
  const containerClass = hasWidthOrFlex ? containerClassName : `${containerClassName} w-full`;
  return (
    <View className={containerClass}>
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
            ${isPassword ? 'pr-12' : ''}
            ${inputClassName}
          `}
          placeholderTextColor="#5E6170"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
}
