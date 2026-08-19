import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import StatisticsSection from "@/presentation/components/landing/StatisticsSection";
import TestimonialsSection from "@/presentation/components/landing/TestimonialsSection";
import Section from "@/presentation/components/ui/Section";
import SectionHead from "@/presentation/components/ui/SectionHead";

/**
 * شريط الثقة: الأرقام ثم الآراء تحت عنوان واحد.
 *
 * كانا قسمين كاملين متتاليين، لكل منهما عنوانه ونصه الفرعي وحشوته الرأسية —
 * وهما يخدمان الغرض ذاته (إقناع الزائر بأن الخدمة حقيقية ومستخدَمة). فصلهما
 * كان يمطّط الصفحة ويكرّر النبرة مرتين متتاليتين.
 */
const copy = {
  ar: {
    eyebrow: "الثقة بالأرقام والتجربة",
    title: "سائقون يستخدمون Car Hero فعلاً",
    subtitle: "أرقام محدّثة من المنصة، وتجارب حقيقية من مستخدمين طلبوا الخدمة على الطريق.",
    // نصّ بديل حين تتعذّر الأرقام: العنوان لا يَعِد بما لن يظهر
    subtitleNoStats: "تجارب من مستخدمين طلبوا الخدمة على الطريق.",
  },
  en: {
    eyebrow: "Trusted in numbers and in practice",
    title: "Drivers who actually use Car Hero",
    subtitle: "Live figures from the platform, and real experiences from users who requested help on the road.",
    subtitleNoStats: "Experiences from users who requested help on the road.",
  },
};

export default function TrustSection() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;
  const [statsUnavailable, setStatsUnavailable] = useState(false);

  const handleUnavailable = useCallback((unavailable) => {
    setStatsUnavailable(unavailable);
  }, []);

  return (
    <Section id="trust" width="wide">
      <SectionHead
        eyebrow={text.eyebrow}
        title={text.title}
        subtitle={statsUnavailable ? text.subtitleNoStats : text.subtitle}
      />

      <div className="trust-stack">
        <StatisticsSection hideHeader onUnavailable={handleUnavailable} />
        <TestimonialsSection hideHeader />
      </div>
    </Section>
  );
}
