/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'float-slow': 'float 3s ease-in-out infinite',
        'float-medium': 'float 2s ease-in-out infinite',
        'float-fast': 'float 2s ease-in-out infinite',
      },
    },
     primary: {
        500: '#3b82f6', // Tailwind's blue-500
        600: '#2563eb', // Tailwind's blue-600
      },
      secondary: {
        600: '#4b5563', // Tailwind's gray-600
        900: '#111827', // Tailwind's gray-900
      }
  },
  plugins: [],
};
