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
  plugins: [
    function ({ addComponents }) {
      const buttons = {
        '.btn-primary': {
          'border-radius': '16px',
          background: 'linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)',
          'box-shadow': '0px 4px 80px 0px rgba(98, 132, 255, 0.20)',
          transition: 'background 0.3s ease-in-out',
        },
        '.btn-primary:hover': {
          background: 'linear-gradient(180deg, #5776E6 0%, #4362D1 100%)', // Lighter background on hover
        },
        '.btn-secondary': {
          color: '#6284FF',
          borderRadius: '16px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#6284FF',
          background: '#FFF',
          'box-shadow': '0px 4px 80px 0px rgba(98, 132, 255, 0.20)',
          padding: '1rem',
          transition: 'background 0.3s ease-in-out',
        },
        '.btn-secondary:hover': {
          backgroundColor: 'rgb(245 247 249);',
        },
      };

      addComponents(buttons, ['responsive', 'hover']);
    },
  ],
};
