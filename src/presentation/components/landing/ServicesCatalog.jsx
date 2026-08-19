import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { services } from "@/presentation/content/services";
import Section from "@/presentation/components/ui/Section";
import SectionHead from "@/presentation/components/ui/SectionHead";

const MotionBox = Motion(Box);

const copy = {
  ar: {
    eyebrow: "كل الخدمات",
    title: "ثماني خدمات تغطي ما يحدث فعلاً على الطريق",
    subtitle:
      "من الطوارئ المفاجئة إلى الصيانة المجدولة. تختار الخدمة وتحدد موقعك، ويوجَّه الطلب إلى مزوّد قريب ومتاح يقدّمها.",
    cta: "حمّل التطبيق واطلب الخدمة",
  },
  en: {
    eyebrow: "All services",
    title: "Eight services that cover what actually happens on the road",
    subtitle:
      "From sudden emergencies to scheduled maintenance. You pick the service and set your location, and the request is routed to a nearby available provider who offers it.",
    cta: "Get the app and request a service",
  },
};

export default function ServicesCatalog() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;

  return (
    <Section id="services" width="wide">
      <SectionHead as="h1" eyebrow={text.eyebrow} title={text.title} subtitle={text.subtitle} />

      <Box className="home-service-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          const localized = isArabic ? service.ar : service.en;
          return (
            <MotionBox
              key={service.id}
              /* هدف الروابط العميقة القادمة من شبكة الرئيسية */
              id={`service-${service.id}`}
              className="home-service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
            >
              <span className="home-service-icon"><Icon size={30} strokeWidth={2.25} /></span>
              <Box>
                {/* رأس القسم صار h1 لأنه عنوان الصفحة، فالبطاقات تنزل درجة
                  واحدة فقط — h3 تحت h1 تتخطّى مستوىً كاملاً */}
              <Typography component="h2">{localized.title}</Typography>
                <Typography component="p">{localized.long}</Typography>
              </Box>
            </MotionBox>
          );
        })}
      </Box>

      <Box className="home-actions-row">
        <Button className="home-primary-action" endIcon={<ArrowForward />} onClick={() => navigate("/app")}>
          {text.cta}
        </Button>
      </Box>
    </Section>
  );
}
