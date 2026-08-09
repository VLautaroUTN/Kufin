import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366F1', // Indigo
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#10B981', // Emerald / Green
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#080B11', // Dark obsidian
      paper: '#111827', // Charcoal
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#080B11',
          scrollbarColor: 'rgba(99, 102, 241, 0.2) rgba(8, 11, 17, 0.5)',
        },
      },
    },
  },
});