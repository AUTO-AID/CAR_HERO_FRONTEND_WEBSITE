import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Stars,
  CardGiftcard,
  Build,
  TrendingUp,
  Speed,
  WorkspacePremium,
  InfoOutlined,
  Smartphone,
} from "@mui/icons-material";

const LoyaltyRewards = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const steps = [
    {
      icon: <Build sx={{ fontSize: 32 }} />,
      title: t("loyalty.how_it_works.step1.title"),
      desc: t("loyalty.how_it_works.step1.desc"),
    },
    {
      icon: <Stars sx={{ fontSize: 32 }} />,
      title: t("loyalty.how_it_works.step2.title"),
      desc: t("loyalty.how_it_works.step2.desc"),
    },
    {
      icon: <CardGiftcard sx={{ fontSize: 32 }} />,
      title: t("loyalty.how_it_works.step3.title"),
      desc: t("loyalty.how_it_works.step3.desc"),
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Box
      component="section"
      id="loyalty-rewards"
      sx={{
        py: { xs: 8, md: 15 },
        background: "var(--bg-light)",
        transition: "background-color 0.4s ease",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(143, 92, 177, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "var(--primary)",
                mb: 2,
                fontSize: { xs: "32px", md: "48px" },
                letterSpacing: "-1px",
              }}
            >
              {t("loyalty.title")}
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              {t("loyalty.subtitle")}
            </Typography>
          </motion.div>
        </Box>

        {/* How it Works Visualization */}
        <Grid container spacing={6} sx={{ mb: 12 }} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    position: "relative",
                    maxWidth: 300,
                    mx: "auto",
                    px: 2,
                  }}
                >
                  {/* Step Icon */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      backgroundColor: "var(--card-bg)",
                      border: "2px solid var(--border-color)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary)",
                      mx: "auto",
                      mb: 3,
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                        borderColor: "var(--primary)",
                        color: "#fff",
                        background: "var(--gradient)",
                      },
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: "var(--text-dark)",
                      textAlign: "center",
                      fontSize: { xs: "1.1rem", md: "1.2rem" },
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      textAlign: "center",
                      px: 1,
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      lineHeight: 1.8,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Comparison Section */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
          sx={{ minHeight: { xs: "auto", md: 420 } }}
        >
          {/* Free Plan Rewards */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "flex", width: "100%", height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 3.5, md: 4 },
                  borderRadius: "24px",
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  height: { xs: 390, sm: 390, md: 410 },
                  minHeight: { xs: 390, sm: 390, md: 410 },
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}
                >
                  <TrendingUp sx={{ color: "var(--text-muted)" }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {t("loyalty.comparison.free.name")}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-muted)" }}
                    >
                      {t("loyalty.comparison.free.multiplier")}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      25% Full
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={25}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "var(--border-color)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "var(--text-muted)",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, minHeight: { xs: 112, md: 124 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Speed sx={{ color: "var(--text-muted)", fontSize: 20 }} />
                    <Typography sx={{ color: "var(--text-dark)" }}>
                      {t("loyalty.comparison.free.reward")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Smartphone
                      sx={{ color: "var(--text-muted)", fontSize: 20 }}
                    />
                    <Typography sx={{ color: "var(--text-dark)" }}>
                      {t("loyalty.comparison.free.vehicles")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                      minHeight: 18,
                      visibility: "hidden",
                    }}
                    aria-hidden="true"
                  >
                    <InfoOutlined sx={{ fontSize: 16 }} />
                    <Typography variant="caption">
                      {t("pricing.app_only_note")}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <button
                    className="register-btn"
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "var(--border-color)",
                      color: "var(--text-dark)",
                    }}
                  >
                    {t("loyalty.cta_get_app")}
                  </button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Premium Plan Rewards */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ display: "flex", width: "100%", height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 3.5, md: 4 },
                  borderRadius: "24px",
                  backgroundColor: "var(--card-bg)",
                  border: "2px solid var(--primary)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  background:
                    "linear-gradient(135deg, var(--card-bg) 0%, rgba(143, 92, 177, 0.05) 100%)",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100px",
                    height: "100px",
                    background:
                      "radial-gradient(circle, rgba(143, 92, 177, 0.2) 0%, transparent 70%)",
                  },
                  width: "100%",
                  height: { xs: 390, sm: 390, md: 410 },
                  minHeight: { xs: 390, sm: 390, md: 410 },
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2.5 }}
                >
                  <WorkspacePremium sx={{ color: "var(--primary)" }} />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "var(--primary)" }}
                  >
                    {t("loyalty.comparison.premium.name")}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--primary)", fontWeight: 600 }}
                    >
                      {t("loyalty.comparison.premium.multiplier")}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 800, color: "var(--primary)" }}
                    >
                      100% Full
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "var(--border-color)",
                      overflow: "hidden",
                      "& .MuiLinearProgress-bar": {
                        background: "var(--gradient)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s linear infinite",
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3, minHeight: { xs: 112, md: 124 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Stars sx={{ color: "var(--primary)", fontSize: 24 }} />
                    <Typography
                      sx={{ color: "var(--text-dark)", fontWeight: 600 }}
                    >
                      {t("loyalty.comparison.premium.reward")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <TrendingUp
                      sx={{ color: "var(--primary)", fontSize: 24 }}
                    />
                    <Typography
                      sx={{ color: "var(--text-dark)", fontWeight: 600 }}
                    >
                      {t("loyalty.comparison.premium.vehicles")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <InfoOutlined
                      sx={{ fontSize: 16, color: "var(--primary)" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--text-muted)" }}
                    >
                      {t("pricing.app_only_note")}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <button
                    className="register-btn"
                    style={{ width: "100%", padding: "12px" }}
                  >
                    {t("loyalty.cta_upgrade")}
                  </button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoyaltyRewards;
