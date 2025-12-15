import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  DimensionValue,
  useColorScheme,
  GestureResponderEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  minWidth?: DimensionValue;

  /** Icon props */
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;

  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function IconButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  minWidth,

  iconName,
  iconSize,
  iconColor,

  className = '',
  textClassName = '',
  style,
  textStyle,
}: ButtonProps) {
  const isDark = useColorScheme() === 'dark';

  /* ---------------------------------- Styles --------------------------------- */

  const getVariantStyles = () => {
    const base = 'rounded-lg flex-row items-center justify-center';

    switch (variant) {
      case 'primary':
        return `${base} bg-primary-900`;
      case 'secondary':
        return `${base} ${
          isDark
            ? 'bg-background-dark-secondary border border-gray-600'
            : 'bg-gray-100 border border-gray-300'
        }`;
      case 'outline':
        return `${base} border border-primary-900 bg-transparent`;
      case 'ghost':
        return `${base} ${
          isDark ? 'bg-background-dark-secondary' : 'bg-background-light-secondary'
        }`;
      case 'danger':
        return `${base} ${isDark ? 'bg-red-600' : 'bg-red-500'}`;
      default:
        return `${base} bg-primary-900`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 min-h-[36px]';
      case 'md':
        return 'px-4 py-3 min-h-[44px]';
      case 'lg':
        return 'px-6 py-4 min-h-[52px]';
      default:
        return 'px-4 py-3 min-h-[44px]';
    }
  };

  const getTextStyles = () => {
    const base = 'font-semibold';

    const sizeStyle = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';

    const colorStyle =
      variant === 'outline' || variant === 'ghost'
        ? isDark
          ? 'text-neutral'
          : 'text-light'
        : 'text-white';

    return `${base} ${sizeStyle} ${colorStyle}`;
  };

  const getIconSize = () => {
    if (iconSize) return iconSize;
    return size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  };

  const getIconColor = () => {
    if (iconColor) return iconColor;
    return variant === 'outline' || variant === 'ghost'
      ? isDark
        ? '#E5E7EB'
        : '#1F2937'
      : '#FFFFFF';
  };

  const buttonStyles = [
    getVariantStyles(),
    getSizeStyles(),
    (disabled || loading) && 'opacity-50',
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textStyles = [getTextStyles(), textClassName].filter(Boolean).join(' ');

  /* --------------------------------- Render ---------------------------------- */

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
        <ActivityIndicator size="small" />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={getIconSize()}
              color={getIconColor()}
              style={{ marginRight: 8 }}
            />
          )}

          <Text className={textStyles} style={textStyle}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
