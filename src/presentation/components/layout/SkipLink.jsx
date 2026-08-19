import React from "react";
import { useTranslation } from "react-i18next";

/**
 * أول عنصر يستقبل التركيز في الصفحة. يقفز إلى `#main` مباشرةً بدل إجبار
 * مستخدم لوحة المفاتيح على المرور بشريط التنقل كاملاً في كل صفحة.
 *
 * يُستخدم `href` لا `navigate` عمداً: القفز داخل الصفحة الحالية لا يغيّر
 * المسار، ومتصفّحات القراءة تنقل التركيز تلقائياً عند الوصول للمرساة.
 */
export default function SkipLink() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <a className="skip-link" href="#main">
      {isArabic ? "تخطَّ إلى المحتوى الرئيسي" : "Skip to main content"}
    </a>
  );
}
