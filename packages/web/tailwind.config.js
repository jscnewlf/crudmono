module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          900: '#2B2B63',
          700: '#6236FF',
          600: '#6C3CF5',
          500: '#6C85F4',
          300: '#DED3FD',
          200: '#E8E2FF',
          100: '#F4F0FF',
          111: '#653CFD',
        },
        'secondary': {
          900: '#0063AD',
          600: '#6CCAF3'
        },
        'tertiary': {
          500: 'rgb(77, 170, 192, .20)',
          300: '#B0CBAE',
          200: '#E6F6E5',
          100: '#E6F2F5'
        },
        'alert': {
          900: '#790E0E',
          700: '#AC1919',
          300: '#FF5252'
        },
        'gradient': {
          'top': '#6CDBF3',
          'bottom': '#6C33F5'
        },
        'gray': {
          400: '#707070',
          300: '#424B4F',
          200: '#D5D5D5',
          100: '#6D7278'
        },
        'statusItem': {
          'ativo': '#E6F6E5',
          'standby': '#f7b5004d',
          'inativo': '#fa000033'
        },
        'filtroSelect': {
          'ativo': '#DED3FD',
          'inativo': '#FAF9FF'
        },
        'status': {
          'online': '#6DD400',
          'away': '#F0C859',
          'offline': '#707070',
          'occupied': '#E02020'
        },
      },
      boxShadow: {
        'primary-600-3xl': '.5rem .5rem 2rem 0 rgba(108, 60, 245, 0.2)',
        'primary-600-1xl': '0 0 1rem 0 rgba(108, 60, 245, 0.2)',
        'primary-600': '0 .3rem .5rem -4px rgba(108, 60, 245, 0.01)',
        'primary-light': '0 0 1rem 0 rgba(108, 60, 245, 0.2), 0 4px 6px -4px rgba(108, 60, 245, 0.2)',
        'input-light': '0 0 .75rem 0 rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'input-light-active': '0 0 .75rem 0 rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'inset-filter': 'inset 0px -40px 20px -20px rgba(241, 236, 254, 1)',
      }
    },
  },
  plugins: [],
}

