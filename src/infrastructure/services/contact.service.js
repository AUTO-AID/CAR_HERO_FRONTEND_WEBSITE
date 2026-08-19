import { apiClient } from "@/infrastructure/api/client";

/**
 * إرسال رسالة التواصل.
 *
 * كان `handleSubmit` ينتظر ثانيةً عبر `setTimeout` ثم يعرض «تم الإرسال
 * بنجاح ✓» ويمسح الحقول — بلا أي استدعاء شبكة. كل رسالة كتبها زائر كانت
 * تُفقَد بينما يُقال له إنها وصلت.
 *
 * لا توجد نقطة نهاية للتواصل في الخلفية حتى الآن، فالسلوك هنا صريح:
 *   • إن ضُبط `VITE_CONTACT_ENDPOINT` → إرسال حقيقي بحالات خطأ حقيقية.
 *   • وإلا → يُفتح بريد المستخدم برسالة معبّأة، ويُخبَر بذلك صراحةً.
 * لا حالة نجاح تُعرض دون أن يصل شيء فعلاً.
 */
export const CONTACT_EMAIL = "support@carhero.app";

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "";

export const hasContactEndpoint = Boolean(endpoint);

export async function sendContactMessage(payload) {
  if (!endpoint) {
    throw new Error("NO_ENDPOINT");
  }
  return apiClient.post(endpoint, payload);
}

/** رابط بريد معبّأ بمحتوى النموذج — المسار البديل حين لا توجد نقطة نهاية. */
export function buildMailtoLink({ name, email, phone, reason, message }, isArabic) {
  const subject = isArabic
    ? `رسالة من الموقع${reason ? ` — ${reason}` : ""}`
    : `Website message${reason ? ` — ${reason}` : ""}`;

  const lines = isArabic
    ? [
        `الاسم: ${name}`,
        `البريد: ${email}`,
        phone ? `الهاتف: ${phone}` : null,
        reason ? `سبب التواصل: ${reason}` : null,
        "",
        message,
      ]
    : [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        reason ? `Reason: ${reason}` : null,
        "",
        message,
      ];

  const body = lines.filter((line) => line !== null).join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
