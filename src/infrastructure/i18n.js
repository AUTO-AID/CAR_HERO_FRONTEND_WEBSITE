import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./locales/ar/translation.json";
import en from "./locales/en/translation.json";

// كان `lng: "ar"` مثبّتاً، فيُهمَل اختيار المستخدم عند كل تحديث للصفحة.
// الكاشف يقرأ من التخزين المحلي أولاً ثم لغة المتصفح، ويحفظ أي تبديل.
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    supportedLngs: ["ar", "en"],
    load: "languageOnly",
    fallbackLng: "ar",
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "lang",
      caches: ["localStorage"],
      // المكوّنات تقارن `i18n.language === "ar"` مباشرةً، فلا بد أن يصل
      // «ar-SY» و«en-US» مقصوصَين إلى «ar» و«en» وإلا سقط الجميع للاحتياطي.
      convertDetectedLanguage: (lng) => lng.split("-")[0],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
