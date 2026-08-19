import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { ArrowForward, ChevronRight } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { homeServices } from "@/presentation/content/services";
import Section from "@/presentation/components/ui/Section";
import SectionHead from "@/presentation/components/ui/SectionHead";

const MotionBox = Motion(Box);

const copy = {
  ar: {
    servicesEyebrow: "الخدمات الأساسية",
    servicesTitle: "كل ما يحتاجه السائق في لحظة التعطل",
    servicesSubtitle: "اختر الخدمة التي تحتاجها، وحدد موقعك، وسيتم توجيه طلبك إلى مزود قريب ومتاح.",
    viewServices: "استعراض كل الخدمات",
    cardCta: "تفاصيل الخدمة",
  },
  en: {
    servicesEyebrow: "Core Services",
    servicesTitle: "Everything drivers need when the road stops",
    servicesSubtitle: "Pick the service you need and set your location, and your request is routed to a nearby available provider.",
    viewServices: "See all services",
    cardCta: "Service details",
  },
};

/**
 * شبكة الخدمات في الصفحة الرئيسية — معاينة لستّ خدمات من أصل ثمانٍ.
 *
 * كان هذا المكوّن يحمل أيضاً لوحة تسجيل المزوّد، فيقطع رحلة السائق في
 * منتصفها بدعوة موجّهة لجمهور آخر. اللوحة انتقلت إلى `HomeProviderCta`
 * في أسفل الصفحة، وبيانات الخدمات انتقلت إلى `content/services`.
 */
export default function HomeExperience() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;

  return (
    <Section id="services" className="home-services-preview" width="wide">
      <SectionHead
        eyebrow={text.servicesEyebrow}
        title={text.servicesTitle}
        subtitle={text.servicesSubtitle}
      />

      <Box className="home-service-grid">
          {homeServices.map((service, index) => {
            const Icon = service.icon;
            const localized = isArabic ? service.ar : service.en;
            return (
              <MotionBox
                key={service.id}
                component={RouterLink}
                to={`/services#service-${service.id}`}
                className="home-service-card is-link"
                aria-label={`${localized.title} — ${text.cardCta}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <span className="home-service-icon"><Icon size={30} strokeWidth={2.25} /></span>
                <Box>
                  <Typography component="h3">{localized.title}</Typography>
                  <Typography component="p">{localized.short}</Typography>
                </Box>
                <span className="home-service-cta" aria-hidden="true">
                  {text.cardCta}
                  <ChevronRight fontSize="small" />
                </span>
              </MotionBox>
            );
          })}
        </Box>

      <Box className="home-actions-row">
        <Button className="home-primary-action" endIcon={<ArrowForward />} onClick={() => navigate("/services")}>
          {text.viewServices}
        </Button>
      </Box>
    </Section>
  );
}
