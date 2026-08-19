import React from "react";
import { useTranslation } from "react-i18next";

/**
 * غلاف القسم الموحّد.
 *
 * يملك ثلاثة أشياء كان كل قسم يقرّرها بنفسه: الإيقاع الرأسي، وعرض الحاوية،
 * والاتجاه. النتيجة قبل التوحيد كانت أربع حواف يسرى مختلفة وأربع قيم حشو
 * رأسي في تمرير واحد. لا يضبط أي قسم خلفيته هنا — الخلفية مسؤولية
 * `landing-section-tone` في مستوى الصفحة.
 *
 * @param {"default"|"spacious"} rhythm  الإيقاع الرأسي
 * @param {"content"|"wide"} width       عرض الحاوية (١٢٠٠ أو ١٤٤٠)
 * @param {boolean} bare                 بلا حاوية داخلية (لأقسام تدير تخطيطها)
 */
export default function Section({
  id,
  className = "",
  rhythm = "default",
  width = "content",
  bare = false,
  containerClassName = "",
  children,
  ...rest
}) {
  const { i18n } = useTranslation();
  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  const shell = ["section-shell", rhythm === "spacious" && "is-spacious", className]
    .filter(Boolean)
    .join(" ");

  const container = ["section-container", width === "wide" && "is-wide", containerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={shell} dir={dir} {...rest}>
      {bare ? children : <div className={container}>{children}</div>}
    </section>
  );
}
