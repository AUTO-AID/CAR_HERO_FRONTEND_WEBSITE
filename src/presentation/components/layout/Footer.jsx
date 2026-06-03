import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Container,
  Link,
  Divider,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  YouTube,
  Instagram,
  Phone,
  Email,
  LocationOn,
  Send,
} from "@mui/icons-material";
import logo from "@/assets/logo_carHero.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const socialIcons = [
    { Icon: Facebook, label: "Facebook", color: "#1877F2" },
    { Icon: Twitter, label: "Twitter", color: "#1DA1F2" },
    { Icon: Instagram, label: "Instagram", color: "#E4405F" },
    { Icon: YouTube, label: "YouTube", color: "#FF0000" },
  ];

  const serviceLinks = [
    { label: t("footer.servicesItems.roadside"), href: "#" },
    { label: t("footer.servicesItems.towing"), href: "#" },
    { label: t("footer.servicesItems.battery"), href: "#" },
    { label: t("footer.servicesItems.fuel"), href: "#" },
    { label: t("footer.servicesItems.tire"), href: "#" },
  ];

  const quickLinks = [
    { label: t("home"), href: "#" },
    { label: t("features"), href: "#" },
    { label: t("team"), href: "#" },
    { label: t("contact"), href: "#" },
    { label: t("footer.quickLinksItems.partner"), href: "/register" },
  ];

  const contactInfo = [
    { icon: <Phone />, text: "+963 930 000 000", label: "Phone" },
    { icon: <Email />, text: "support@carhero.app", label: "Email" },
    {
      icon: <LocationOn />,
      text: t("footer.contactItems.address"),
      label: "Address",
    },
  ];

  const footerLinks = [
    { label: t("footer.privacyPolicy"), href: "#" },
    { label: t("footer.termsConditions"), href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "var(--bg-footer, #0f0a1a)",
        color: "#fff",
        pt: { xs: 10, md: 15 },
        pb: 6,
        borderTop: "2px solid var(--primary-main, #8f5cb1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: isRtl ? "auto" : -100,
          left: isRtl ? -100 : "auto",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(143, 92, 177, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 8,
          }}
        >
          {/* Column 3: Contact (RTL: First, LTR: Last) */}
          <Box sx={{ flex: 1, order: { xs: 1, lg: isRtl ? 3 : 1 } }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 4,
                color: "var(--primary-light, #c196ff)",
                letterSpacing: 0.5,
                textTransform: "uppercase",
                fontSize: "1.2rem",
              }}
            >
              {t("footer.contact")}
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 3.5, mb: 6 }}
            >
              {contactInfo.map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", gap: 2.5, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, var(--primary-main, #8f5cb1) 0%, #5e3a8a 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontSize: "1.15rem",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Column 2: Links Group (RTL: Middle, LTR: Middle) */}
          <Box sx={{ flex: 1, order: 2, display: "flex", gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  color: "var(--primary-light, #c196ff)",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  fontSize: "1.2rem",
                }}
              >
                {t("footer.services")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {serviceLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#fff",
                        fontWeight: 600,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 4,
                  color: "var(--primary-light, #c196ff)",
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                  fontSize: "1.2rem",
                }}
              >
                {t("footer.quickLinks")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {quickLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textDecoration: "none",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#fff",
                        fontWeight: 600,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Column 1: Brand & About (RTL: Last, LTR: First) */}
          <Box sx={{ flex: 1, order: { xs: 3, lg: isRtl ? 1 : 3 } }}>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                component="img"
                src={logo}
                alt="CarHero"
                sx={{
                  width: "100%",
                  maxWidth: { xs: 200, md: 280 },
                  mb: 4,
                  filter:
                    "brightness(1.2) drop-shadow(0 0 20px rgba(143, 92, 177, 0.3))",
                  display: "block",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.8,
                  mb: 5,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  fontWeight: 400,
                  maxWidth: 450,
                }}
              >
                {t("footer.tagline")}
              </Typography>

              <Box sx={{ display: "flex", gap: 2.5 }}>
                {socialIcons.map(({ Icon, label, color }, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      aria-label={label}
                      sx={{
                        width: 50,
                        height: 50,
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "#fff",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          background: color,
                          borderColor: color,
                          boxShadow: `0 12px 28px ${color}77`,
                          transform: "rotate(5deg)",
                        },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>

        <Divider sx={{ my: 8, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Footer Bottom */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            pt: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              fontWeight: 500,
              fontSize: "1rem",
            }}
          >
            {t("footer.copyright")}
          </Typography>
          <Box sx={{ display: "flex", gap: 5 }}>
            {footerLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "1rem",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { color: "var(--primary-light)" },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
