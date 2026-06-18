import React from "react";
import { Box, Container, Divider, IconButton, Link, Typography } from "@mui/material";
import { Email, Facebook, Instagram, LocationOn, Phone, Twitter, YouTube } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo_carHero.png";

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
    t("footer.servicesItems.roadside"),
    t("footer.servicesItems.towing"),
    t("footer.servicesItems.battery"),
    t("footer.servicesItems.fuel"),
    t("footer.servicesItems.tire"),
  ];

  const quickLinks = [
    { label: t("home"), href: "#home" },
    { label: t("service.title"), href: "#services" },
    { label: isRtl ? "التغطية" : "Coverage", href: "#coverage-map-section" },
    { label: t("contact"), href: "#contact" },
    { label: t("footer.quickLinksItems.partner"), href: "/register" },
  ];

  const contactInfo = [
    { Icon: Phone, text: "+963 956868573", label: "Phone", forceLtr: true },
    { Icon: Email, text: "support@carhero.app", label: "Email", forceLtr: true },
    { Icon: LocationOn, text: t("footer.contactItems.address"), label: "Address" },
  ];

  const sectionTitleSx = {
    color: "var(--primary-light)",
    fontSize: "1.05rem",
    fontWeight: 900,
    mb: 2.5,
    letterSpacing: 0.2,
  };

  const linkSx = {
    width: "fit-content",
    color: "var(--footer-muted)",
    textDecoration: "none",
    fontSize: "0.96rem",
    fontWeight: 500,
    lineHeight: 1.5,
    transition: "all 0.25s ease",
    "&:hover": {
      color: "var(--primary-light)",
      transform: isRtl ? "translateX(-4px)" : "translateX(4px)",
    },
  };

  return (
    <Box
      component="footer"
      dir={isRtl ? "rtl" : "ltr"}
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "var(--footer-bg)",
        color: "var(--footer-text)",
        borderTop: "1px solid rgba(143, 92, 177, 0.55)",
        pt: { xs: 7, md: 9 },
        pb: { xs: 4, md: 5 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          top: -330,
          insetInlineStart: -190,
          borderRadius: "50%",
          background: "rgba(143, 92, 177, 0.14)",
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: "22px !important", sm: "34px !important", lg: "64px !important" },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 1.15fr) 1.4fr", lg: "1.2fr 1.45fr 1.15fr" },
            gridTemplateAreas: {
              xs: '"brand" "links" "contact"',
              md: '"brand links" "contact contact"',
              lg: '"brand links contact"',
            },
            gap: { xs: 5, md: 6, lg: 8 },
            alignItems: "start",
            direction: "ltr",
          }}
        >
          <Box
            sx={{
              gridArea: "brand",
              direction: isRtl ? "rtl" : "ltr",
              textAlign: isRtl ? "right" : "left",
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt={t("footer.logoAlt")}
              sx={{
                display: "block",
                width: { xs: 210, md: 245 },
                maxWidth: "100%",
                height: "auto",
                mb: 2.5,
                filter: "drop-shadow(0 6px 18px rgba(143, 92, 177, 0.25))",
              }}
            />
            <Typography
              sx={{
                maxWidth: 390,
                color: "var(--footer-muted)",
                fontSize: { xs: "0.98rem", md: "1.02rem" },
                lineHeight: 1.9,
                mb: 3,
              }}
            >
              {t("footer.tagline")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
              {socialIcons.map(({ Icon, label, color }) => (
                <IconButton
                  key={label}
                  aria-label={label}
                  sx={{
                    width: 44,
                    height: 44,
                    color: "var(--footer-text)",
                    background: "var(--footer-surface)",
                    border: "1px solid var(--border-color)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      color: "#fff",
                      background: color,
                      borderColor: color,
                      transform: "translateY(-4px)",
                      boxShadow: `0 10px 24px ${color}55`,
                    },
                  }}
                >
                  {React.createElement(Icon, { fontSize: "small" })}
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              gridArea: "links",
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(2, minmax(150px, 1fr))" },
              gap: { xs: 3, sm: 5 },
              direction: isRtl ? "rtl" : "ltr",
              textAlign: isRtl ? "right" : "left",
              minWidth: 0,
            }}
          >
            <Box>
              <Typography sx={sectionTitleSx}>{t("footer.services")}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
                {serviceLinks.map((label) => (
                  <Link key={label} href="#services" sx={linkSx}>{label}</Link>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography sx={sectionTitleSx}>{t("footer.quickLinks")}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
                {quickLinks.map((link) => (
                  <Link key={link.label} href={link.href} sx={linkSx}>{link.label}</Link>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              gridArea: "contact",
              direction: isRtl ? "rtl" : "ltr",
              textAlign: isRtl ? "right" : "left",
              minWidth: 0,
            }}
          >
            <Typography sx={sectionTitleSx}>{t("footer.contact")}</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.6 }}>
              {contactInfo.map(({ Icon, text, label, forceLtr }) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    minWidth: 0,
                    width: "fit-content",
                    maxWidth: "100%",
                    color: "var(--footer-muted)",
                    transition: "color 0.25s ease, transform 0.25s ease",
                    "&:hover": {
                      color: "var(--primary-light)",
                      transform: isRtl ? "translateX(-3px)" : "translateX(3px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      color: "inherit",
                    }}
                  >
                    {React.createElement(Icon, { sx: { fontSize: 19 } })}
                  </Box>
                  <Typography
                    component="span"
                    sx={{
                      minWidth: 0,
                      overflowWrap: "anywhere",
                      color: "inherit",
                      fontSize: "0.96rem",
                      fontWeight: 500,
                      lineHeight: 1.5,
                      direction: forceLtr ? "ltr" : "inherit",
                      unicodeBidi: forceLtr ? "isolate" : "normal",
                      textAlign: forceLtr ? "left" : "inherit",
                    }}
                  >
                    {forceLtr ? <bdi dir="ltr">{text}</bdi> : text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: { xs: 6, md: 7 }, mb: 3.5, borderColor: "var(--border-color)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: isRtl ? "row-reverse" : "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "var(--footer-muted)", fontSize: "0.86rem", fontWeight: 500 }}>
            {t("footer.copyright")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 2, sm: 3.5 } }}>
            {[t("footer.privacyPolicy"), t("footer.termsConditions")].map((label) => (
              <Link key={label} href="#" sx={{ ...linkSx, fontSize: "0.86rem" }}>{label}</Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
