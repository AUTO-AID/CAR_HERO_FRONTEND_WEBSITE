import { createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

export const themeLtr = createTheme({
  direction: "ltr",
  typography: { fontFamily: "Poppins, sans-serif" },
});

export const themeRtl = createTheme({
  direction: "rtl",
  typography: { fontFamily: "Tajawal, sans-serif" }, // مثال: خط عربي
});

// إعدادات cache لـ emotion (سنستخدمها في main)
export const createEmotionCache = (isRtl = false) => {
  if (isRtl) {
    return {
      key: "mui-rtl",
      stylisPlugins: [prefixer, rtlPlugin],
    };
  } else {
    return {
      key: "mui",
      stylisPlugins: [],
    };
  }
};
