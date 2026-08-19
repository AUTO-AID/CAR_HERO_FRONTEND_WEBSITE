import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Navbar from "@/presentation/components/layout/Navbar";
import Footer from "@/presentation/components/layout/Footer";

const copy = {
  ar: {
    code: "404",
    title: "الصفحة غير موجودة",
    text: "الرابط الذي فتحته لم يعد متاحاً أو أنه غير صحيح. يمكنك المتابعة من أحد الأقسام التالية.",
    home: "العودة إلى الرئيسية",
    links: [
      { label: "الخدمات", path: "/services" },
      { label: "التطبيق", path: "/app" },
      { label: "الأسعار", path: "/pricing" },
      { label: "تواصل معنا", path: "/contact" },
    ],
  },
  en: {
    code: "404",
    title: "Page not found",
    text: "The link you opened is no longer available or is incorrect. You can continue from one of the sections below.",
    home: "Back to home",
    links: [
      { label: "Services", path: "/services" },
      { label: "The App", path: "/app" },
      { label: "Pricing", path: "/pricing" },
      { label: "Contact", path: "/contact" },
    ],
  },
};

export default function NotFoundPage() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? copy.ar : copy.en;

  return (
    <>
      <Navbar />
      <Box
        component="main"
        dir={isArabic ? "rtl" : "ltr"}
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          background: "var(--bg-light)",
          pt: { xs: 14, md: 18 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box className="section-container" sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              mx: "auto",
              mb: 3,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              background: "var(--gradient)",
              boxShadow: "0 8px 24px rgba(143, 92, 177, 0.25)",
            }}
          >
            <Compass size={32} strokeWidth={2.3} />
          </Box>

          <Typography
            component="p"
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "3rem", md: "4rem" },
              lineHeight: 1,
              color: "var(--primary-text)",
              letterSpacing: "-0.04em",
            }}
          >
            {text.code}
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              color: "var(--text-dark)",
            }}
          >
            {text.title}
          </Typography>

          <Typography
            sx={{
              maxWidth: 560,
              mx: "auto",
              mb: 4,
              color: "var(--text-muted)",
              fontSize: { xs: "1rem", md: "1.05rem" },
              lineHeight: 1.85,
            }}
          >
            {text.text}
          </Typography>

          <Button className="home-primary-action" onClick={() => navigate("/")}>
            {text.home}
          </Button>

          <Box
            component="nav"
            sx={{
              mt: 4,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1.25,
            }}
          >
            {text.links.map((link) => (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                sx={{
                  minHeight: 44,
                  px: 2.25,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 700,
                  color: "var(--text-dark)",
                  border: "1px solid var(--border-color)",
                  background: "var(--card-bg)",
                  "&:hover": {
                    color: "var(--primary-text)",
                    borderColor: "var(--primary)",
                    background: "var(--card-bg)",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
