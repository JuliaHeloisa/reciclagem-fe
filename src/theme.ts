import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#6e9987',
          surface: '#6e9987',
        },
        primary: {
          500: '#114d4d',
          solidBg: '#114d4d',
          solidColor: '#e0e4ce',
        },
        neutral: {
          100: '#e0e4ce',
          300: '#6e9987',
        },
        text: {
          primary: '#6c7710',
        },
      },
    },
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#6e9987',
          color: '#27191c',
          '--Input-placeholderColor': '#27191c',
          '--Input-focusedHighlight': '#114d4d',
          borderColor: '#114d4d',
        },
      },
    },
  },
  fontFamily: {
    body: 'Inter, system-ui, sans-serif',
  },
});

export default theme;
