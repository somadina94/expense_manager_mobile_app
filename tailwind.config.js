/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#8FCAFF',
          500: '#0061B9',
          900: '#004B90',
        },
        secondary: {
          300: '#D1C5D6',
          500: '#B27BC6',
          900: '#AB53CD',
        },
        accent: {
          300: '#C6D894',
          500: '#B1D15A',
          900: '#9CCD16',
        },
        neutral: '#FFFFFF',
        gray: {
          300: '#CDCDCD',
          500: '#5E6170',
          900: '#2F2E38',
        },
        background: {
          dark: {
            primary: '#0E0A07',
            secondary: '#1A120B',
          },
          light: {
            primary: '#F3F3F3',
            secondary: '#FFFFFF',
          },
        },
        // Text color shortcuts
        text: {
          dark: '#FFFFFF', // white
          light: 'black', // gray-500
          accent: '#9CCD16', // accent-900
          placeholder: '#5E6170', // gray-500 for input placeholders
        },
      },
      fontSize: {
        display: '48px', // Display/hero text
        'heading-xl': '32px', // Extra large heading
        'heading-lg': '24px', // Large heading
        'heading-md': '18px', // Medium heading
        body: '16px', // Default body text
        'body-sm': '14px', // Small body text
      },
    },
  },
  plugins: [],
};
