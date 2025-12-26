import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

export const getTheme = (mode, direction = "ltr") => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#a071ff' : '#8f5cb1',
      },
      background: {
        default: mode === 'dark' ? '#1e1a2c' : '#ffffff',
        paper: mode === 'dark' ? '#2d283e' : '#f9f8fd',
      },
    },
    direction,
    typography: {
      fontFamily: direction === "rtl" ? "Tajawal, sans-serif" : "Poppins, sans-serif",
    },
  });
};

// Keeping these for backward compatibility if needed, but getTheme is preferred
export const themeLtr = createTheme({
  direction: "ltr",
  typography: { fontFamily: "Poppins, sans-serif" },
});

export const themeRtl = createTheme({
  direction: "rtl",
  typography: { fontFamily: "Tajawal, sans-serif" },
});
