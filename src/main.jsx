
// import React, { useEffect, useMemo, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "./i18n.js";
// import i18n from "./i18n.next";
// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { themeLtr, themeRtl, createEmotionCache } from "./theme.js";

// const theme = createTheme({
//   typography: { fontFamily: "Poppins, sans-serif" },
// });

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <App />
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React, { useEffect, useMemo, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import i18n from "./i18n";  

import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { getTheme } from "./theme.js";

// Context for theme toggle
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function RootWrapper() {
  const [lang, setLang] = useState(i18n.language || "en");
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const handleChange = (lng) => setLang(lng);
    i18n.on("languageChanged", handleChange);
    return () => i18n.off("languageChanged", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const cache = useMemo(() => {
    return lang === "ar"
      ? createCache({
          key: "mui-rtl",
          stylisPlugins: [prefixer, rtlPlugin],
        })
      : createCache({ key: "mui" });
  }, [lang]);

  const theme = useMemo(() => getTheme(mode, lang === "ar" ? "rtl" : "ltr"), [mode, lang]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
