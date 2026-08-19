import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  BuildCircle,
  Close,
  ContactSupport,
  Handshake,
  Home,
  Menu,
  PhoneIphone,
  WorkspacePremium,
} from "@mui/icons-material";
import { Languages, Moon, Sun } from "lucide-react";
import { motion as Motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import logo from "@/assets/logo_carHero.webp";
import { ColorModeContext } from "@/application/contexts/color-mode.context";

const labels = {
  ar: {
    home: "الرئيسية",
    // كان «معلومات عن التطبيق» طويلاً، و«أخرى» لا يدل على محتواه إطلاقاً
    appInfo: "التطبيق",
    pricing: "الأسعار",
    services: "الخدمات",
    contact: "تواصل",
    register: "انضم كمزود",
    menu: "فتح القائمة",
    close: "إغلاق القائمة",
    homeLink: "Car Hero — الانتقال إلى الصفحة الرئيسية",
    langToggle: "تغيير اللغة إلى الإنجليزية",
    light: "الوضع الفاتح",
    dark: "الوضع الداكن",
    providerTooltip: "سجّل ورشتك أو خدمتك لتستقبل طلبات السائقين عبر Car Hero.",
  },
  en: {
    home: "Home",
    appInfo: "The App",
    pricing: "Pricing",
    services: "Services",
    contact: "Contact",
    register: "Join as Provider",
    menu: "Open menu",
    close: "Close menu",
    homeLink: "Car Hero — go to home page",
    langToggle: "Switch language to Arabic",
    light: "Light Mode",
    dark: "Dark Mode",
    providerTooltip: "Register your workshop or service to receive driver requests through Car Hero.",
  },
};

const Navbar = ({ minimal = false }) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isArabic = i18n.language === "ar";
  const text = isArabic ? labels.ar : labels.en;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(
    () => [
      { label: text.home, path: "/", icon: <Home /> },
      { label: text.services, path: "/services", icon: <BuildCircle /> },
      { label: text.appInfo, path: "/app", icon: <PhoneIphone /> },
      { label: text.pricing, path: "/pricing", icon: <WorkspacePremium /> },
      { label: text.contact, path: "/contact", icon: <ContactSupport /> },
    ],
    [text],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const toggleLang = () => {
    i18n.changeLanguage(isArabic ? "en" : "ar");
  };

  const navTextColor = scrolled || pathname !== "/" ? "var(--text-dark)" : "white";

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? theme.palette.mode === "dark"
              ? "rgba(13, 8, 21, 0.9)"
              : "rgba(255, 255, 255, 0.9)"
            : "rgba(13, 8, 21, 0.2)",
          backdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid rgba(255,255,255,0.08)",
          transition: "all 250ms ease",
          zIndex: 1200,
        }}
      >
        <Toolbar
          dir={isArabic ? "rtl" : "ltr"}
          sx={{
            width: "100%",
            maxWidth: 1440,
            mx: "auto",
            minHeight: { xs: "68px !important", lg: "78px !important" },
            px: { xs: 2, sm: 3, lg: 5 },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          {/* كان صورةً بـ onClick: لا تُركَّز بلوحة المفاتيح ولا تُعلَن كعنصر
              تفاعلي. صارت زراً حقيقياً باسم واضح لقارئ الشاشة. */}
          <Box
            component="button"
            type="button"
            aria-label={text.homeLink}
            onClick={() => goTo("/")}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: 44,
              p: 0,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt=""
              width={560}
              height={220}
              fetchPriority="high"
              decoding="async"
              sx={{
                width: { xs: 142, sm: 164, lg: 174 },
                maxHeight: 58,
                objectFit: "contain",
                filter: theme.palette.mode === "dark" ? "drop-shadow(0 8px 18px rgba(165,126,216,0.28))" : "none",
              }}
            />
          </Box>

          {!minimal && (
            <Box
              component="nav"
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                px: 0.75,
                py: 0.65,
                borderRadius: "999px",
                border: "1px solid",
                borderColor: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.14)",
                background: scrolled ? "rgba(143,92,177,0.06)" : "rgba(255,255,255,0.08)",
              }}
            >
              {navItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    onClick={() => goTo(item.path)}
                    aria-current={active ? "page" : undefined}
                    sx={{
                      minWidth: "auto",
                      minHeight: 44,
                      px: { lg: 1.15, xl: 1.5 },
                      py: 0.8,
                      borderRadius: "999px",
                      color: active ? "white" : navTextColor,
                      background: active ? "var(--gradient)" : "transparent",
                      boxShadow: active ? "0 10px 24px rgba(143, 92, 177, 0.3)" : "none",
                      textTransform: "none",
                      fontWeight: active ? 900 : 750,
                      fontSize: { lg: "0.82rem", xl: "0.9rem" },
                      whiteSpace: "nowrap",
                      "&:hover": {
                        background: active ? "var(--gradient)" : "rgba(143, 92, 177, 0.13)",
                        color: active ? "white" : "var(--primary)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1 } }}>
            <Box
              component="button"
              type="button"
              className="navbar-lang-toggle"
              aria-label={text.langToggle}
              onClick={toggleLang}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                color: navTextColor,
                borderColor: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.18)",
                background: scrolled ? "rgba(143,92,177,0.06)" : "rgba(255,255,255,0.08)",
              }}
            >
              <Languages size={16} strokeWidth={2.4} />
              <span className={isArabic ? "active" : ""}>AR</span>
              <span className={!isArabic ? "active" : ""}>EN</span>
            </Box>

            <Box
              component="button"
              type="button"
              className={`navbar-theme-toggle ${theme.palette.mode === "dark" ? "is-dark" : ""}`}
              aria-label={theme.palette.mode === "dark" ? text.light : text.dark}
              onClick={colorMode.toggleColorMode}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                color: navTextColor,
                borderColor: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.18)",
                background: scrolled ? "rgba(143,92,177,0.06)" : "rgba(255,255,255,0.08)",
              }}
            >
              <span className="navbar-theme-thumb" />
              <Motion.span
                key={theme.palette.mode}
                initial={{ opacity: 0, rotate: -25 }}
                animate={{ opacity: 1, rotate: 0 }}
                className="navbar-theme-icons"
              >
                <Sun size={16} strokeWidth={2.5} />
                <Moon size={16} strokeWidth={2.5} />
              </Motion.span>
            </Box>

            {!minimal && (
              <Tooltip title={text.providerTooltip} arrow placement="bottom" enterDelay={250}>
                <Button
                  className="navbar-provider-cta"
                  startIcon={<Handshake />}
                  onClick={() => goTo("/register")}
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                >
                  {text.register}
                </Button>
              </Tooltip>
            )}

            {!minimal && (
              <IconButton
                aria-label={text.menu}
                onClick={() => setOpen(true)}
                sx={{
                  display: { xs: "inline-flex", lg: "none" },
                  width: 44,
                  height: 44,
                  color: navTextColor,
                  border: "1px solid",
                  borderColor: scrolled ? "var(--border-color)" : "rgba(255,255,255,0.2)",
                  background: scrolled ? "rgba(143,92,177,0.06)" : "rgba(255,255,255,0.08)",
                }}
              >
                <Menu />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={isArabic ? "right" : "left"}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: 310, sm: 360 },
            background: "var(--card-bg)",
            color: "var(--text-dark)",
            borderInlineStart: isArabic ? "1px solid var(--border-color)" : 0,
            borderInlineEnd: isArabic ? 0 : "1px solid var(--border-color)",
            p: 2.5,
          },
        }}
      >
        <Box dir={isArabic ? "rtl" : "ltr"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box component="img" src={logo} alt="Car Hero" width={560} height={220} decoding="async" sx={{ width: 178, height: "auto", objectFit: "contain" }} />
          <IconButton aria-label={text.close} onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        <List dir={isArabic ? "rtl" : "ltr"} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  onClick={() => goTo(item.path)}
                  sx={{
                    gap: 1.4,
                    borderRadius: "12px",
                    py: 1.45,
                    color: active ? "var(--primary)" : "var(--text-dark)",
                    background: active ? "rgba(143,92,177,0.12)" : "transparent",
                    "&:hover": { background: "rgba(143,92,177,0.1)", color: "var(--primary-text)" },
                  }}
                >
                  {item.icon}
                  <Typography sx={{ fontWeight: active ? 900 : 750 }}>{item.label}</Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 2.5, display: "grid", gap: 1.2 }} dir={isArabic ? "rtl" : "ltr"}>
          <Tooltip title={text.providerTooltip} arrow placement="top" enterDelay={250}>
            <Button className="navbar-provider-cta mobile" startIcon={<Handshake />} onClick={() => goTo("/register")}>
              {text.register}
            </Button>
          </Tooltip>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            <Box component="button" type="button" className="navbar-lang-toggle mobile" aria-label={text.langToggle} onClick={toggleLang}>
              <Languages size={16} strokeWidth={2.4} />
              <span className={isArabic ? "active" : ""}>AR</span>
              <span className={!isArabic ? "active" : ""}>EN</span>
            </Box>
            <Box
              component="button"
              type="button"
              className={`navbar-theme-toggle mobile ${theme.palette.mode === "dark" ? "is-dark" : ""}`}
              aria-label={theme.palette.mode === "dark" ? text.light : text.dark}
              onClick={colorMode.toggleColorMode}
            >
              <span className="navbar-theme-thumb" />
              <span className="navbar-theme-icons">
                <Sun size={16} strokeWidth={2.5} />
                <Moon size={16} strokeWidth={2.5} />
              </span>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
