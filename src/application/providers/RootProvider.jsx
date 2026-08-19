import { useEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import App from "@/App.jsx";
import i18n from "@/infrastructure/i18n";
import { ColorModeContext } from "@/application/contexts/color-mode.context";
import { getTheme } from "@/presentation/theme/index.js";

export default function RootProvider() {
  const [lang, setLang] = useState(i18n.language || "ar");
  // كان الوضع الداكن افتراضياً دائماً ويتجاهل تفضيل النظام. السكربت في
  // <head> يضبط data-theme قبل الرسم، وهنا نقرأ القرار ذاته لا نناقضه.
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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
    [],
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

  // Poppins يخدم الواجهة الإنجليزية وحدها. تحميله في HTML الأولي كان
  // يكلّف كل زائر عربي — وهم الأغلبية — ستّة ملفات خط لا يظهر منها شيء.
  useEffect(() => {
    if (lang === "ar" || document.getElementById("latin-font")) return;
    const link = document.createElement("link");
    link.id = "latin-font";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const cache = useMemo(() => {
    return lang === "ar"
      ? createCache({
          key: "mui-rtl",
          stylisPlugins: [prefixer, rtlPlugin],
        })
      : createCache({ key: "mui" });
  }, [lang]);

  const theme = useMemo(
    () => getTheme(mode, lang === "ar" ? "rtl" : "ltr"),
    [mode, lang],
  );

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
