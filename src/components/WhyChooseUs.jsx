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

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        backgroundColor: "var(--bg-light)",
        textAlign: "center",
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={iconWrapperStyle} mx="auto" mb={1}>
        <Box sx={iconInnerCircle}>
          <Inventory2Icon sx={iconGradientText} />
        </Box>
      </Box>

      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          letterSpacing: "1px",
          background: "var(--gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "24px", sm: "32px", md: "38px" },
        }}
      >
        {t("why.title")}
      </Typography>

      {/* Subtitle */}
      <Typography sx={{ color: "var(--text-muted)", mb: { xs: 4, md: 6 } }}>
        {t("why.subtitle")}
      </Typography>

      {/* Features Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "20px", md: "30px" },
        }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            style={{
              flexGrow: 1,
              flexBasis: "100%",
              maxWidth: "555px",
              minWidth: "300px",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: "20px", md: "25px 30px" },
                borderRadius: "20px",
                backgroundColor: "var(--bg-section-alt)",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                height: "100%",
                textAlign: "left",
                transition: "all 0.3s ease",
                border: "1px solid var(--border-color)",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  fontSize: { xs: "40px", md: "45px" },
                  color: "#B57EDC",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  width: { xs: "50px", md: "60px" },
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  flexShrink: 0,
                }}
              >
                <feature.icon fontSize="inherit" />
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  width: "2px",
                  minHeight: "100%",
                  backgroundColor: "var(--border-color)",
                  mx: { xs: "15px", md: "20px" },
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
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
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
