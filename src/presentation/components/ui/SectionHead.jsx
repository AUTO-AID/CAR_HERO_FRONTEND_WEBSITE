import React from "react";

/**
 * عنوان القسم الموحّد: تسمية علوية اختيارية، ثم h2، ثم نص فرعي.
 *
 * كل قسم كان يبني رأسه بنفسه بحجم خط مكتوب يدوياً (٤٤ أو ٤٨ أو ٤٠ أو ٣٦
 * بكسل لنفس المستوى الهرمي) ووسم يُختار بحسب الحجم المرغوب لا بحسب البنية —
 * فكان تسلسل العناوين في الصفحة الواحدة يقفز h1 ← h2 ← h4 ← h3 ← h4.
 * هنا الوسم دائماً h2 والحجم من الرمز `--fs-h2`.
 */
export default function SectionHead({ eyebrow, title, subtitle, align = "center", id, as = "h2" }) {
  // الوسم `h2` هو الافتراضي لأنه الصحيح لعنوان قسم. لكن صفحتَي «الخدمات»
  // و«الأسعار» كانتا تبدآن من h2 مباشرةً بلا h1 إطلاقاً: لا عنوان أوّل
  // للصفحة في تسلسل العناوين، فقارئ الشاشة يقفز إلى قسم بلا معرفة موضوعها.
  // القسم الأوّل في تلك الصفحات يمرّر as="h1".
  const Heading = as;
  return (
    <div className={`section-head ${align === "start" ? "is-start" : ""}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <Heading className="section-title" id={id}>{title}</Heading>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
