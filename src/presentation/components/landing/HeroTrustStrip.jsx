import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, MapPin, ShieldCheck, Timer } from "lucide-react";
import { getPublicStatistics } from "@/infrastructure/services/providers.service";

const copy = {
  ar: {
    alwaysOn: "على مدار الساعة",
    alwaysOnNote: "طلبات الطوارئ تُستقبل ليلاً ونهاراً",
    coverage: "كل المحافظات",
    coverageNote: "تغطية تتوسّع باستمرار",
    coverageLive: (n) => `${n} محافظة مغطّاة`,
    verified: "مزوّدون موثّقون",
    verifiedNote: "كل مزوّد يمرّ بمراجعة قبل قبوله",
    verifiedLive: (n) => `+${n} مزوّد موثّق`,
    response: "وصول سريع",
    responseNote: "يُوجَّه طلبك إلى أقرب مزوّد متاح",
    responseLive: (n) => `${n} دقيقة وسطياً`,
    label: "مؤشّرات الخدمة",
  },
  en: {
    alwaysOn: "Around the clock",
    alwaysOnNote: "Emergency requests are taken day and night",
    coverage: "Every governorate",
    coverageNote: "Coverage keeps expanding",
    coverageLive: (n) => `${n} governorates covered`,
    verified: "Verified providers",
    verifiedNote: "Every provider is reviewed before approval",
    verifiedLive: (n) => `${n}+ verified providers`,
    response: "Fast arrival",
    responseNote: "Your request goes to the nearest available provider",
    responseLive: (n) => `${n} min average`,
    label: "Service indicators",
  },
};

/**
 * شريط الثقة أسفل دعوة Hero.
 *
 * كان كل دليل ثقة في الصفحة (الأرقام والآراء) يقع بعد ثلاثة آلاف بكسل من
 * التمرير، أي أن الزائر يُطلب منه الضغط على «تعرّف على التطبيق» قبل أن يرى
 * سبباً واحداً للثقة. الشريط هنا يرفع أربعة مؤشّرات فوق الطيّة.
 *
 * كل عنصر يحمل صياغة ثابتة صحيحة دائماً (لا رقم مُختلَق)، وتُستبدل بصياغة
 * رقمية فقط حين تصل الأرقام الحيّة فعلاً. فشل النداء لا يترك فراغاً.
 */
export default function HeroTrustStrip() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const [live, setLive] = useState(null);

  useEffect(() => {
    let active = true;
    getPublicStatistics()
      .then((response) => {
        const data = response?.data?.data ?? response?.data ?? response;
        if (!active || !data || typeof data !== "object") return;
        setLive({
          areas: Number(data.coveredAreas ?? data.cities ?? data.governorates ?? 0),
          providers: Number(data.approvedProviders ?? data.providers ?? data.totalProviders ?? 0),
          minutes: Number(data.averageResponseMinutes ?? data.responseTime ?? 0),
        });
      })
      .catch(() => {
        /* الصياغة الثابتة تبقى معروضة — لا فراغ ولا رقم مُختلَق */
      });
    return () => { active = false; };
  }, []);

  const items = [
    { icon: Clock, title: text.alwaysOn, note: text.alwaysOnNote },
    {
      icon: MapPin,
      title: live?.areas ? text.coverageLive(live.areas) : text.coverage,
      note: text.coverageNote,
    },
    {
      icon: ShieldCheck,
      title: live?.providers ? text.verifiedLive(live.providers.toLocaleString("en-US")) : text.verified,
      note: text.verifiedNote,
    },
    {
      icon: Timer,
      title: live?.minutes ? text.responseLive(live.minutes) : text.response,
      note: text.responseNote,
    },
  ];

  return (
    <ul className="hero-trust-strip" aria-label={text.label}>
      {items.map((item) => {
        // كإسناد لا كتفكيك في المعاملات: قاعدة no-unused-vars هنا تتجاهل
        // الأسماء الكبيرة في التصريحات فقط، ولا إضافة لـeslint-plugin-react
        // تعرّف استعمال المعرّف داخل JSX.
        const Icon = item.icon;
        return (
          <li className="hero-trust-item" key={item.note}>
            <span className="hero-trust-icon" aria-hidden="true">
              <Icon size={18} strokeWidth={2.4} />
            </span>
            <span className="hero-trust-text">
              <strong>{item.title}</strong>
              <span>{item.note}</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
