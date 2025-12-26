import React from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import downloadBg from "../assets/header-bg.jpg";
import { useTranslation } from "react-i18next";

const DownloadSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      id="download"
      sx={{
        width: "100%",
        minHeight: { xs: "90vh", md: "100vh" },
        backgroundImage: `
          linear-gradient(to right, var(--primary), var(--bg-light)),
          url(${downloadBg})
        `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-light)",
        textAlign: "center",
        padding: { xs: "40px 15px", sm: "60px 20px" },
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          mb: { xs: 1, sm: 2 },
          fontSize: { xs: "28px", sm: "36px", md: "48px" },
        }}
      >
        {t("download.title")}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          mb: { xs: 3, sm: 4 },
          fontSize: { xs: "14px", sm: "17px" },
          opacity: 0.9,
          maxWidth: "700px",
        }}
      >
        {t("download.subtitle")}
      </Typography>

      {/* Store Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "25px",
          mb: 6,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Play Store"
          style={{ width: "180px", cursor: "pointer" }}
        />
      </Box>

      {/* Updates Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          letterSpacing: "2px",
          mb: 3,
          fontSize: { xs: "16px", sm: "22px" },
        }}
      >
        {t("download.updates")}
      </Typography>

      {/* Email Box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.15)",
          padding: { xs: "4px 8px", sm: "6px 12px" },
          borderRadius: "30px",
          width: { xs: "95%", sm: "400px", md: "450px" },
          backdropFilter: "blur(6px)",
        }}
      >
        <TextField
          placeholder={t("download.emailPlaceholder")}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { color: "var(--text-light)", fontSize: { xs: "14px", sm: "16px" } },
          }}
          sx={{ flex: 1 }}
        />
        <IconButton sx={{ color: "var(--text-light)" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DownloadSection;
