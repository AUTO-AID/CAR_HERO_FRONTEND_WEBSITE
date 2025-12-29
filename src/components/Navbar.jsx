
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import logo from "../assets/logo_carHero.png";
// import i18n from "../i18n"; // ← إضافة مهمة

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   const navItems = [
//     { label: "Home", id: "home" },
//     { label: "Features", id: "features" },
//     { label: "Screenshot", id: "screenshot" },
//     { label: "Team", id: "team" },
//     { label: "Contact", id: "contact" },
//     { label: "Download", id: "download" },
//   ];

//   // زر اللغة
//   const toggleLang = () => {
//     i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
//   };

//   const currentLang = i18n.language === "ar" ? "EN" : "AR";

//   // scroll function
//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   React.useEffect(() => {
//     const sections = navItems.map((item) => document.getElementById(item.id));

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       {
//         threshold: 0.6,
//       }
//     );

//     sections.forEach((sec) => {
//       if (sec) observer.observe(sec);
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           height: { xs: 60, md: 70 },
//           display: "flex",
//           justifyContent: "center",
//           background:
//             "linear-gradient(to right, rgba(181, 126, 220, 0.6), rgba(17, 17, 17, 0.6))",
//           boxShadow: "none",
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
//           {/* Logo */}
//           <Box
//             component="img"
//             src={logo}
//             alt="CarHero Logo"
//             sx={{
//               height: { xs: 110, sm: 150, md: 150 },
//               cursor: "pointer",
//             }}
//             onClick={() => scrollToSection("home")}
//           />

//           {/* Desktop Links */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               alignItems: "center",
//               gap: 3,
//             }}
//           >
//             {navItems.map((item) => (
//               <Button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 sx={{
//                   textTransform: "none",
//                   fontSize: "1rem",
//                   color: activeSection === item.id ? "#B57EDC" : "white",
//                   fontWeight: activeSection === item.id ? "bold" : "normal",
//                   "&:hover": { color: "#B57EDC" },
//                 }}
//               >
//                 {item.label}
//               </Button>
//             ))}

//             {/* 🌍 زر اللغة – Desktop */}
//             <Button
//               onClick={toggleLang}
//               sx={{
//                 ml: 2,
//                 px: 2,
//                 py: 0.5,
//                 color: "white",
//                 border: "1px solid #B57EDC",
//                 borderRadius: "20px",
//                 textTransform: "none",
//                 fontWeight: "bold",
//                 background: "rgba(255,255,255,0.1)",
//                 backdropFilter: "blur(6px)",
//                 "&:hover": {
//                   background: "linear-gradient(45deg, #B57EDC, #6a1b9a)",
//                 },
//               }}
//             >
//               {currentLang}
//             </Button>
//           </Box>

//           {/* Mobile Menu Icon */}
//           <IconButton
//             sx={{
//               color: "white",
//               display: { xs: "flex", md: "none" },
//             }}
//             onClick={() => setOpen(true)}
//           >
//             <MenuIcon sx={{ fontSize: 30 }} />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={() => setOpen(false)}
//         PaperProps={{
//           sx: {
//             background:
//               "linear-gradient(to bottom, rgba(181, 126, 220, 0.95), rgba(17, 17, 17, 0.95))",
//             width: 250,
//             height: "50%",
//             color: "white",
//             paddingTop: 3,
//           },
//         }}
//       >
//         <List>
//           {navItems.map((item) => (
//             <ListItem key={item.id} disablePadding>
//               <ListItemButton
//                 onClick={() => {
//                   scrollToSection(item.id);
//                   setOpen(false);
//                 }}
//                 sx={{
//                   textAlign: "center",
//                   color: activeSection === item.id ? "#B57EDC" : "white",
//                   fontWeight: activeSection === item.id ? "bold" : "normal",
//                   "&:hover": { color: "#B57EDC" },
//                 }}
//               >
//                 {item.label}
//               </ListItemButton>
//             </ListItem>
//           ))}

//           {/* 🌍 زر اللغة – Mobile */}
//           <ListItem disablePadding>
//             <ListItemButton
//               onClick={() => {
//                 toggleLang();
//                 setOpen(false);
//               }}
//               sx={{
//                 mt: 1,
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 color: "#B57EDC",
//                 borderTop: "1px solid rgba(255,255,255,0.2)",
//               }}
//             >
//               {currentLang}
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
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
import logo from "../assets/logo_carHero.png";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import GetAppIcon from "@mui/icons-material/GetApp";
import { ColorModeContext } from "../ColorModeContext";
import { useContext } from "react";

const Navbar = ({ minimal = false }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("home"), id: "home" },
    { label: t("features"), id: "features" },
    { label: t("screenshot"), id: "screenshot" },
    { label: t("contact"), id: "contact" },
    { label: t("download1"), id: "download" },
  ];

  // Better icons for drawer
  const getIcon = (id) => {
    switch (id) {
      case "home": return <HomeIcon />;
      case "features": return <StarIcon />;
      case "screenshot": return <CameraAltIcon />;
      case "contact": return <ContactSupportIcon />;
      case "download": return <GetAppIcon />;
      default: return <StarIcon />;
    }
  };

  // Lang toggle
  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const currentLang = i18n.language === "ar" ? "EN" : "AR";

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const sections = navItems.map((item) => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
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
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2.5, md: 8 } }}>
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="CarHero Logo"
            sx={{
              height: { xs: 80, sm: 100, md: 110 },
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.05)" },
              filter: scrolled && theme.palette.mode === 'light' ? "none" : "brightness(1) contrast(1.1)",
            }}
            onClick={() => minimal ? (window.location.href = '/') : scrollToSection("home")}
          />

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {!minimal && navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  px: 2,
                  color: (activeSection === item.id) 
                    ? "var(--primary)" 
                    : (scrolled && theme.palette.mode === 'light') ? "var(--text-dark)" : "white",
                  fontWeight: activeSection === item.id ? 700 : 500,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 8,
                    left: "50%",
                    width: activeSection === item.id ? "60%" : "0%",
                    height: "2px",
                    background: "var(--gradient)",
                    transform: "translateX(-50%)",
                    transition: "all 0.3s ease",
                    borderRadius: "2px",
                  },
                  "&:hover": { 
                    color: "var(--primary)",
                    "&::after": { width: "60%" }
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Language Switcher */}
            <Button
              onClick={toggleLang}
              startIcon={<LanguageIcon sx={{ fontSize: 20 }} />}
              sx={{
                ml: 2,
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
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "& .MuiButton-startIcon": {
                  mr: 1,
                  transition: "transform 0.5s ease",
                },
                "&:hover": {
                  background: "var(--gradient)",
                  color: "white",
                  borderColor: "transparent",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(143, 92, 177, 0.4)",
                  "& .MuiButton-startIcon": {
                    transform: "rotate(180deg)",
                  },
                },
              }}
            >
              {currentLang}
            </Button>

            {/* Theme Toggle - Modern Pill Style */}
            <Box
              onClick={colorMode.toggleColorMode}
              sx={{
                ml: 1.5,
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
              <motion.div
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
              </motion.div>
            </Box>
          </Box>

          {/* Mobile Menu Controls */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.5 }}>
            <Box
              onClick={colorMode.toggleColorMode}
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "12px",
                background: "rgba(143, 92, 177, 0.1)",
                color: (scrolled && theme.palette.mode === 'light') ? "var(--text-dark)" : "white",
                transition: "all 0.3s ease",
              }}
            >
              <motion.div
                key={theme.palette.mode}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon sx={{ color: "#fbbf24", fontSize: 22 }} />
                ) : (
                  <Brightness4Icon sx={{ color: "var(--primary)", fontSize: 22 }} />
                )}
              </motion.div>
            </Box>
            {!minimal && (
              <IconButton
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
        anchor={i18n.language === 'ar' ? 'left' : 'right'}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark' 
              ? "rgba(17, 17, 17, 0.95)" 
              : "rgba(255, 255, 255, 0.98)",
            width: 280,
            backdropFilter: "blur(20px)",
            borderLeft: i18n.language === 'ar' ? 'none' : "1px solid var(--border-color)",
            borderRight: i18n.language === 'ar' ? "1px solid var(--border-color)" : 'none',
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
            sx={{ height: 80, mb: 1 }}
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
                <Box sx={{ mr: 2, display: "flex", color: activeSection === item.id ? "var(--primary)" : "var(--text-muted)" }}>
                  {getIcon(item.id)}
                </Box>
                <Typography sx={{ fontWeight: activeSection === item.id ? 700 : 500 }}>
                  {item.label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}

          <Box sx={{ my: 2, height: "1px", background: "var(--border-color)" }} />

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
              {i18n.language === 'ar' ? "English Language" : "اللغة العربية"}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
