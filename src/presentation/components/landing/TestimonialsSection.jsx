import React from "react";
import { Box, Typography, Avatar, Rating, Paper, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const TestimonialCard = ({ name, role, feedback, rating, index, isArabic }) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    style={{ height: "100%" }}
  >
    <Paper
      dir={isArabic ? "rtl" : "ltr"}
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
        borderRadius: "24px",
        background: "var(--card-bg)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden",
        transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        textAlign: isArabic ? "right" : "left",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(143, 92, 177, 0.03), transparent)",
          transition: "left 400ms ease",
        },
        "&:hover": {
          borderColor: "var(--primary)",
          background: "var(--card-bg)",
          boxShadow: "var(--shadow-hover)",
          "&::before": {
            left: "100%",
          },
          "& .quote-icon": {
            color: "var(--primary-text)",
            opacity: 0.8,
            transform: "rotate(180deg) scale(1.15)",
          },
          "& .avatar-wrapper": {
            borderColor: "var(--primary-dark)",
            boxShadow: "0 0 20px rgba(143, 92, 177, 0.3)",
          },
          "& .rating-stars": {
            animation: "sparkle 0.6s ease",
          },
        },
      }}
    >
      <FormatQuoteIcon
        className="quote-icon"
        sx={{
          position: "absolute",
          top: 20,
          insetInlineEnd: 20,
          fontSize: 60,
          color: "rgba(143, 92, 177, 0.1)",
          transform: "rotate(180deg)",
          transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            className="avatar-wrapper"
            aria-hidden="true"
            sx={{
              width: 56,
              height: 56,
              background: "var(--gradient)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.25rem",
              border: "2px solid var(--primary)",
              transition: "all 400ms ease",
            }}
          >
            {name ? name[0] : "?"}
          </Avatar>
          <Box>
            <Typography component="h3" fontWeight={700} color="var(--text-dark)">
              {name}
            </Typography>
            <Typography variant="body2" color="var(--primary)" fontWeight={600}>
              {role}
            </Typography>
          </Box>
        </Box>

        <Rating
        className="rating-stars"
        value={rating}
        readOnly
        sx={{
          color: "var(--status-star)",
          transition: "all 250ms ease",
          alignSelf: isArabic ? "flex-end" : "flex-start",
        }}
      />

        <Typography
          variant="body1"
          color="var(--text-muted)"
          sx={{
            fontStyle: "italic",
            lineHeight: 1.7,
            flexGrow: 1,
            zIndex: 1,
        }}
      >
          “{feedback}”
        </Typography>
      </Box>
    </Paper>
  </Motion.div>
);

const TestimonialsSection = ({ hideHeader = false }) => {
  const { t, i18n } = useTranslation();

  // Dummy data if not in translations yet (or fallback)
  const testimonials = t("testimonials.items", { returnObjects: true });
  const isArabic = i18n.language === "ar";
  const arabicTestimonials = [
    {
      name: "أبو يزن",
      role: "سائق يومي",
      feedback:
        "علقت بطاريتي بعد الدوام وما كان عندي حدا قريب. طلبت تشغيل بطارية من التطبيق، والمزود تواصل معي بسرعة ووصل للموقع بدون تعقيد.",
      rating: 5,
    },
    {
      name: "رنا الخطيب",
      role: "موظفة",
      feedback:
        "بنشر الإطار وأنا راجعة من الشغل. أكثر شي ريحني أني عرفت مين جاي ومتى تقريبًا يوصل، وما ضليت أتصل بأكثر من ورشة.",
      rating: 5,
    },
    {
      name: "ماهر سليمان",
      role: "صاحب سيارة",
      feedback:
        "حجزت تغيير زيت من التطبيق بدل ما أدوّر كل مرة على ورشة مناسبة. الخدمة كانت واضحة، والسعر معروف قبل ما أأكد الطلب.",
      rating: 5,
    },
  ];
  // كانت هنا ثلاث صور من Unsplash تُقرَن بأسماء عربية بعينها — أي أن وجوه
  // أشخاص حقيقيين لا علاقة لهم بالخدمة كانت تُعرض على أنهم عملاء يشهدون
  // لها. الحرف الأول من الاسم يؤدي الغرض البصري نفسه بلا ادّعاء، ويوفّر
  // ثلاثة طلبات إلى نطاق خارجي.

  const items = (
    isArabic
      ? arabicTestimonials
      : Array.isArray(testimonials)
      ? testimonials
      : [
          {
            name: "John Doe",
            role: "Car Owner",
            feedback: "Amazing service! Saved me in the middle of nowhere.",
            rating: 5,
          },
          {
            name: "Sarah Smith",
            role: "Frequent Traveler",
            feedback:
              "The app is so easy to use and the mechanic arrived in 10 mins.",
            rating: 5,
          },
          {
            name: "Ahmed Ali",
            role: "VIP Member",
            feedback:
              "Professional team and premium support. Highly recommended!",
            rating: 5,
          },
        ]
  );

  return (
    <Box
      id="testimonials"
      sx={{
        py: hideHeader ? 0 : { xs: 8, md: 12 },
        px: hideHeader ? 0 : { xs: 2, md: 10 },
        background: hideHeader ? "transparent" : "var(--bg-section-alt)",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        overflow: "hidden",
      }}
    >
      {!hideHeader && (
        <Box textAlign="center" mb={6}>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: "var(--gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: { xs: "24px", md: "36px" },
              }}
            >
              {t("testimonials.title") || "What Our Clients Say"}
            </Typography>
            <Typography
              variant="body1"
              color="var(--text-muted)"
              maxWidth={600}
              mx="auto"
            >
              {t("testimonials.subtitle") || "Real experiences from real users."}
            </Typography>
          </Motion.div>
        </Box>
      )}

      <Grid container spacing={3} justifyContent="center">
        {items.map((item, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: "flex" }}>
            <TestimonialCard {...item} index={i} isArabic={isArabic} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
