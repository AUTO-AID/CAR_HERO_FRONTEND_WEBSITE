import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Switch,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  Star,
  Chat,
  Speed,
  DirectionsCar,
  EmojiEvents,
  Verified,
  InfoOutlined,
  Smartphone,
} from "@mui/icons-material";

const PricingPlans = () => {
  const { t, i18n } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  const isRtl = i18n.language === "ar";

  const freeFeatures = t("pricing.free.features", { returnObjects: true });
  const premiumFeatures = t("pricing.premium.features", {
    returnObjects: true,
  });
  const comparisonRows = [
    {
      label: t("pricing.free.features.0", "Services"),
      free: freeFeatures[0],
      premium: premiumFeatures[0],
    },
    {
      label: t("pricing.free.features.1", "Rewards"),
      free: freeFeatures[1],
      premium: premiumFeatures[1],
    },
    {
      label: t("pricing.free.features.2", "Chat"),
      free: freeFeatures[2],
      premium: premiumFeatures[2],
    },
    {
      label: t("pricing.free.features.3", "Matching"),
      free: freeFeatures[3],
      premium: premiumFeatures[3],
    },
    {
      label: t("pricing.free.features.4", "Vehicles"),
      free: freeFeatures[4],
      premium: premiumFeatures[4],
    },
    {
      label: t("pricing.free.features.5", "Priority"),
      free: freeFeatures[5],
      premium: premiumFeatures[6],
    },
    {
      label: premiumFeatures[5],
      free: "—",
      premium: premiumFeatures[5],
    },
  ];

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        py: { xs: 8, md: 15 },
        px: { xs: 2, sm: 4, md: 8 },
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
          top: "20%",
          left: "-10%",
          width: "40%",
          height: "40%",
          background:
            "radial-gradient(circle, rgba(143, 92, 177, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "var(--primary)",
                mb: 2,
                fontSize: { xs: "32px", sm: "42px", md: "48px" },
                letterSpacing: "-1px",
              }}
            >
              {t("pricing.title")}
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: "1.1rem",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              {t("pricing.subtitle")}
            </Typography>

            {/* Billing Toggle */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "var(--card-bg)",
                  padding: "4px",
                  borderRadius: "100px",
                  position: "relative",
                  border: "1px solid var(--border-color)",
                  minWidth: "240px",
                }}
              >
                {/* Sliding Background */}
                <Box
                  component={motion.div}
                  animate={{
                    left: isRtl
                      ? isYearly
                        ? "4px"
                        : "calc(50% + 2px)"
                      : isYearly
                        ? "calc(50% + 2px)"
                        : "4px",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  sx={{
                    position: "absolute",
                    top: "4px",
                    bottom: "4px",
                    width: "calc(50% - 6px)",
                    backgroundColor: "var(--primary)",
                    borderRadius: "100px",
                    zIndex: 1,
                  }}
                />

                {/* Monthly Option */}
                <Box
                  onClick={() => setIsYearly(false)}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 1.5,
                    px: 3,
                    position: "relative",
                    zIndex: 2,
                    color: !isYearly ? "#fff" : "var(--text-muted)",
                    fontWeight: 700,
                    transition: "color 0.3s ease",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {t("pricing.monthly")}
                </Box>

                {/* Yearly Option */}
                <Box
                  onClick={() => setIsYearly(true)}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 1.5,
                    px: 3,
                    position: "relative",
                    zIndex: 2,
                    color: isYearly ? "#fff" : "var(--text-muted)",
                    fontWeight: 700,
                    transition: "color 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  {t("pricing.yearly")}
                  <Box
                    sx={{
                      background: "#10b981",
                      color: "#fff",
                      px: 0.8,
                      py: 0.2,
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 800,
                    }}
                  >
                    -20%
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Mobile Comparison Table */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            borderRadius: "22px",
            overflow: "hidden",
            border: "1px solid var(--border-color)",
            background: "var(--card-bg)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.95fr 0.95fr",
              background:
                "linear-gradient(135deg, rgba(143, 92, 177, 0.16), rgba(143, 92, 177, 0.04))",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <Box sx={{ p: 1.5 }} />
            <Box sx={{ p: 1.5, textAlign: "center" }}>
              <Typography sx={{ color: "var(--text-dark)", fontWeight: 800, fontSize: "0.86rem" }}>
                {t("pricing.free.name")}
              </Typography>
              <Typography sx={{ color: "var(--text-dark)", fontWeight: 900, fontSize: "1.45rem", lineHeight: 1.2 }}>
                $0
              </Typography>
            </Box>
            <Box
              sx={{
                p: 1.5,
                textAlign: "center",
                background: "rgba(143, 92, 177, 0.14)",
              }}
            >
              <Typography sx={{ color: "var(--primary)", fontWeight: 800, fontSize: "0.86rem" }}>
                {t("pricing.premium.name")}
              </Typography>
              <Typography sx={{ color: "var(--text-dark)", fontWeight: 900, fontSize: "1.45rem", lineHeight: 1.2 }}>
                ${isYearly ? t("pricing.premium.price_yearly") : t("pricing.premium.price_monthly")}
              </Typography>
            </Box>
          </Box>

          {comparisonRows.map((row, idx) => (
            <Box
              key={idx}
              sx={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.95fr 0.95fr",
                borderBottom: idx === comparisonRows.length - 1 ? 0 : "1px solid var(--border-color)",
              }}
            >
              <Box sx={{ p: 1.35, display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "0.72rem", lineHeight: 1.35 }}>
                  {row.label}
                </Typography>
              </Box>
              {[row.free, row.premium].map((value, valueIdx) => (
                <Box
                  key={valueIdx}
                  sx={{
                    p: 1.35,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    background: valueIdx === 1 ? "rgba(143, 92, 177, 0.06)" : "transparent",
                  }}
                >
                  {value === "—" ? (
                    <Typography sx={{ color: "var(--text-muted)", opacity: 0.55, fontWeight: 800 }}>—</Typography>
                  ) : (
                    <Typography
                      sx={{
                        color: "var(--text-dark)",
                        fontSize: "0.68rem",
                        fontWeight: valueIdx === 1 ? 800 : 600,
                        lineHeight: 1.35,
                      }}
                    >
                      {value}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          ))}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              p: 1.5,
              background: "rgba(143, 92, 177, 0.05)",
            }}
          >
            <button
              className="register-btn"
              style={{
                width: "100%",
                padding: "10px 6px",
                fontSize: "12px",
                opacity: 0.85,
                background: "var(--text-muted)",
              }}
            >
              {t("pricing.cta_app")}
            </button>
            <button
              className="register-btn"
              style={{ width: "100%", padding: "10px 6px", fontSize: "12px" }}
            >
              {t("pricing.cta_upgrade")}
            </button>
          </Box>
        </Box>

        <Grid
          container
          spacing={{ xs: 1.5, sm: 3, md: 4 }}
          justifyContent="center"
          alignItems="stretch"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {/* Free Plan */}
          <Grid
            size={{ xs: 6, sm: 5, md: 5, lg: 4.5 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              style={{ display: "flex", width: "100%", maxWidth: 400, height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 6 },
                  width: "100%",
                  height: { xs: 620, sm: 590, md: 580 },
                  minHeight: { xs: 620, sm: 590, md: 580 },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: { xs: "18px", md: "32px" },
                  backgroundColor: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  position: "relative",
                  "&:hover": {
                    borderColor: "var(--primary)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    lineHeight: 1.25,
                  }}
                >
                  {t("pricing.free.name")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", mb: { xs: 2.5, md: 4 } }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "var(--text-dark)",
                      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
                    }}
                  >
                    $0
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      ml: 1,
                      fontSize: { xs: "0.75rem", md: "1rem" },
                    }}
                  >
                    /{t("pricing.monthly").toLowerCase()}
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                  {freeFeatures.map((feature, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: { xs: 0.8, md: 2 },
                        mb: { xs: 1.25, md: 2.5 },
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: "var(--primary)",
                          opacity: 0.6,
                          fontSize: { xs: 16, md: 20 },
                          mt: { xs: "2px", md: 0 },
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "var(--text-dark)",
                          fontSize: { xs: "0.72rem", sm: "0.82rem", md: "0.95rem" },
                          lineHeight: 1.45,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                  {/* Grayed out features for free plan */}
                  <Box
                    sx={{
                      mt: { xs: 1.5, md: 2 },
                      pt: { xs: 1.5, md: 2 },
                      borderTop: "1px dashed var(--border-color)",
                      opacity: 0.4,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mb: 1,
                        fontWeight: 700,
                        fontSize: { xs: "0.62rem", md: "0.75rem" },
                      }}
                    >
                      PREMIUM FEATURES
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: { xs: 0.8, md: 2 },
                        mb: 1.5,
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: "var(--text-muted)",
                          fontSize: { xs: 15, md: 18 },
                          mt: "2px",
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "var(--text-muted)",
                          fontSize: { xs: "0.68rem", md: "0.85rem" },
                          lineHeight: 1.45,
                          textDecoration: "line-through",
                        }}
                      >
                        {premiumFeatures[0]}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: "auto", pt: { xs: 2, md: 4 } }}>
                  <button
                    className="register-btn"
                    style={{
                      width: "100%",
                      opacity: 0.8,
                      background: "var(--text-muted)",
                      padding: "10px 8px",
                      fontSize: "clamp(11px, 3vw, 15px)",
                    }}
                  >
                    {t("pricing.cta_app")}
                  </button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>

          {/* Premium Plan */}
          <Grid
            size={{ xs: 6, sm: 5, md: 5, lg: 4.5 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              style={{ display: "flex", width: "100%", maxWidth: 400, height: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 6 },
                  width: "100%",
                  height: { xs: 620, sm: 590, md: 580 },
                  minHeight: { xs: 620, sm: 590, md: 580 },
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: { xs: "18px", md: "32px" },
                  backgroundColor: "var(--card-bg)",
                  border: "2px solid var(--primary)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "var(--primary-light)",
                    boxShadow: "0 30px 60px rgba(143, 92, 177, 0.25)",
                    "&:after": {
                      opacity: 1,
                    },
                    "& .premium-shine": {
                      left: "150%",
                    },
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: { xs: "18px", md: "32px" },
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(45deg, var(--primary), transparent, var(--primary)) border-box",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                  },
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    top: -50,
                    right: -50,
                    width: "300px",
                    height: "300px",
                    background:
                      "radial-gradient(circle, rgba(143, 92, 177, 0.2) 0%, transparent 70%)",
                    zIndex: 0,
                    transition: "transform 0.6s ease",
                  },
                }}
              >
                {/* Shine effect layer */}
                <Box
                  className="premium-shine"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "-50%",
                    width: "30%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)",
                    transform: "skewX(-20deg)",
                    transition: "left 0.8s ease",
                    zIndex: 1,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "var(--primary)",
                    position: "relative",
                    zIndex: 1,
                    fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                    lineHeight: 1.25,
                  }}
                >
                  {t("pricing.premium.name")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    mb: { xs: 2.5, md: 4 },
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", alignItems: "baseline" }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          color: "var(--text-dark)",
                          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "3rem" },
                        }}
                      >
                        $
                        {isYearly
                          ? t("pricing.premium.price_yearly")
                          : t("pricing.premium.price_monthly")}
                      </Typography>
                      <Typography
                        sx={{
                          color: "var(--text-muted)",
                          ml: 1,
                          fontSize: { xs: "0.75rem", md: "1rem" },
                        }}
                      >
                        /
                        {isYearly
                          ? t("pricing.yearly").toLowerCase()
                          : t("pricing.monthly").toLowerCase()}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                </Box>

                <Box sx={{ flexGrow: 1, minHeight: 0, position: "relative", zIndex: 1 }}>
                  {premiumFeatures.map((feature, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: { xs: 0.8, md: 2 },
                        mb: { xs: 1.25, md: 2.5 },
                      }}
                    >
                      <CheckCircle
                        sx={{
                          color: "var(--primary)",
                          fontSize: { xs: 16, md: 22 },
                          mt: { xs: "2px", md: 0 },
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: "var(--text-dark)",
                          fontSize: { xs: "0.72rem", sm: "0.82rem", md: "1rem" },
                          fontWeight: 600,
                          lineHeight: 1.45,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    pt: { xs: 2, md: 4 },
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <button
                    className="register-btn"
                    style={{
                      width: "100%",
                      padding: "10px 8px",
                      fontSize: "clamp(11px, 3vw, 15px)",
                    }}
                  >
                    {t("pricing.cta_upgrade")}
                  </button>
                  <Box
                    sx={{
                      mt: { xs: 1, md: 2 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.7,
                    }}
                  >
                    <Smartphone
                      sx={{ color: "var(--text-muted)", fontSize: { xs: 13, md: 16 }, flexShrink: 0 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--text-muted)",
                        fontSize: { xs: "0.6rem", md: "0.75rem" },
                        lineHeight: 1.35,
                      }}
                    >
                      {t("pricing.app_only_note")}
                    </Typography>
                    <Tooltip
                      title={t("pricing.app_only_note")}
                      placement="top"
                      arrow
                    >
                      <InfoOutlined
                        sx={{
                          fontSize: { xs: 12, md: 14 },
                          color: "var(--primary)",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PricingPlans;
