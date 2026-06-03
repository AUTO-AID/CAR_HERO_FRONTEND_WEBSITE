import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import downloadBg from "@/assets/header-bg.jpg";
import { useTranslation } from "react-i18next";

const DownloadSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

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
        <Box
          component="a"
          href="#"
          sx={{
            display: "inline-block",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "12px",
            overflow: "hidden",
            "&:hover": {
              transform: "translateY(-6px) scale(1.05)",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Play Store"
            style={{ width: "200px", cursor: "pointer", display: "block" }}
          />
        </Box>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || isSuccess}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { color: "var(--text-light)", fontSize: { xs: "14px", sm: "16px" } },
          }}
          sx={{ flex: 1 }}
        />
        <IconButton onClick={handleSubmit} disabled={!email || isSubmitting || isSuccess} sx={{ color: isSuccess ? "#4ade80" : "var(--text-light)" }}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : isSuccess ? <CheckCircleIcon /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default DownloadSection;
