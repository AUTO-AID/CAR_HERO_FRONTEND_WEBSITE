import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Chip, useMediaQuery } from "@mui/material";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SectionHead from "@/presentation/components/ui/SectionHead";
import {
  ChevronLeft,
  ChevronRight,
  MobileScreenShare,
  AutoAwesome,
  Pause,
  PlayArrow,
} from "@mui/icons-material";

import shotOnboarding from "@/assets/app-screens/01-onboarding.webp";
import shotHome from "@/assets/app-screens/02-home.webp";
import shotServices from "@/assets/app-screens/03-services.webp";
import shotServiceDetail from "@/assets/app-screens/04-service-detail.webp";
import shotPickLocation from "@/assets/app-screens/05-pick-location.webp";
import shotConfirmOrder from "@/assets/app-screens/06-confirm-order.webp";
import shotProviderFound from "@/assets/app-screens/07-provider-found.webp";
import shotLiveTracking from "@/assets/app-screens/08-live-tracking.webp";
import shotProviderProfile from "@/assets/app-screens/09-provider-profile.webp";
import shotOffers from "@/assets/app-screens/10-offers.webp";

const appScreenshots = [
  { src: shotOnboarding, ar: "البداية", en: "Welcome" },
  { src: shotHome, ar: "الرئيسية", en: "Home" },
  { src: shotServices, ar: "دليل الخدمات", en: "Service catalogue" },
  { src: shotServiceDetail, ar: "تفاصيل الخدمة", en: "Service details" },
  { src: shotPickLocation, ar: "تحديد الموقع", en: "Pin your location" },
  { src: shotConfirmOrder, ar: "تأكيد الطلب", en: "Confirm the order" },
  { src: shotProviderFound, ar: "قبول الطلب", en: "Request accepted" },
  { src: shotLiveTracking, ar: "تتبّع مباشر", en: "Live tracking" },
  { src: shotProviderProfile, ar: "ملف المزوّد وتقييماته", en: "Provider profile" },
  { src: shotOffers, ar: "العروض والكوبونات", en: "Offers and coupons" },
];

/** مرئي لقارئ الشاشة فقط — يمنح العدّاد سياقاً بدل رقمين مجرّدين. */
const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const AppScreenshots = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // كان التشغيل التلقائي يبدأ دائماً وبلا زر إيقاف — مخالفة WCAG 2.2.2
  // لكل محتوى متحرّك تلقائياً لأكثر من خمس ثوانٍ. الآن: لا يبدأ أصلاً لمن
  // يطلب تقليل الحركة، ويتوقّف عند التحويم أو دخول التركيز، وله زر ظاهر.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [isAutoPlaying, setIsAutoPlaying] = useState(!reducedMotion);
  const [isPaused, setIsPaused] = useState(false);
  const isRtl = i18n.language === "ar";
  const prevLabel = isRtl ? "اللقطة السابقة" : "Previous screenshot";
  const nextLabel = isRtl ? "اللقطة التالية" : "Next screenshot";

  useEffect(() => {
    if (reducedMotion) setIsAutoPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (!isAutoPlaying || isPaused) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === appScreenshots.length - 1 ? 0 : prev + 1,
      );
      setDirection(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isPaused]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? appScreenshots.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === appScreenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    // النقر على النقطة النشطة كان يُعيد تشغيل الحركة كاملةً باتجاه خاطئ
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // أسهم لوحة المفاتيح — سلوك متوقَّع في أي معرض شرائح، ولم يكن موجوداً.
  // المعالج على الحاوية لا على عنصر قابل للتركيز، فيلتقط الضغط من الأزرار
  // والنقاط بالتصعيد دون أن يضيف محطّة تنقّل جديدة.
  const handleKeyDown = (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const goesBack = isRtl ? event.key === "ArrowRight" : event.key === "ArrowLeft";
    if (goesBack) handlePrev();
    else handleNext();
  };

  // كل شريحة تُركَّب وحدها (AnimatePresence بمفتاح الفهرس)، فصورة اللقطة
  // التالية لا تبدأ تحميلها إلا لحظة ظهورها — ومع تقدّم تلقائي كل أربع ثوانٍ
  // يرى الزائر إطاراً فارغاً ثم قفزة. نُحمّل الجارتين مسبقاً.
  useEffect(() => {
    const preload = (index) => {
      const image = new Image();
      image.src = appScreenshots[index].src;
    };
    preload((currentIndex + 1) % appScreenshots.length);
    preload((currentIndex - 1 + appScreenshots.length) % appScreenshots.length);
  }, [currentIndex]);

  // كان `backgroundColor` يحمل تدرّجاً — والخاصية لا تقبل التدرّجات فتُلغى
  // القيمة بصمت؛ السطر التالي (background) هو الذي كان يرسم فعلاً.
  const mobileArrowSx = {
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    color: "#fff",
    width: 56,
    height: 56,
    boxShadow: "0 8px 20px rgba(143, 92, 177, 0.4)",
    transition: "box-shadow 250ms ease, transform 150ms ease",
    "&:hover": { boxShadow: "0 12px 30px rgba(143, 92, 177, 0.6)" },
    "&:active": { transform: "scale(0.94)" },
    "@media (prefers-reduced-motion: reduce)": { transition: "none" },
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction * (isRtl ? -100 : 100),
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * (isRtl ? 100 : -100),
      scale: 0.95,
    }),
  };

  return (
    <Box
      id="app-screenshots"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: "var(--bg-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* كرتان زخرفيتان كانتا تتحرّكان بلا توقّف فوق `backdrop-filter` كثيف:
          كلفة مستمرة على وحدة الرسوميات حتى وقت السكون، ومصدر إزعاج لمن
          يطلب تقليل الحركة. الآن ثابتتان في كلتا الحالتين إن طُلب ذلك. */}
      <Motion.div
        animate={reducedMotion ? undefined : {
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "5%",
          right: isRtl ? "auto" : "-3%",
          left: isRtl ? "-3%" : "auto",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(143, 92, 177, 0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />
      <Motion.div
        animate={reducedMotion ? undefined : {
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "0%",
          left: isRtl ? "auto" : "-2%",
          right: isRtl ? "-2%" : "auto",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      <Box sx={{ textAlign: "center", mb: 8, position: "relative", zIndex: 1 }}>
        <Motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
              mx: "auto",
              mb: 3,
              boxShadow:
                "0 12px 40px rgba(143, 92, 177, 0.4), inset 0 2px 10px rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s infinite",
              },
            }}
          >
            <MobileScreenShare sx={{ fontSize: 36, color: "#fff" }} />
          </Box>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* `Typography` بلا variant ترث body1، وأنماط MUI تُحقن في <head>
              بعد index.css فتفوز `font-size: 1rem` على `.section-title`
              عند تساوي الأولوية — فكان عنوان القسم بحجم نصّ عادي. */}
          <SectionHead
            title={t("appScreenshots.title")}
            subtitle={t("appScreenshots.subtitle")}
          />

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 2.5,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<AutoAwesome sx={{ color: "#FFD700" }} />}
                label={t("appScreenshots.feature1") || "Easy Booking"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "var(--primary-light)",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
              <Chip
                icon={<AutoAwesome sx={{ color: "#00E5FF" }} />}
                label={t("appScreenshots.feature2") || "Real-time Tracking"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "#00E5FF",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
              <Chip
                icon={<AutoAwesome sx={{ color: "#FF6B9D" }} />}
                label={t("appScreenshots.feature3") || "24/7 Support"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "#FF6B9D",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
            </Box>
          </Motion.div>
        </Motion.div>
      </Box>

      {/* Phone Carousel */}
      <Box
        role="group"
        aria-roledescription={isRtl ? "معرض لقطات" : "carousel"}
        aria-label={t("appScreenshots.title")}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "280px",
            mx: "auto",
          }}
        >
          {/* Phone Frame Glow Effect */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95%",
              height: "95%",
              background:
                "radial-gradient(circle, rgba(143, 92, 177, 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />

          {/* Phone Notch */}
          <Box
            sx={{
              position: "absolute",
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "140px",
              height: "28px",
              background: "linear-gradient(180deg, #1a1a2e 0%, #2a2a3e 100%)",
              borderRadius: "0 0 18px 18px",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          />

          {/* Phone Frame */}
          <Box
            sx={{
              position: "relative",
              // 999px على صندوق عرضه ٢٨٠ يُقصَّ إلى ١٤٠ لكل زاوية، فيصير
              // الإطار كبسولة نصفاها العلوي والسفلي دائرتان — تبتلعان أعلى
              // اللقطة وأسفلها. ٤٠ هو نصف قطر الهاتف الفعلي.
              borderRadius: "40px",
              overflow: "hidden",
              border: "4px solid #3a3a5e",
              boxShadow: `
                0 25px 80px rgba(0,0,0,0.6),
                0 0 0 2px #2a2a3e,
                0 0 60px rgba(143, 92, 177, 0.3),
                inset 0 0 40px rgba(0,0,0,0.3)
              `,
              background: "linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)",
              aspectRatio: "9/19",
              mx: "auto",
              zIndex: 1,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
                pointerEvents: "none",
                zIndex: 5,
              },
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <Motion.img
                key={currentIndex}
                src={appScreenshots[currentIndex].src}
                alt={
                  isRtl
                    ? `${appScreenshots[currentIndex].ar} — لقطة من تطبيق Car Hero (${currentIndex + 1} من ${appScreenshots.length})`
                    : `${appScreenshots[currentIndex].en} — Car Hero app screenshot (${currentIndex + 1} of ${appScreenshots.length})`
                }
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>

            {/* Screen Reflection Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
                pointerEvents: "none",
                zIndex: 6,
              }}
            />
          </Box>

          {/* Pagination Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              // صندوق الهاتف عرضه ٢٨٠ بينما صفّ النقاط أعرض منه، وكان
              // `wrap` يلفّ نصف النقاط إلى سطر يقع فوق الأوّل — أي خلف
              // أسفل الهاتف فلا تُرى. الصفّ الآن سطر واحد يفيض بالتساوي
              // على جانبَي الإطار، وفجوة ٤ بكسل تُبقي عشر نقاط داخل شاشة
              // عرضها ٣٢٠ بكسل دون أن تتلامس أهداف اللمس.
              gap: 0.5,
              zIndex: 5,
              flexWrap: "nowrap",
              px: 2,
            }}
          >
            {/* كانت هذه العناصر `Motion.div` تتلقّى خصيصة `sx` — وهي خصيصة
                MUI لا يفهمها عنصر framer-motion، فكانت كل أنماط النقاط
                تُتجاهَل بصمت ولا تُرسم أصلاً. وكانت `div` بـ onClick أيضاً:
                لا تُركَّز بلوحة المفاتيح ولا تُعلن كعنصر تفاعلي. */}
            {appScreenshots.map((shot, index) => (
              <Box
                component="button"
                type="button"
                key={index}
                onClick={() => handleDotClick(index)}
                aria-label={isRtl ? `الانتقال إلى: ${shot.ar}` : `Go to: ${shot.en}`}
                aria-current={index === currentIndex ? "true" : undefined}
                // النقطة تبقى ١٠ بكسل بصرياً — وهو المقاس الصحيح لمؤشّر شرائح —
                // لكن مساحة اللمس كانت ١٠×١٠ أيضاً، أي ربع الحد الموصى به وسط
                // اثنتي عشرة نقطة متجاورة. الزرّ الآن ٤٤ بكسل شفّاف، والنقطة
                // تُرسم بـ`::before` داخله.
                sx={{
                  // ٢٤ بكسل هو الحد الأدنى في WCAG 2.5.8. أربع وأربعون عرضاً
                  // لكل نقطة تعني ٥٢٨ بكسل لاثنتي عشرة نقطة — أعرض من شاشة
                  // الجوال. الارتفاع يبقى ٤٤ فالمساحة الرأسية متاحة.
                  width: index === currentIndex ? 44 : 24,
                  height: 44,
                  p: 0,
                  border: 0,
                  background: "none",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  "&::before": {
                    content: '""',
                    display: "block",
                    width: index === currentIndex ? 32 : 10,
                    height: 10,
                    borderRadius: "5px",
                    backgroundColor:
                      index === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.35)",
                    transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: index === currentIndex ? "0 0 12px var(--primary)" : "none",
                  },
                  "&:hover::before": {
                    backgroundColor:
                      index === currentIndex ? "var(--primary)" : "rgba(255,255,255,0.6)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Navigation Arrows - Desktop */}
          <IconButton
            onClick={handlePrev}
            aria-label={prevLabel}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isRtl ? "right" : "left"]: { md: "-70px" },
              left: isRtl ? "auto" : { md: "-70px" },
              right: isRtl ? { md: "-70px" } : "auto",
              backgroundColor: "rgba(143, 92, 177, 0.25)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: 50,
              height: 50,
              border: "1px solid rgba(143, 92, 177, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(143, 92, 177, 0.5)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(143, 92, 177, 0.4)",
              },
              display: { xs: "none", md: "flex" },
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {isRtl ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>

          <IconButton
            onClick={handleNext}
            aria-label={nextLabel}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isRtl ? "left" : "right"]: { md: "-70px" },
              right: isRtl ? "auto" : { md: "-70px" },
              left: isRtl ? { md: "-70px" } : "auto",
              backgroundColor: "rgba(143, 92, 177, 0.25)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: 50,
              height: 50,
              border: "1px solid rgba(143, 92, 177, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(143, 92, 177, 0.5)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(143, 92, 177, 0.4)",
              },
              display: { xs: "none", md: "flex" },
              transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* زر إيقاف/تشغيل التقدّم التلقائي — شرط WCAG 2.2.2 لأي محتوى
            يتحرّك تلقائياً لأكثر من خمس ثوانٍ */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <IconButton
            onClick={() => setIsAutoPlaying((playing) => !playing)}
            aria-label={
              isAutoPlaying
                ? (isRtl ? "إيقاف التقدّم التلقائي" : "Pause automatic slideshow")
                : (isRtl ? "تشغيل التقدّم التلقائي" : "Play automatic slideshow")
            }
            aria-pressed={isAutoPlaying}
            sx={{
              width: 44,
              height: 44,
              color: "var(--text-dark)",
              border: "1px solid var(--border-color)",
              background: "var(--card-bg)",
              "&:hover": { color: "var(--primary-text)", borderColor: "var(--primary)" },
            }}
          >
            {isAutoPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
          </IconButton>
        </Box>

        {/* Mobile Navigation */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <IconButton onClick={handlePrev} aria-label={prevLabel} sx={mobileArrowSx}>
            {isRtl ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
          <IconButton onClick={handleNext} aria-label={nextLabel} sx={mobileArrowSx}>
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* Screenshot Counter */}
        <Motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* «1 / 12» في فقرة عربية يُعرض «12 / 1»: الأرقام ضعيفة الاتجاه
              والمسافات والشرطة محايدة، فتتبع اتجاه الفقرة وينقلب الترتيب.
              <bdi> يعزل العدّاد كوحدة LTR — نفس علاج رقم الهاتف.
              وaria-live يجعل تغيّر الشريحة مسموعاً بدل أن يمرّ بصمت. */}
          <Typography
            aria-live="polite"
            aria-atomic="true"
            sx={{
              mt: 4,
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            <Box component="span" sx={srOnly}>
              {isRtl ? "اللقطة " : "Screenshot "}
            </Box>
            <bdi dir="ltr">
              {currentIndex + 1} / {appScreenshots.length}
            </bdi>
          </Typography>
        </Motion.div>
      </Box>
    </Box>
  );
};

export default AppScreenshots;
