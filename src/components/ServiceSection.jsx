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
      icon: <DirectionsCarIcon sx={{ fontSize: 44 }} />,
      title: t("service.feature1_title"),
      description: t("service.feature1_desc"),
    },
    {
      icon: <BuildIcon sx={{ fontSize: 44 }} />,
      title: t("service.feature2_title"),
      description: t("service.feature2_desc"),
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 44 }} />,
      title: t("service.feature3_title"),
      description: t("service.feature3_desc"),
    },
    {
      icon: <LocalOfferIcon sx={{ fontSize: 44 }} />,
      title: t("service.feature4_title"),
      description: t("service.feature4_desc"),
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 44 }} />,
      title: t("service.feature5_title"),
      description: t("service.feature5_desc"),
    }
  ];

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        background: "var(--bg-section-alt)",
        width: "100%",
        transition: "background-color 0.4s ease",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "var(--primary)",
              mb: 2,
              fontSize: { xs: "28px", sm: "36px", md: "44px" },
              letterSpacing: "-0.5px",
            }}
          >
            {t("service.title")}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "var(--text-muted)",
              mb: { xs: 5, md: 7 },
              fontSize: { xs: "1rem", md: "1.1rem" },
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {t("service.subtitle") || "Professional services to keep you moving"}
          </Typography>
        </motion.div>

        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{ width: "100%", maxWidth: 360 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "20px",
                    textAlign: "center",
                    padding: { xs: "35px 20px", md: "50px 25px" },
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    color: "var(--text-dark)",
                    backgroundColor: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    height: "100%",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: "var(--shadow-hover)",
                      borderColor: "var(--primary-light)",
                      transform: "translateY(-6px)",
                      "& .feature-icon": { 
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box 
                    className="feature-icon"
                    sx={{ 
                      color: "var(--primary)", 
                      mb: 2.5, 
                      transition: "all 0.35s ease",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    className="feature-title"
                    sx={{
                      fontWeight: 600,
                      mb: 1.5,
                      color: "var(--primary)",
                      transition: "color 0.35s ease",
                      fontSize: { xs: "18px", md: "20px" },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    className="feature-desc"
                    sx={{
                      fontSize: { xs: 14, md: 15 },
                      lineHeight: 1.7,
                      color: "var(--text-muted)",
                      transition: "color 0.35s ease",
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
