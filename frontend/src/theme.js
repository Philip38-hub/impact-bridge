import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#008080',
      dark: '#006666',
    },
    secondary: {
      main: '#FF6F3C',
      dark: '#E65A2C',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
  },
});

export default theme;
