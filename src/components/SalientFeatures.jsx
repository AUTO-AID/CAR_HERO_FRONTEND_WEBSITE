import React, { useRef } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import LayersIcon from "@mui/icons-material/Layers";
import ReplayIcon from "@mui/icons-material/Replay";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import LinkIcon from "@mui/icons-material/Link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { motion, useInView } from "framer-motion";
import mockImg from "../assets/hero-pg.png";
import { useTranslation } from "react-i18next";

const iconWrapperStyle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--gradient)",
};

const iconInnerCircle = {
  width: 66,
  height: 66,
  borderRadius: "50%",
  background: "var(--bg-light)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconGradientText = {
  background: "var(--gradient)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontSize: "28px",
};

const SalientFeatures = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // جلب الميزات من ملف الترجمة
  const featuresLeft = t("left_features", { returnObjects: true });
  const featuresRight = t("right_features", { returnObjects: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          py: 10,
          px: { xs: 2, md: 10 },
          background: "var(--bg-light)",
          width: "100%",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          textAlign: i18n.language === "ar" ? "right" : "left",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* SECTION TITLE */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              letterSpacing: "1px",
              background: "var(--gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("salient_title")}
          </Typography>

          <Typography sx={{ maxWidth: 700, mx: "auto", color: "var(--text-muted)" }}>
            {t("salient_description")}
          </Typography>
        </Box>

        {/* CONTENT GRID */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* LEFT SIDE CARDS */}
          <Grid item xs={12} md={4}>
            {featuresLeft.map((item, i) => (
              <Paper
                key={i}
                sx={{
                  p: 3,
                  mb: 4,
                  display: "flex",
                  gap: 3,
                  maxWidth: "350px",
                  mx: "auto",
                  alignItems: "flex-start",
                  transition: "all 0.3s ease",
                  backgroundColor: "var(--bg-section-alt)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color)",
                  "&:hover .innerCircle": {
                    background: "var(--gradient)",
                  },
                  "&:hover .innerIcon": {
                    WebkitTextFillColor: "var(--text-light)",
                  },
                }}
                elevation={0}
              >
                <Box sx={iconWrapperStyle}>
                  <Box className="innerCircle" sx={iconInnerCircle}>
                    <span style={iconGradientText} className="innerIcon">
                      {[
                        <HeadphonesIcon />,
                        <LayersIcon />,
                        <ReplayIcon />,
                      ][i]}
                    </span>
                  </Box>
                </Box>

                <Box>
                  <Typography sx={{ color: "var(--primary)", fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "var(--text-muted)" }}>{item.text}</Typography>
                </Box>
              </Paper>
            ))}
          </Grid>

          {/* CENTER IMAGE — HIDDEN ON MOBILE & TABLET */}
          <Grid
            item
            xs={12}
            md={4}
            textAlign="center"
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <img
              src={mockImg}
              alt="mock"
              style={{ width: "300px", borderRadius: "12px" }}
            />
          </Grid>

          {/* RIGHT SIDE CARDS */}
          <Grid item xs={12} md={4}>
            {featuresRight.map((item, i) => (
              <Paper
                key={i}
                sx={{
                  p: 3,
                  mb: 4,
                  display: "flex",
                  gap: 3,
                  maxWidth: "350px",
                  mx: "auto",
                  alignItems: "flex-start",
                  transition: "all 0.3s ease",
                  backgroundColor: "var(--bg-section-alt)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color)",
                  "&:hover .innerCircle": {
                    background: "var(--gradient)",
                  },
                  "&:hover .innerIcon": {
                    WebkitTextFillColor: "var(--text-light)",
                  },
                }}
                elevation={0}
              >
                <Box sx={iconWrapperStyle}>
                  <Box className="innerCircle" sx={iconInnerCircle}>
                    <span style={iconGradientText} className="innerIcon">
                      {[
                        <SwapVertIcon />,
                        <LinkIcon />,
                        <ArrowRightAltIcon />,
                      ][i]}
                    </span>
                  </Box>
                </Box>

                <Box>
                  <Typography sx={{ color: "var(--primary)", fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "var(--text-muted)" }}>{item.text}</Typography>
                </Box>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default SalientFeatures;
