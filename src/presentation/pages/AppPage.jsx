import React from "react";
import { Button } from "@mui/material";
import { motion as Motion } from "framer-motion";
import {
  CalendarClock,
  LifeBuoy,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/presentation/components/layout/Navbar";
import Footer from "@/presentation/components/layout/Footer";
import SectionHead from "@/presentation/components/ui/SectionHead";
import AppScreenshots from "@/presentation/components/landing/AppScreenshots";
import heroPhone from "@/assets/hero-pg.webp";
import secondPhone from "@/assets/hero-pg2.webp";

/**
 * حلّت محل `AppInfoPage`.
 *
 * حُذفت منها أربعة أقسام كانت تكراراً حرفياً لأقسام أخرى في الموقع:
 * قائمة الخدمات (المصدر الآن `content/services`)، وخطوات الاستخدام
 * (المصدر الآن `HowItWorks` في الرئيسية)، وشبكة اللقطات الست (المصدر الآن
 * كاروسيل `AppScreenshots`)، والأسئلة الشائعة (المصدر الآن صفحة التواصل).
 * ما بقي هو ما يخص التطبيق وحده.
 */
const content = {
  ar: {
    hero: {
      eyebrow: "معلومات عن التطبيق",
      title: "خدمات سيارتك من موقعك، بدون انتظار طويل",
      accent: "مع Car Hero",
      subtitle:
        "تطبيق يساعدك على طلب المساعدة على الطريق، متابعة المزود، وحجز خدمات الصيانة الأساسية من تجربة بسيطة مصممة للسائق.",
      cta: "شاهد واجهات التطبيق",
    },
    whyTitle: "ما الذي يميّز تطبيق Car Hero؟",
    whySubtitle: "صُمم التطبيق ليقلل الحيرة وقت التعطل ويجعل طلب الخدمة أسرع وأكثر وضوحًا.",
    benefits: [
      { icon: ShieldCheck, title: "مزودون معتمدون", text: "تسجيل ومراجعة بيانات المزودين قبل استقبال الطلبات." },
      { icon: MessageCircle, title: "تواصل أوضح", text: "معلومات الطلب والمزود تظهر للمستخدم بشكل مباشر." },
      { icon: CalendarClock, title: "خدمات فورية ومجدولة", text: "اطلب طوارئ الطريق أو رتب خدمة صيانة في وقت مناسب." },
      { icon: LifeBuoy, title: "تجربة مصممة للطريق", text: "الخطوات مختصرة ومناسبة للحظات التي تحتاج فيها للمساعدة بسرعة." },
    ],
  },
  en: {
    hero: {
      eyebrow: "App Information",
      title: "Car services from your location, without the long wait",
      accent: "with Car Hero",
      subtitle:
        "The app helps drivers request roadside help, track providers, and schedule essential vehicle services through a simple mobile experience.",
      cta: "See the app screens",
    },
    whyTitle: "What sets the Car Hero app apart?",
    whySubtitle: "The app is designed to reduce uncertainty when your car stops and make requesting help faster.",
    benefits: [
      { icon: ShieldCheck, title: "Verified providers", text: "Provider data is reviewed before receiving requests." },
      { icon: MessageCircle, title: "Clear communication", text: "Request and provider details stay visible to the user." },
      { icon: CalendarClock, title: "Instant and scheduled", text: "Request roadside help or arrange maintenance for later." },
      { icon: LifeBuoy, title: "Built for the road", text: "Short steps for moments when drivers need help quickly." },
    ],
  },
};

export default function AppPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? content.ar : content.en;

  return (
    <>
      <Navbar />
      <main id="main" className="app-info-page" dir={isArabic ? "rtl" : "ltr"}>
        <section className="app-info-hero">
          <div className="section-container is-wide app-info-hero-grid">
            <Motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <span className="app-info-eyebrow">{text.hero.eyebrow}</span>
              <h1>
                {text.hero.title} <span>{text.hero.accent}</span>
              </h1>
              <p>{text.hero.subtitle}</p>
              <Button
                className="home-primary-action app-info-hero-action"
                onClick={() => document.getElementById("app-screenshots")?.scrollIntoView({ behavior: "smooth" })}
              >
                {text.hero.cta}
              </Button>
            </Motion.div>

            <Motion.div className="app-info-phone-scene" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}>
              <img className="app-info-phone-back" src={secondPhone} alt="" aria-hidden="true" width={720} height={1080} decoding="async" />
              <img className="app-info-phone-front" src={heroPhone} alt="واجهة تطبيق Car Hero" width={720} height={1080} decoding="async" />
            </Motion.div>
          </div>
        </section>

        {/* المصدر الوحيد للقطات التطبيق — كان مكرّراً كشبكة صور ثابتة هنا */}
        <AppScreenshots />

        <section className="app-info-section app-info-why-section">
          <div className="section-container is-wide">
            <SectionHead title={text.whyTitle} subtitle={text.whySubtitle} />
            <div className="app-info-benefit-grid">
              {text.benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Motion.article key={benefit.title} className="app-info-benefit-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}>
                    <Icon size={25} strokeWidth={2.3} />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </Motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
