module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'fredoka-one': ['Fredoka One', 'DM Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      opacity: {
        15: '.15',
      },
      colors: {
        primary: '#6284FF',
        secondary: '#407BFF',
        timer: '#1F1F1F',
        gray: {
          300: '#F5F7F9',
          400: '#DADADA',
          900: '#252628',
        },
        indigo: {
          400: '#6284FF',
        },
      },
    },
  },
  plugins: [],
};
