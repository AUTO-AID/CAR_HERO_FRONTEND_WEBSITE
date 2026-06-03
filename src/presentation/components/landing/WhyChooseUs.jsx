import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedIcon from "@mui/icons-material/Verified";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: DirectionsCarIcon,
      title: t("why.features.assistance.title"),
      description: t("why.features.assistance.desc"),
    },
    {
      icon: LocalOfferIcon,
      title: t("why.features.pricing.title"),
      description: t("why.features.pricing.desc"),
    },
    {
      icon: BuildIcon,
      title: t("why.features.come_to_you.title"),
      description: t("why.features.come_to_you.desc"),
    },
    {
      icon: VerifiedIcon,
      title: t("why.features.certified.title"),
      description: t("why.features.certified.desc"),
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        backgroundColor: "var(--bg-light)",
        textAlign: "center",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Section Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--gradient)",
            mx: "auto",
            mb: 2,
            boxShadow: "0 8px 24px rgba(143, 92, 177, 0.25)",
          }}
        >
          <Inventory2Icon sx={{ fontSize: 32, color: "#fff" }} />
        </Box>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
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
          {t("why.title")}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "var(--text-muted)",
            mb: { xs: 5, md: 7 },
            maxWidth: 550,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.7,
          }}
        >
          {t("why.subtitle")}
        </Typography>
      </motion.div>

      {/* Features Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "20px", md: "28px" },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            style={{
              flexGrow: 1,
              flexBasis: "100%",
              maxWidth: "540px",
              minWidth: "300px",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: "22px", md: "28px 32px" },
                borderRadius: "20px",
                backgroundColor: "var(--card-bg)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                height: "100%",
                textAlign: "left",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "var(--shadow-hover)",
                  borderColor: "var(--primary-light)",
                  "& .why-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              {/* Icon */}
              <Box
                className="why-icon"
                sx={{
                  fontSize: { xs: "42px", md: "48px" },
                  color: "var(--primary)",
                  width: { xs: "52px", md: "60px" },
                  display: "flex",
                  justifyContent: "center",
                  mt: 0.5,
                  flexShrink: 0,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    animation: "bounce-subtle 0.5s ease",
                  },
                }}
              >
                <feature.icon fontSize="inherit" />
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  width: "2px",
                  minHeight: "100%",
                  background: "var(--border-color)",
                  mx: { xs: "16px", md: "22px" },
                }}
              />

              {/* Text */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    background: "var(--gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: { xs: "17px", md: "20px" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--text-muted)",
                    lineHeight: 1.75,
                    fontSize: { xs: 14, md: 15 },
                  }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
