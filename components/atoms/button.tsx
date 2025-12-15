import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  DimensionValue,
  useColorScheme,
  GestureResponderEvent,
} from 'react-native';

export interface ButtonProps {
  title: string;
  // onPress: (event: React.FormEvent<HTMLFormElement>) => void;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  minWidth?: DimensionValue;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  minWidth,
  leftIcon,
  rightIcon,
  className = '',
  textClassName = '',
  style,
  textStyle,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getVariantStyles = () => {
    const baseStyles = 'rounded-lg items-center justify-center flex-row';

    switch (variant) {
      case 'primary':
        return `${baseStyles} ${isDark ? 'bg-primary-900' : 'bg-primary-900'}`;
      case 'secondary':
        return `${baseStyles} ${isDark ? 'bg-background-dark-secondary border border-gray-600' : 'bg-gray-100 border border-gray-300'}`;
      case 'outline':
        return `${baseStyles} ${isDark ? 'border border-primary-900 bg-transparent' : 'border border-primary-900 bg-transparent'}`;
      case 'ghost':
        return `${baseStyles} ${isDark ? 'bg-background-dark-secondary' : 'bg-background-light-secondary'}`;
      case 'danger':
        return `${baseStyles} ${isDark ? 'bg-red-600' : 'bg-red-500'}`;
      default:
        return `${baseStyles} ${isDark ? 'bg-primary-900' : 'bg-primary-900 text-text-light dark:text-text-dark'}`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 min-h-[36px] min-w-[160px]';
      case 'md':
        return 'px-4 py-3 min-h-[44px] min-w-[160px]';
      case 'lg':
        return 'px-6 py-4 min-h-[52px] min-w-[160px]';
      default:
        return 'px-4 py-3 min-h-[44px] min-w-[160px]';
    }
  };

  const getTextStyles = () => {
    const baseTextStyles = 'font-semibold text-center';

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'text-sm';
        break;
      case 'md':
        sizeStyles = 'text-base';
        break;
      case 'lg':
        sizeStyles = 'text-lg';
        break;
      default:
        sizeStyles = 'text-base';
    }

    let colorStyles = '';
    switch (variant) {
      case 'primary':
        colorStyles = isDark ? 'text-white' : 'text-light';
        break;
      case 'secondary':
        colorStyles = isDark ? 'text-white' : 'text-light';
        break;
      case 'outline':
        colorStyles = isDark ? 'text-neutral' : 'text-light';
        break;
      case 'ghost':
        colorStyles = isDark ? 'text-neutral' : 'text-light';
        break;
      case 'danger':
        colorStyles = isDark ? 'text-neutral' : 'text-light';
        break;
      default:
        colorStyles = isDark ? 'text-neutral' : 'text-light';
    }

    return `${baseTextStyles} ${sizeStyles} ${colorStyles}`;
  };

  const getDisabledStyles = () => {
    if (disabled || loading) {
      return 'opacity-50';
    }
    return '';
  };

  const getWidthStyles = () => {
    return fullWidth ? 'w-full' : '';
  };

  const buttonStyles = [
    getVariantStyles(),
    getSizeStyles(),
    getDisabledStyles(),
    getWidthStyles(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textStyles = [getTextStyles(), textClassName].filter(Boolean).join(' ');

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={buttonStyles}
      style={[minWidth ? { minWidth } : undefined, style]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'ghost'
              ? isDark
                ? 'accent-900'
                : 'accent-900'
              : 'accent-900'
          }
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text className={`${textStyles} mx-4`} style={textStyle}>
            {title}
          </Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}
