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

const SalientFeatures = () => {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Get features from translation file
  const featuresLeft = t("left_features", { returnObjects: true });
  const featuresRight = t("right_features", { returnObjects: true });

  const leftIcons = [<HeadphonesIcon />, <LayersIcon />, <ReplayIcon />];
  const rightIcons = [<SwapVertIcon />, <LinkIcon />, <ArrowRightAltIcon />];

  const FeatureCard = ({ item, icon, index, side }) => (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          mb: 3,
          display: "flex",
          gap: { xs: 2.5, md: 3 },
          maxWidth: "360px",
          mx: "auto",
          alignItems: "flex-start",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "var(--card-bg)",
          borderRadius: "18px",
          border: "1px solid var(--border-color)",
          cursor: "pointer",
          "&:hover": {
            boxShadow: "var(--shadow-hover)",
            borderColor: "var(--primary)",
            "& .icon-wrapper": {
              transform: "scale(1.1)",
            },
            "& .icon-inner": {
              background: "rgba(143, 92, 177, 0.1)",
            },
            "& .feature-icon-text": {
              WebkitTextFillColor: "var(--primary)",
            },
          },
        }}
        elevation={0}
      >
        {/* Icon Container */}
        <Box
          className="icon-wrapper"
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--gradient)",
            flexShrink: 0,
            transition: "all 0.35s ease",
          }}
        >
          <Box
            className="icon-inner"
            sx={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "var(--card-bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.35s ease",
            }}
          >
            <Box
              className="feature-icon-text"
              sx={{
                background: "var(--gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.35s ease",
              }}
            >
              {icon}
            </Box>
          </Box>
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "var(--primary)",
              fontWeight: 600,
              mb: 0.75,
              fontSize: { xs: "1rem", md: "1.1rem" },
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              color: "var(--text-muted)",
              fontSize: { xs: "0.9rem", md: "0.95rem" },
              lineHeight: 1.65,
            }}
          >
            {item.text}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        id="screenshot"
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 10 },
          background: "var(--bg-section-alt)",
          width: "100%",
          direction: i18n.language === "ar" ? "rtl" : "ltr",
          textAlign: i18n.language === "ar" ? "right" : "left",
          transition: "background-color 0.4s ease",
        }}
      >
        {/* SECTION TITLE */}
        <Box textAlign="center" mb={7}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                letterSpacing: "0.5px",
                background: "var(--gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "26px", sm: "34px", md: "40px" },
              }}
            >
              {t("salient_title")}
            </Typography>

            <Typography
              sx={{
                maxWidth: 650,
                mx: "auto",
                color: "var(--text-muted)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
              }}
            >
              {t("salient_description")}
            </Typography>
          </motion.div>
        </Box>

        {/* CONTENT GRID */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* LEFT SIDE CARDS */}
          <Grid size={{ xs: 12, md: 4 }}>
            {Array.isArray(featuresLeft) && featuresLeft.map((item, i) => (
              <FeatureCard
                key={i}
                item={item}
                icon={leftIcons[i]}
                index={i}
                side="left"
              />
            ))}
          </Grid>

          {/* CENTER IMAGE */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              animate={{ 
                y: [0, -20, 0] // Continuous floating effect
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                component="img"
                src={mockImg}
                alt="App Preview"
                sx={{
                  width: "100%",
                  maxWidth: "340px",
                  height: "auto",
                  // Removed borderRadius as it might be causing the "frame" look
                  // Using a soft lighting glow instead of a dark heavy shadow
                  filter: "drop-shadow(0 0 30px rgba(143, 92, 177, 0.4))",
                  transition: "transform 0.4s ease",
                  display: "block",
                  mx: "auto",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </motion.div>
          </Grid>

          {/* RIGHT SIDE CARDS */}
          <Grid size={{ xs: 12, md: 4 }}>
            {Array.isArray(featuresRight) && featuresRight.map((item, i) => (
              <FeatureCard
                key={i}
                item={item}
                icon={rightIcons[i]}
                index={i}
                side="right"
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default SalientFeatures;
