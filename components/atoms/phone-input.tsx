import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

interface Country {
  name: string;
  callingCode: string;
  flag: string;
  code: string;
}

interface PhoneInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  label?: string;
  value?: string;
  onChangeText: (value: string) => void;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

// Common countries to show first (no API call needed for these)
const COMMON_COUNTRIES: Country[] = [
  { name: 'United States', callingCode: '+1', flag: '🇺🇸', code: 'US' },
  { name: 'United Kingdom', callingCode: '+44', flag: '🇬🇧', code: 'GB' },
  { name: 'Canada', callingCode: '+1', flag: '🇨🇦', code: 'CA' },
  { name: 'Nigeria', callingCode: '+234', flag: '🇳🇬', code: 'NG' },
  { name: 'Ghana', callingCode: '+233', flag: '🇬🇭', code: 'GH' },
  { name: 'South Africa', callingCode: '+27', flag: '🇿🇦', code: 'ZA' },
];

export default function PhoneInput({
  label,
  value = '',
  onChangeText,
  error,
  containerClassName = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  ...props
}: PhoneInputProps) {
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COMMON_COUNTRIES[0]);
  const [countries, setCountries] = useState<Country[]>(COMMON_COUNTRIES);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Extract country code and phone number from value
  useEffect(() => {
    if (value && countries.length > 0) {
      // Try to find country code in value
      const foundCountry = countries.find((country) => value.startsWith(country.callingCode));
      if (foundCountry) {
        setSelectedCountry(foundCountry);
        setPhoneNumber(value.replace(foundCountry.callingCode, '').trim());
      } else {
        setPhoneNumber(value);
      }
    } else if (!value) {
      setPhoneNumber('');
    }
  }, [value, countries]);

  // Fetch all countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,idd');
        const allCountries: Country[] = response.data
          .map((country: any) => {
            const callingCode = country.idd?.root
              ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
              : null;
            if (!callingCode) return null;

            return {
              name: country.name.common,
              callingCode,
              flag: country.cca2
                ? String.fromCodePoint(
                    ...country.cca2
                      .toUpperCase()
                      .split('')
                      .map((char: string) => 127397 + char.charCodeAt(0))
                  )
                : '🌍',
              code: country.cca2,
            };
          })
          .filter((country: Country | null) => country !== null)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

        // Merge common countries at the top
        const mergedCountries = [
          ...COMMON_COUNTRIES,
          ...allCountries.filter(
            (country) => !COMMON_COUNTRIES.some((cc) => cc.code === country.code)
          ),
        ];
        setCountries(mergedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        // Fallback to common countries if API fails
        setCountries(COMMON_COUNTRIES);
      }
    };

    fetchCountries();
  }, []);

  const handlePhoneChange = (text: string) => {
    // Only allow digits, spaces, dashes, and parentheses
    const cleaned = text.replace(/[^\d\s\-()]/g, '');
    setPhoneNumber(cleaned);
    onChangeText(`${selectedCountry.callingCode}${cleaned}`);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    onChangeText(`${country.callingCode}${phoneNumber}`);
    setIsCountryPickerOpen(false);
  };

  return (
    <View className={`${containerClassName} w-full`}>
      {label && (
        <Text
          className={`mb-2 text-sm font-medium text-text-light dark:text-text-dark ${labelClassName}`}>
          {label}
        </Text>
      )}
      <View className="relative flex-row">
        {/* Country Code Selector */}
        <TouchableOpacity
          onPress={() => setIsCountryPickerOpen(true)}
          className={`
            mr-2 flex-row items-center justify-center rounded-lg border bg-neutral px-3 py-3
            dark:bg-background-dark-secondary
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
          `}>
          <Text className="mr-1 text-lg">{selectedCountry.flag}</Text>
          <Text className="text-body text-text-light dark:text-text-dark">
            {selectedCountry.callingCode}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#5E6170" className="ml-1" />
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          className={`
            flex-1 rounded-lg border bg-neutral px-4 py-3 
            text-text-light 
            focus:outline-none 
            dark:bg-background-dark-secondary dark:text-text-dark
            ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}
            ${inputClassName}
          `}
          placeholderTextColor="#5E6170"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          {...props}
        />
      </View>

      {error && <Text className={`mt-1 text-sm text-red-500 ${errorClassName}`}>{error}</Text>}

      {/* Country Picker Modal */}
      <Modal
        visible={isCountryPickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCountryPickerOpen(false)}>
        <View className="flex-1 bg-black/50">
          <View className="absolute bottom-0 left-0 right-0 max-h-[70%] rounded-t-3xl bg-neutral dark:bg-background-dark-secondary">
            <View className="border-b border-gray-300 px-4 py-3 dark:border-gray-700">
              <View className="flex-row items-center justify-between">
                <Text className="text-heading-md text-text-light dark:text-text-dark">
                  Select Country
                </Text>
                <TouchableOpacity onPress={() => setIsCountryPickerOpen(false)}>
                  <Ionicons name="close" size={24} color="#5E6170" />
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => {
                const isSelected = item.code === selectedCountry.code;
                return (
                  <TouchableOpacity
                    onPress={() => handleCountrySelect(item)}
                    className={`
                      border-b border-gray-200 px-4 py-4
                      dark:border-gray-700
                      ${isSelected ? 'bg-accent-500/10' : ''}
                    `}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1 flex-row items-center">
                        <Text className="mr-3 text-2xl">{item.flag}</Text>
                        <Text
                          className={`flex-1 text-body ${
                            isSelected
                              ? 'font-semibold text-accent-500'
                              : 'text-text-light dark:text-text-dark'
                          }`}>
                          {item.name}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text
                          className={`mr-2 text-body ${
                            isSelected
                              ? 'font-semibold text-accent-500'
                              : 'text-text-light dark:text-text-dark'
                          }`}>
                          {item.callingCode}
                        </Text>
                        {isSelected && <Ionicons name="checkmark" size={20} color="#9CCD16" />}
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
