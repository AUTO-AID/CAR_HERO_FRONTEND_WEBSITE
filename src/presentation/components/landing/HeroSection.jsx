import React from "react";
import { Box, Button, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { Android, Handshake, KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeroTrustStrip from "@/presentation/components/landing/HeroTrustStrip";
import roadBg from "@/assets/header-bg.webp";
import roadBgSmall from "@/assets/header-bg-sm.webp";
import sideImg from "@/assets/hero-pg.webp";
import backImg from "@/assets/hero-pg2.webp";

const heroCopy = {
  ar: {
    title: "Car Hero",
    // العنوان الأول يحمل الوعد لا الاسم وحده: محرّكات البحث وقارئ الشاشة
    // يقرآن «Car Hero» فقط فلا يعرفان ما الذي تقدّمه الصفحة.
    tagline: "مساعدة الطريق تصل إليك أينما كنت",
    subtitle: "اطلب خدمة لسيارتك من موقعك، وسيصلك أقرب مزود متاح بسرعة.",
    primary: "تعرّف على التطبيق",
    secondary: "انضم كمزود",
    providerTooltip: "سجّل ورشتك أو خدمتك لتستقبل طلبات السائقين عبر Car Hero.",
    scrollCue: "كيف تعمل الخدمة",
  },
  en: {
    title: "Car Hero",
    tagline: "Roadside help that reaches you wherever you are",
    subtitle: "A platform that connects drivers with the nearest available provider for roadside emergencies and scheduled vehicle services.",
    primary: "Explore the app",
    secondary: "Join as Provider",
    providerTooltip: "Register your workshop or service to receive driver requests through Car Hero.",
    scrollCue: "See how it works",
  },
};

const HeroSection = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? heroCopy.ar : heroCopy.en;
  // الطفو اللانهائي يُوقَف لمن يطلب تقليل الحركة — لا يكفي إيقافه في CSS
  // لأن framer-motion يكتب التحويل مباشرةً على النمط السطري.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const float = (distance, duration) => (reducedMotion ? {} : { y: [0, distance, 0], transition: { duration, repeat: Infinity, ease: "easeInOut" } });

  return (
    <Box
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
      sx={{
        maxWidth: "100%",
        // نسخة الجوال ٣٧ ك.ب مقابل ١٥٣ للنسخة العريضة — والصورة تقع خلف
        // تدرّج معتم بنسبة ٧٥٪ فلا يُلحَظ فرق التفاصيل أصلاً.
        backgroundImage: `linear-gradient(135deg, rgba(13, 8, 21, 0.72), rgba(80, 38, 116, 0.78)), url(${roadBgSmall})`,
        "@media (min-width: 900px)": {
          backgroundImage: `linear-gradient(135deg, rgba(13, 8, 21, 0.72), rgba(80, 38, 116, 0.78)), url(${roadBg})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "var(--text-light)",
        minHeight: "min(860px, 100dvh)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        // الحشوة السفلية تحجز مكان إشارة التمرير فلا تركب على شريط الثقة
        padding: { xs: "112px 0 56px", md: "118px 0 104px" },
      }}
    >
      {/* الحاوية من الرمز الموحّد: حافة Hero اليسرى صارت على محاذاة حواف
          الأقسام العريضة تحتها بدل أن تنفرد بـ maxWidth="xl" وحشوة خاصة */}
      <Box
        className="section-container is-wide"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 0.95fr) minmax(420px, 0.8fr)" },
          alignItems: "center",
          gap: { xs: 5, lg: 8 },
          zIndex: 2,
        }}
      >
        <Box sx={{ maxWidth: 720, textAlign: { xs: "center", lg: isArabic ? "right" : "left" } }}>
          <Motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography
              component="h1"
              className="hero-brand-title"
              sx={{
                fontSize: { xs: "3.2rem", sm: "4.3rem", lg: "6.1rem" },
                lineHeight: 0.95,
                fontWeight: 700,
                letterSpacing: 0,
                mb: 2.5,
              }}
            >
              <span className="hero-brand-word">{text.title}</span>
              {/* الوعد جزء من h1 دلالياً، وبحجم يناسب دوره بصرياً */}
              <span className="hero-tagline">{text.tagline}</span>
            </Typography>

            <Typography
              className={isArabic ? "hero-subtitle-text hero-subtitle-text-rtl" : "hero-subtitle-text"}
              dir={isArabic ? "rtl" : "ltr"}
              sx={{
                maxWidth: 650,
                mx: { xs: "auto", lg: 0 },
                color: "rgba(255,255,255,0.82)",
                fontSize: { xs: "1.05rem", md: "1.28rem" },
                lineHeight: 1.9,
                fontWeight: 600,
              }}
            >
              {text.subtitle}
            </Typography>
          </Motion.div>

          <Motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.65 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: { xs: "center", lg: "flex-start" },
                gap: 1.5,
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                startIcon={<Android />}
                className="hero-main-button"
                onClick={() => navigate("/app")}
              >
                {text.primary}
              </Button>
              <Tooltip title={text.providerTooltip} arrow placement="top" enterDelay={250}>
                <Button
                  variant="outlined"
                  startIcon={<Handshake />}
                  className="hero-outline-button"
                  onClick={() => navigate("/register")}
                >
                  {text.secondary}
                </Button>
              </Tooltip>
            </Box>
          </Motion.div>

          {/* الدليل قبل الطلب: أربعة مؤشّرات فوق الطيّة بدل أن ينتظر الزائر
              ثلاثة آلاف بكسل من التمرير ليصل إلى أول سبب للثقة */}
          <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }}>
            <HeroTrustStrip />
          </Motion.div>
        </Box>

        <Box className="hero-visual-wrap">
          <Motion.div
            className="hero-phone-back"
            initial={{ opacity: 0, y: 42, rotate: -7 }}
            animate={{ opacity: 0.72, rotate: -7, ...float(-12, 5) }}
            transition={{ opacity: { duration: 0.65 }, y: reducedMotion ? {} : { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Box component="img" src={backImg} alt="" aria-hidden="true" width={720} height={1080} fetchPriority="high" decoding="async" />
          </Motion.div>
          <Motion.div
            className="hero-phone-front"
            initial={{ opacity: 0, y: 42, rotate: 3 }}
            animate={{ opacity: 1, rotate: 3, ...float(-10, 4.5) }}
            transition={{ opacity: { duration: 0.65, delay: 0.1 }, y: reducedMotion ? {} : { duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
          >
            <Box component="img" src={sideImg} alt="" aria-hidden="true" width={720} height={1080} fetchPriority="high" decoding="async" />
          </Motion.div>
        </Box>
      </Box>

      {/* إشارة أن تحت الطيّة محتوى: الـHero يملأ الشاشة كاملة فلا حافة مقطوعة
          تدل على الاستمرار. الرابط حقيقي ويعمل بلوحة المفاتيح. */}
      <Box
        component="a"
        href="#how-it-works"
        className="hero-scroll-cue"
        aria-label={text.scrollCue}
      >
        <span>{text.scrollCue}</span>
        <KeyboardArrowDown fontSize="small" aria-hidden="true" />
      </Box>
    </Box>
  );
};

export default HeroSection;
