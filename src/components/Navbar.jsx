
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
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../main";
import { useContext } from "react";

const Navbar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: t("home"), id: "home" },
    { label: t("features"), id: "features" },
    { label: t("screenshot"), id: "screenshot" },
    { label: t("team"), id: "team" },
    { label: t("contact"), id: "contact" },
    { label: t("download1"), id: "download" },
  ];

  // زر اللغة
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

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: { xs: 60, md: 70 },
          display: "flex",
          justifyContent: "center",
          background:
            "linear-gradient(to right, rgba(181, 126, 220, 0.6), rgba(17, 17, 17, 0.6))",
          boxShadow: "none",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="CarHero Logo"
            sx={{
              height: { xs: 110, sm: 150, md: 150 },
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("home")}
          />

          {/* Desktop Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  color: activeSection === item.id ? "#B57EDC" : "white",
                  fontWeight: activeSection === item.id ? "bold" : "normal",
                  "&:hover": { color: "#B57EDC" },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* زر اللغة Desktop */}
            <Button
              onClick={toggleLang}
              sx={{
                ml: 2,
                px: 2,
                py: 0.5,
                color: "white",
                border: "1px solid #B57EDC",
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(6px)",
                "&:hover": {
                  background: "linear-gradient(45deg, #B57EDC, #6a1b9a)",
                },
              }}
            >
              {currentLang}
            </Button>

            {/* Dark Mode Toggle Desktop */}
            <IconButton
              sx={{ ml: 1, color: "white" }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton
              sx={{ color: "white", mr: 1 }}
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            background:
              "linear-gradient(to bottom, rgba(181, 126, 220, 0.95), rgba(17, 17, 17, 0.95))",
            width: 250,
            height: "50%",
            color: "white",
            paddingTop: 3,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  scrollToSection(item.id);
                  setOpen(false);
                }}
                sx={{
                  textAlign: "center",
                  color: activeSection === item.id ? "#B57EDC" : "white",
                  fontWeight: activeSection === item.id ? "bold" : "normal",
                  "&:hover": { color: "#B57EDC" },
                }}
              >
                {item.label}
              </ListItemButton>
            </ListItem>
          ))}

          {/* زر اللغة Mobile */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                toggleLang();
                setOpen(false);
              }}
              sx={{
                mt: 1,
                textAlign: "center",
                fontWeight: "bold",
                color: "#B57EDC",
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {currentLang}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
