import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { BadgeCheck, ClipboardCheck, Smartphone, Store, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Section from "@/presentation/components/ui/Section";

const MotionBox = Motion(Box);

const copy = {
  ar: {
    driverEyebrow: "للسائقين",
    driverTitle: "حمّل التطبيق واطلب الخدمة من مكانك",
    driverText: "احتفظ بـ Car Hero في هاتفك لتكون جاهزًا لأي موقف على الطريق.",
    driverCta: "تعرّف على التطبيق",
    providerEyebrow: "للمصلحين والورش",
    providerTitle: "سجّل ورشتك أو خدمتك داخل Car Hero",
    providerSubtitle:
      "إذا كنت مصلح سيارات، صاحب ورشة، أو تقدم خدمة ميدانية، يمكنك الانضمام كمزود لتظهر للسائقين القريبين منك وتستقبل طلبات مناسبة لخدماتك.",
    providerCta: "ابدأ التسجيل كمزود",
    providerHighlights: [
      "اعرض الخدمات التي تقدمها بوضوح",
      "استقبل طلبات من سائقين قريبين من موقعك",
      "حدّد أوقات العمل والأسعار حسب خدمتك",
    ],
  },
  en: {
    driverEyebrow: "For drivers",
    driverTitle: "Download the app and request service from your location",
    driverText: "Keep Car Hero on your phone so you are ready for anything on the road.",
    driverCta: "Explore the app",
    providerEyebrow: "For mechanics and workshops",
    providerTitle: "Register your workshop or field service on Car Hero",
    providerSubtitle:
      "If you repair cars, run a workshop, or provide roadside service, you can join as a provider and receive requests from nearby drivers.",
    providerCta: "Start provider registration",
    providerHighlights: [
      "Show the services you provide clearly",
      "Receive requests from nearby drivers",
      "Set your working hours and service prices",
    ],
  },
};

/**
 * الدعوة المزدوجة في خاتمة الصفحة الرئيسية: مسار للسائق ومسار للمزوّد.
 *
 * كانت لوحة المزوّد تظهر مباشرةً بعد شبكة الخدمات، أي في منتصف رحلة
 * السائق وقبل أي دليل ثقة. وضعها هنا يبقي الرئيسية قصة واحدة موجّهة
 * للسائق، وينهيها بمسارين واضحين لكل جمهور.
 */
export default function HomeProviderCta() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;

  return (
    <Section id="join" className="home-provider-register-section" width="wide">
      <Box className="home-provider-register-grid">
        <MotionBox
          className="home-provider-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <span className="home-eyebrow">{text.providerEyebrow}</span>
          <Typography component="h2" className="home-title">{text.providerTitle}</Typography>
          <Typography className="home-subtitle align-start">{text.providerSubtitle}</Typography>
          <Button className="home-primary-action" endIcon={<ArrowForward />} onClick={() => navigate("/register")}>
            {text.providerCta}
          </Button>
        </MotionBox>

        <MotionBox
          className="home-provider-panel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="home-provider-icon">
            <Store size={34} strokeWidth={2.3} />
          </div>
          <div className="home-provider-steps">
            {text.providerHighlights.map((item, index) => {
              const Icon = index === 0 ? ClipboardCheck : index === 1 ? Truck : BadgeCheck;
              return (
                <div className="home-provider-step" key={item}>
                  <span>{index + 1}</span>
                  <Icon size={22} strokeWidth={2.35} />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </MotionBox>
      </Box>

      <MotionBox
          className="home-driver-cta"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <span className="home-driver-cta-icon"><Smartphone size={28} strokeWidth={2.3} /></span>
          <div>
            <span className="home-eyebrow">{text.driverEyebrow}</span>
            <Typography component="h2">{text.driverTitle}</Typography>
            <Typography component="p">{text.driverText}</Typography>
          </div>
          <Button className="home-primary-action" endIcon={<ArrowForward />} onClick={() => navigate("/app")}>
            {text.driverCta}
          </Button>
        </MotionBox>
    </Section>
  );
}
