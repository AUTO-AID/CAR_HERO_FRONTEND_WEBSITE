import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, YouTube, Instagram } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../assets/logo_carHero.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
const { t } = useTranslation();

const socialIcons = [Facebook, Twitter, YouTube, GoogleIcon, Instagram];

return (
<Box
sx={{
textAlign: "center",
py: 6,
background: "linear-gradient(to right, #B57EDC, #111111)",
color: "white",
}}
>
{/* Logo */}
<Box
component="img"
src={logo}
alt={t("footer.logoAlt") || "CarHero Logo"}
sx={{
width: "100%",
maxWidth: 300,
height: "auto",
mb: 2,
}}
/>

  {/* Social Icons */}
  <Box
    sx={{
      display: "flex",
      gap: 3,
      justifyContent: "center",
      mb: 4,
      flexWrap: "wrap",
    }}
  >
    {socialIcons.map((Icon, i) => (
      <IconButton
        key={i}
        sx={{
          color: "white",
          width: 45,
          height: 45,
          transition: "0.3s",
          "&:hover": {
            background: "linear-gradient(to right, #B57EDC, #111111)",
            color: "white",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Icon />
      </IconButton>
    ))}
  </Box>

  {/* Privacy / Terms */}
  <Typography sx={{ mb: 1, fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
    {t("footer.privacy") || "Privacy | Terms and Conditions"}
  </Typography>

  {/* Copyright */}
  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}>
    {t("footer.copyright") || "© 2025 CarHero – All rights reserved."}
  </Typography>
</Box>
);
};

export default Footer;
