import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface OTPInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  length?: number;
  value: string;
  onChangeText: (value: string) => void;
  label?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export default function OTPInput({
  length = 6,
  value,
  onChangeText,
  label,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  ...props
}: OTPInputProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  useEffect(() => {
    // Sync external value with internal state
    if (value) {
      const valueArray = value.split('').slice(0, length);
      const newOtp = [...Array(length).fill('')];
      valueArray.forEach((char, index) => {
        newOtp[index] = char;
      });
      setOtp(newOtp);
    } else {
      setOtp(Array(length).fill(''));
    }
  }, [value, length]);

  const handleChangeText = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, '');

    if (digit.length > 1) {
      // Handle paste: fill multiple boxes
      const digits = digit.slice(0, length - index);
      const newOtp = [...otp];
      digits.split('').forEach((d, i) => {
        if (index + i < length) {
          newOtp[index + i] = d;
        }
      });
      setOtp(newOtp);
      onChangeText(newOtp.join(''));

      // Focus on the next empty box or the last box
      const nextIndex = Math.min(index + digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else if (digit.length === 1) {
      // Single digit entered
      const newOtp = [...otp];
      newOtp[index] = digit;
      setOtp(newOtp);
      onChangeText(newOtp.join(''));

      // Move to next box if not the last one
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      // Empty: clear current box
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      onChangeText(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // If current box is empty and backspace is pressed, go to previous box
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <Text
          className={`mb-2 text-sm font-medium text-text-light dark:text-text-dark ${labelClassName}`}>
          {label}
        </Text>
      )}
      <View className="flex-row justify-between gap-3">
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className={`
            h-14 w-14 rounded-lg border-2 border-gray-300 bg-neutral text-center
            text-heading-lg font-bold
            text-text-light
            focus:border-accent-500 focus:bg-accent-500/10
            dark:border-gray-700 dark:bg-background-dark-secondary dark:text-text-dark
            ${inputClassName}
          `}
            value={otp[index]}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            {...props}
          />
        ))}
      </View>
    </View>
  );
}
