
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

import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import i18n from "./i18n";  

import { CssBaseline, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import { themeLtr, themeRtl } from "./theme.js";

const theme = createTheme({
  typography: { fontFamily: "Poppins, sans-serif" },
});

function RootWrapper() {
  const [lang, setLang] = useState(i18n.language || "en");

  useEffect(() => {
    const handleChange = (lng) => setLang(lng);
    i18n.on("languageChanged", handleChange);
    return () => i18n.off("languageChanged", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const cache = useMemo(() => {
    return lang === "ar"
      ? createCache({
          key: "mui-rtl",
          stylisPlugins: [prefixer, rtlPlugin],
        })
      : createCache({ key: "mui" });
  }, [lang]);


  const currentTheme = lang === "ar" ? themeRtl : theme;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
