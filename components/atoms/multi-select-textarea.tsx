import React, { useState, useRef } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colorScheme } from 'nativewind';

interface MultiSelectTextareaProps {
  label?: string;
  error?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  maxHeight?: number;
}

export default function MultiSelectTextarea({
  label,
  error,
  placeholder = 'Type and press Enter to add...',
  value = [],
  onChange,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  maxHeight = 120,
}: MultiSelectTextareaProps) {
  const [inputText, setInputText] = useState('');
  const [isDarkMode] = useState(colorScheme.get() === 'dark');
  const inputRef = useRef<TextInput>(null);

  const handleAddTag = (text: string) => {
    const trimmedText = text.trim();

    // Always clear the input immediately, ready for new input
    setInputText('');

    if (trimmedText && !value.includes(trimmedText)) {
      const newValues = [...value, trimmedText];
      onChange?.(newValues);
    }

    // Focus the input after adding a tag
    setTimeout(() => {
      inputRef.current?.focus();
      setInputText('');
    }, 0);
  };

  const handleRemoveTag = (index: number) => {
    const newValues = value.filter((_, i) => i !== index);
    onChange?.(newValues);
    // Keep focus on input after removing tag
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleTextChange = (text: string) => {
    // Check for comma or semicolon as delimiters
    const delimiterIndex = text.search(/[,;]/);
    if (delimiterIndex !== -1) {
      const tagText = text.substring(0, delimiterIndex).trim();
      if (tagText) {
        handleAddTag(tagText);
        setInputText(text.substring(delimiterIndex + 1));
        return;
      }
    }
    setInputText(text);
  };

  const handleKeyPress = (e: any) => {
    // Try to detect Enter key (works better on some platforms)
    if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      handleAddTag(inputText);
    }
  };

  const handleSubmitEditing = () => {
    handleAddTag(inputText);
  };

  return (
    <View className={`${containerClassName} w-full`}>
      {label && (
        <Text
          className={`mb-2 text-sm font-medium text-text-light dark:text-text-dark ${labelClassName}`}>
          {label}
        </Text>
      )}

      {/* Combined Container with Tags and Input */}
      <View
        className={`
          min-h-[48px] w-full flex-row flex-wrap items-start rounded-lg border bg-neutral px-2 py-2
          dark:bg-background-dark-secondary
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
        `}
        style={{ maxHeight }}>
        {/* Tags rendered inline */}
        {value.map((tag, index) => (
          <View
            key={index}
            className="m-1 flex-row items-center rounded-full bg-primary-300 px-3 py-1.5 dark:bg-background-dark-secondary">
            <Text className="mr-2 text-sm text-text-light dark:text-text-dark">{tag}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveTag(index)}
              activeOpacity={0.7}
              className="rounded-full bg-gray-300 p-0.5 dark:bg-gray-700">
              <Ionicons name="close" size={14} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Text Input positioned after tags */}
        <TextInput
          ref={inputRef}
          className={`
            min-w-[120px] flex-1 text-text-light 
            dark:text-text-dark
            ${inputClassName}
          `}
          placeholder={value.length === 0 ? placeholder : ''}
          placeholderTextColor="#5E6170"
          value={inputText}
          onChangeText={handleTextChange}
          onKeyPress={handleKeyPress}
          onSubmitEditing={handleSubmitEditing}
          blurOnSubmit={false}
          multiline
          textAlignVertical="top"
          style={{ padding: 0, minHeight: 24 }}
        />
      </View>
      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}
    </View>
  );
}
