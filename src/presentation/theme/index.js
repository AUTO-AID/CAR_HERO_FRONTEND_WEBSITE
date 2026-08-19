import { createTheme } from "@mui/material/styles";

export const getTheme = (mode, direction = "ltr") => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#a57ed8' : '#8f5cb1',
        light: '#c9a7e3',
        dark: '#6a1b9a',
      },
      background: {
        default: isDark ? '#0d0815' : '#ffffff',
        paper: isDark ? '#1a1229' : '#ffffff',
      },
    },
    direction,
    typography: {
      fontFamily: direction === "rtl" 
        ? "'IBM Plex Sans Arabic', 'Tajawal', sans-serif" 
        : "'Poppins', 'Inter', sans-serif",
      h1: { fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 700, letterSpacing: '-0.01em' },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 16,
    },
    shadows: [
      'none',
      '0 2px 12px rgba(26, 26, 46, 0.08)',
      '0 4px 16px rgba(26, 26, 46, 0.1)',
      '0 6px 20px rgba(26, 26, 46, 0.12)',
      '0 8px 30px rgba(26, 26, 46, 0.12)',
      '0 10px 35px rgba(26, 26, 46, 0.14)',
      '0 12px 40px rgba(143, 92, 177, 0.15)',
      '0 14px 42px rgba(143, 92, 177, 0.18)',
      '0 16px 48px rgba(143, 92, 177, 0.2)',
      ...Array(16).fill('0 20px 60px rgba(26, 26, 46, 0.18)'),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '12px',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          containedPrimary: {
            background: isDark
              ? 'linear-gradient(135deg, #a57ed8 0%, #7b3fa0 100%)'
              : 'linear-gradient(135deg, #8f5cb1 0%, #6a1b9a 100%)',
            boxShadow: '0 6px 24px rgba(143, 92, 177, 0.35)',
            '&:hover': {
              boxShadow: '0 10px 32px rgba(143, 92, 177, 0.45)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '20px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: '10px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
};
