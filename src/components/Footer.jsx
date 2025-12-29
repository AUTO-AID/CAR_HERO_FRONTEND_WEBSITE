import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo_carHero.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const socialIcons = [
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: YouTube, label: "YouTube" },
    { Icon: GoogleIcon, label: "Google" },
    { Icon: Instagram, label: "Instagram" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        background: "var(--bg-section-alt)",
        borderTop: "1px solid var(--border-color)",
        transition: "all 0.4s ease",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box
          component="img"
          src={logo}
          alt={t("footer.logoAlt") || "CarHero Logo"}
          sx={{
            display: "block",
            mx: "auto",
            width: "100%",
            maxWidth: { xs: 240, sm: 280, md: 320 },
            height: "auto",
            mb: 3,
            filter: "drop-shadow(0 4px 16px rgba(143, 92, 177, 0.15))",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              filter: "drop-shadow(0 6px 20px rgba(143, 92, 177, 0.25))",
            },
          }}
        />
      </motion.div>

      {/* Tagline */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem" },
          color: "var(--text-muted)",
          maxWidth: 500,
          mx: "auto",
          lineHeight: 1.7,
          mb: 4,
        }}
      >
        {t("footer.tagline") || "Your trusted roadside assistance partner"}
      </Typography>

      {/* Social Icons */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1.5, sm: 2 },
          justifyContent: "center",
          mb: 5,
          flexWrap: "wrap",
        }}
      >
        {socialIcons.map(({ Icon, label }, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              aria-label={label}
              sx={{
                width: { xs: 44, sm: 50 },
                height: { xs: 44, sm: 50 },
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                borderRadius: "50%",
                color: "var(--primary)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "var(--gradient)",
                  color: "var(--text-light)",
                  borderColor: "transparent",
                  boxShadow: "var(--shadow-hover)",
                },
              }}
            >
              <Icon sx={{ fontSize: { xs: 20, sm: 22 } }} />
            </IconButton>
          </motion.div>
        ))}
      </Box>

      {/* Divider */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          height: 1,
          background: "var(--border-color)",
          mx: "auto",
          mb: 3,
        }}
      />

      {/* Privacy / Terms */}
      <Typography
        sx={{
          mb: 2,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          color: "var(--text-muted)",
          "& a": {
            color: "var(--primary)",
            textDecoration: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "var(--primary-light)",
              textDecoration: "underline",
            },
          },
        }}
      >
        {t("footer.privacy") || "Privacy Policy | Terms & Conditions"}
      </Typography>

      {/* Copyright */}
      <Typography
        sx={{
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
          color: "var(--text-muted)",
          fontWeight: 500,
        }}
      >
        {t("footer.copyright") || "© 2025 CarHero – All rights reserved."}
      </Typography>
    </Box>
  );
};

export default Footer;
