import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SelectOption {
  label: string;
  value: string | undefined;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | undefined;
  onValueChange: (value: string | undefined) => void;
  placeholder?: string;
  error?: string;
  containerClassName?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

export default function Select({
  label,
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  error,
  containerClassName = '',
  selectClassName = '',
  labelClassName = '',
  errorClassName = '',
  disabled = false,
  onBlur,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string | undefined) => {
    onValueChange(optionValue);
    setIsOpen(false);
    onBlur?.();
  };

  // Only apply w-full if containerClassName doesn't already include width/flex
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

      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`
          w-full flex-row items-center justify-between rounded-lg border bg-neutral px-4 py-3
          text-text-light
          dark:bg-background-dark-secondary dark:text-text-dark
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
          ${disabled ? 'opacity-50' : ''}
          ${selectClassName}
        `}>
        <Text
          className={`flex-1 text-body ${
            selectedOption ? 'text-text-light dark:text-text-dark' : 'text-text-placeholder'
          }`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={error ? '#EF4444' : '#5E6170'}
        />
      </TouchableOpacity>

      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                className="absolute bottom-0 left-0 right-0 max-h-[60%] rounded-t-3xl bg-neutral dark:bg-background-dark-secondary"
                style={{ paddingBottom: insets.bottom }}>
                {/* Header */}
                <View className="border-b border-gray-300 px-4 py-3 dark:border-gray-700">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-heading-md text-text-light dark:text-text-dark">
                      {label || 'Select an option'}
                    </Text>
                    <TouchableOpacity onPress={() => setIsOpen(false)}>
                      <Ionicons name="close" size={24} color="#5E6170" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Options */}
                <FlatList
                  data={options}
                  keyExtractor={(item) => String(item.value)}
                  keyboardDismissMode="on-drag"
                  contentContainerStyle={{
                    paddingBottom: insets.bottom + 16,
                  }}
                  renderItem={({ item }) => {
                    const isSelected = item.value === value;

                    return (
                      <TouchableOpacity
                        onPress={() => handleSelect(item.value)}
                        className={`
                          border-b border-gray-200 px-4 py-4
                          dark:border-gray-700
                          ${isSelected ? 'bg-accent-500/10' : ''}
                        `}>
                        <View className="flex-row items-center justify-between">
                          <Text
                            className={`text-body ${
                              isSelected
                                ? 'font-semibold text-accent-500'
                                : 'text-text-light dark:text-text-dark'
                            }`}>
                            {item.label}
                          </Text>

                          {isSelected && <Ionicons name="checkmark" size={20} color="#9CCD16" />}
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
