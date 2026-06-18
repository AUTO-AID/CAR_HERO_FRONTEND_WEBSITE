import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "@/assets/logo_carHero.png";

import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { motion as Motion } from "framer-motion";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapIcon from "@mui/icons-material/Map";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { ColorModeContext } from "@/application/contexts/color-mode.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NAV_SECTION_IDS = ["home", "services", "how-it-works", "coverage-map-section", "contact"];

const Navbar = ({ minimal = false }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("home"), id: "home", icon: <HomeIcon /> },
    { label: t("service.title"), id: "services", icon: <MiscellaneousServicesIcon /> },
    { label: isArabic ? "طريقة العمل" : "How It Works", id: "how-it-works", icon: <TimelineIcon /> },
    { label: isArabic ? "التغطية والباقات" : "Coverage & Plans", id: "coverage-map-section", icon: <MapIcon /> },
    { label: t("contact"), id: "contact", icon: <ContactSupportIcon /> },
  ];

  // Lang toggle
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const currentLang = i18n.language === "ar" ? "EN" : "AR";

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = window.innerWidth < 1200 ? 66 : 80;
      const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -55% 0px" }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: { xs: 66, md: 80 },
          display: "flex",
          justifyContent: "center",
          background: scrolled 
            ? scrolled && theme.palette.mode === 'dark' 
              ? "rgba(17, 17, 17, 0.85)" 
              : "rgba(255, 255, 255, 0.85)"
            : "transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 5 },
            minHeight: { xs: "66px !important", md: "80px !important" },
            direction: "ltr",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Car Hero Logo"
            sx={{
              width: { xs: 150, sm: 175, lg: 205 },
              height: "auto",
              maxHeight: { xs: 48, lg: 58 },
              objectFit: "contain",
              flexShrink: 0,
              order: isArabic ? 2 : 1,
              position: "relative",
              left: { xs: -4, sm: -6, lg: -12 },
              cursor: "pointer",
              transition: "transform 0.3s ease, filter 0.3s ease",
              "&:hover": { transform: "translateY(-1px) scale(1.025)" },
              filter: theme.palette.mode === "dark"
                ? "drop-shadow(0 4px 12px rgba(143, 92, 177, 0.28))"
                : "drop-shadow(0 3px 8px rgba(74, 35, 111, 0.18))",
            }}
            onClick={() => minimal ? (window.location.href = '/') : scrollToSection("home")}
          />

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.35,
              order: isArabic ? 1 : 2,
              flexDirection: isArabic ? "row-reverse" : "row",
              direction: isArabic ? "rtl" : "ltr",
              px: scrolled ? 1 : 0,
              py: scrolled ? 0.5 : 0,
              borderRadius: "999px",
              background: scrolled ? "rgba(143, 92, 177, 0.06)" : "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-color)",
              transition: "all 0.3s ease",
            }}
          >
            {!minimal && navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  textTransform: "none",
                  fontSize: "0.88rem",
                  px: 1.45,
                  py: 0.9,
                  minWidth: "auto",
                  borderRadius: "999px",
                  color: (activeSection === item.id) 
                    ? "white"
                    : (scrolled && theme.palette.mode === 'light') ? "var(--text-dark)" : "white",
                  fontWeight: activeSection === item.id ? 700 : 500,
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: activeSection === item.id ? "var(--gradient)" : "transparent",
                  boxShadow: activeSection === item.id ? "0 6px 18px rgba(143, 92, 177, 0.28)" : "none",
                  "&:hover": { 
                    color: "var(--primary)",
                    background: "rgba(143, 92, 177, 0.12)"
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {!minimal && (
              <Button
                onClick={() => navigate("/register")}
                startIcon={<HandshakeIcon />}
                sx={{
                  mx: 0.5,
                  px: 1.8,
                  py: 0.9,
                  borderRadius: "999px",
                  color: "white",
                  background: "var(--gradient)",
                  textTransform: "none",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 22px rgba(143, 92, 177, 0.3)",
                  "& .MuiButton-startIcon": { m: 0, marginInlineEnd: 0.7 },
                  "&:hover": {
                    background: "var(--gradient)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 28px rgba(143, 92, 177, 0.42)",
                  },
                }}
              >
                {t("contact1.register_btn")}
              </Button>
            )}

            {/* Language Switcher */}
            <Button
              onClick={toggleLang}
              startIcon={null}
              sx={{
                mx: 1,
                px: 2.5,
                py: 0.8,
                color: (scrolled && theme.palette.mode === 'light') ? "var(--text-dark)" : "white",
                border: "1.5px solid",
                borderColor: "rgba(143, 92, 177, 0.4)",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.85rem",
                background: "rgba(143, 92, 177, 0.05)",
                backdropFilter: "blur(10px)",
                direction: "ltr",
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "var(--gradient)",
                  color: "white",
                  borderColor: "transparent",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(143, 92, 177, 0.4)",
                  "& .language-icon": {
                    transform: "rotate(180deg)",
                  },
                },
              }}
            >
              <LanguageIcon
                className="language-icon"
                sx={{ fontSize: 20, flexShrink: 0, transition: "transform 0.5s ease" }}
              />
              {currentLang}
            </Button>

            {/* Theme Toggle - Modern Pill Style */}
            <Box
              onClick={colorMode.toggleColorMode}
              sx={{
                mx: 0.5,
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "14px",
                background: (scrolled && theme.palette.mode === 'light') 
                  ? "rgba(0,0,0,0.05)" 
                  : "rgba(255,255,255,0.1)",
                border: "1px solid",
                borderColor: "var(--border-color)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  transform: "translateY(-2px)",
                  borderColor: "var(--primary)",
                  boxShadow: theme.palette.mode === "dark" 
                    ? "0 0 15px rgba(143, 92, 177, 0.3)" 
                    : "0 0 15px rgba(251, 191, 36, 0.3)",
                },
              }}
            >
              <Motion.div
                key={theme.palette.mode}
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon sx={{ color: "#fbbf24", fontSize: 24 }} />
                ) : (
                  <Brightness4Icon sx={{ color: "var(--primary)", fontSize: 24 }} />
                )}
              </Motion.div>
            </Box>
          </Box>

          {/* Mobile Menu Controls */}
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              gap: 1.5,
              order: isArabic ? 1 : 2,
            }}
          >
            {!minimal && (
              <IconButton
                aria-label={isArabic ? "فتح القائمة" : "Open navigation menu"}
                sx={{
                  color: (scrolled && theme.palette.mode === 'light') ? "var(--text-dark)" : "white",
                  background: "rgba(143, 92, 177, 0.1)",
                  borderRadius: "12px",
                  p: 1,
                  "&:hover": { background: "rgba(143, 92, 177, 0.2)" }
                }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor={isArabic ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark' 
              ? "rgba(17, 17, 17, 0.95)" 
              : "rgba(255, 255, 255, 0.98)",
            width: 280,
            backdropFilter: "blur(20px)",
            borderLeft: "1px solid var(--border-color)",
            borderRight: "none",
            color: theme.palette.mode === 'dark' ? "white" : "var(--text-dark)",
            padding: 3,
          },
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 210, height: "auto", maxHeight: 82, objectFit: "contain", mb: 1 }}
          />
        </Box>
        <List sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  scrollToSection(item.id);
                  setOpen(false);
                }}
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  backgroundColor: activeSection === item.id ? "rgba(143, 92, 177, 0.1)" : "transparent",
                  color: activeSection === item.id ? "var(--primary)" : "inherit",
                  "&:hover": {
                    backgroundColor: "rgba(143, 92, 177, 0.05)",
                    color: "var(--primary)",
                  },
                }}
              >
                <Box sx={{ marginInlineEnd: 2, display: "flex", color: activeSection === item.id ? "var(--primary)" : "var(--text-muted)" }}>
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: activeSection === item.id ? 700 : 500 }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mt: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate("/register");
                setOpen(false);
              }}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                justifyContent: "center",
                gap: 1,
                color: "white",
                background: "var(--gradient)",
                boxShadow: "0 8px 22px rgba(143, 92, 177, 0.28)",
                "&:hover": { background: "var(--gradient)", transform: "translateY(-1px)" },
              }}
            >
              <HandshakeIcon />
              <Typography sx={{ fontWeight: 800 }}>{t("contact1.register_btn")}</Typography>
            </ListItemButton>
          </ListItem>

          <Box sx={{ my: 2, height: "1px", background: "var(--border-color)" }} />

          <ListItem disablePadding>
            <ListItemButton
              onClick={colorMode.toggleColorMode}
              sx={{
                borderRadius: "12px",
                py: 1.7,
                justifyContent: "center",
                border: "1px solid rgba(143, 92, 177, 0.25)",
                color: "var(--primary)",
                fontWeight: 700,
                background: "rgba(143, 92, 177, 0.05)",
                gap: 1.5,
                "&:hover": {
                  background: "rgba(143, 92, 177, 0.12)",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon sx={{ color: "#fbbf24", fontSize: 22 }} />
              ) : (
                <Brightness4Icon sx={{ color: "var(--primary)", fontSize: 22 }} />
              )}
              <Typography sx={{ fontWeight: 700 }}>
                {theme.palette.mode === "dark"
                  ? (isArabic ? "الوضع الفاتح" : "Light Mode")
                  : (isArabic ? "الوضع الداكن" : "Dark Mode")}
              </Typography>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
              sx={{
                borderRadius: "12px",
                py: 2,
                justifyContent: "center",
                border: "1px solid rgba(143, 92, 177, 0.3)",
                color: "var(--primary)",
                fontWeight: 700,
                background: "rgba(143, 92, 177, 0.05)",
                gap: 1.5,
                "&:hover": {
                  background: "var(--gradient)",
                  color: "white",
                  "& .lang-icon-mob": { color: "white" }
                },
              }}
            >
              <LanguageIcon className="lang-icon-mob" sx={{ fontSize: 20, color: "var(--primary)" }} />
              {i18n.language === 'ar' ? "English" : "العربية"}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
