import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion as Motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslation } from "react-i18next";
import Section from "@/presentation/components/ui/Section";
import SectionHead from "@/presentation/components/ui/SectionHead";

/**
 * قسم «لماذا Car Hero».
 *
 * كان هذا القسم و`ServiceSection` يعرضان القائمة نفسها تقريباً في صفحة
 * واحدة: «مساعدة على مدار الساعة» و«أسعار شفافة» و«فنيون معتمدون» مكرّرة
 * حرفياً في الاثنين. دُمجا هنا في قائمة واحدة من خمسة عناصر، والعنصران
 * الفريدان في `ServiceSection` (ضمان الجودة، الخدمات المتكاملة) نُقلا إلى
 * هذه القائمة قبل حذف الملف.
 */
const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const features = [
    {
      icon: DirectionsCarIcon,
      title: t("why.features.assistance.title"),
      description: t("why.features.assistance.desc"),
    },
    {
      icon: LocalOfferIcon,
      title: t("why.features.pricing.title"),
      description: t("why.features.pricing.desc"),
    },
    {
      icon: BuildIcon,
      title: t("why.features.come_to_you.title"),
      description: t("why.features.come_to_you.desc"),
    },
    {
      icon: VerifiedIcon,
      title: t("why.features.certified.title"),
      description: t("why.features.certified.desc"),
    },
    {
      icon: WorkspacePremiumIcon,
      title: t("service.feature5_title"),
      description: t("service.feature5_desc"),
    },
  ];

  return (
    <Section id="features">
      <SectionHead
        eyebrow={isArabic ? "الفرق الذي تلمسه" : "The difference you feel"}
        title={t("why.title")}
        subtitle={t("why.subtitle")}
      />

      {/* Features Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "20px", md: "28px" },
        }}
      >
        {features.map((feature, index) => (
          <Motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            style={{
              flexGrow: 1,
              flexBasis: "100%",
              maxWidth: "540px",
              minWidth: "300px",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: "22px", md: "28px 32px" },
                borderRadius: "20px",
                backgroundColor: "var(--card-bg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                height: "100%",
                textAlign: "start",
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  boxShadow: "var(--shadow-hover), 0 0 0 1px rgba(143, 92, 177, 0.3)",
                  borderColor: "var(--primary-light)",
                  "& .why-icon": {
                    transform: "scale(1.1)",
                    background: "var(--gradient)",
                    color: "#fff",
                    borderColor: "transparent",
                    boxShadow: "0 8px 20px rgba(143, 92, 177, 0.3)",
                  },
                  "& .why-divider": {
                    background: "var(--gradient)",
                  },
                },
              }}
            >
              {/* Icon */}
              <Box
                className="why-icon"
                sx={{
                  fontSize: { xs: "38px", md: "42px" },
                  color: "var(--primary-text)",
                  width: { xs: "56px", md: "64px" },
                  height: { xs: "56px", md: "64px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 0.5,
                  flexShrink: 0,
                  borderRadius: "16px",
                  background: "rgba(143, 92, 177, 0.08)",
                  border: "1.5px solid rgba(143, 92, 177, 0.2)",
                  transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <feature.icon fontSize="inherit" />
              </Box>

              {/* Divider */}
              <Box
                className="why-divider"
                sx={{
                  width: "2.5px",
                  minHeight: "100%",
                  background: "var(--border-color)",
                  mx: { xs: "16px", md: "22px" },
                  borderRadius: "8px",
                  transition: "background 400ms ease",
                }}
              />

              {/* Text */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    background: "var(--gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "17px", md: "20px" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    fontSize: { xs: 14, md: 15 },
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          </Motion.div>
        ))}
      </Box>
    </Section>
  );
};

export default WhyChooseUs;
