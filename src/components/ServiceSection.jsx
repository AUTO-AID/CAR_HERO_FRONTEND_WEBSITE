import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const ServiceSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      title: t("service.feature1_title"),
      description: t("service.feature1_desc"),
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      title: t("service.feature2_title"),
      description: t("service.feature2_desc"),
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: t("service.feature3_title"),
      description: t("service.feature3_desc"),
    },
    {
      icon: <LocalOfferIcon sx={{ fontSize: 40 }} />,
      title: t("service.feature4_title"),
      description: t("service.feature4_desc"),
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: t("service.feature5_title"),
      description: t("service.feature5_desc"),
    }
  ];

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        background: "var(--bg-light)",
        width: "100%",
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "var(--text-dark)",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "28px", sm: "36px", md: "42px" },
          }}
        >
          {t("service.title")}
        </Typography>

        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", maxWidth: 360 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "20px",
                    textAlign: "center",
                    padding: { xs: "30px 15px", md: "50px 20px" },
                    transition: "all 0.3s ease",
                    color: "var(--text-dark)",
                    backgroundColor: "var(--bg-section-alt)",
                    border: "1px solid var(--border-color)",
                    height: "100%",
                    "&:hover": {
                      background: "var(--gradient)",
                      color: "var(--text-light)",
                      "& svg": { color: "var(--text-light)" },
                      "& .feature-title": { color: "var(--text-light)" },
                    },
                  }}
                >
                  <Box sx={{ color: "var(--primary)", mb: 2, transition: "color 0.3s ease" }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    className="feature-title"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: "var(--primary)",
                      transition: "color 0.3s ease",
                      fontSize: { xs: "18px", md: "20px" },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 14, md: 15 },
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ServiceSection;
