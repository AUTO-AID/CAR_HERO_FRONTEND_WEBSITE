import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimerIcon from "@mui/icons-material/Timer";
import MapIcon from "@mui/icons-material/Map";
import { getPublicStatistics } from "@/infrastructure/services/providers.service";

const StatisticItem = ({ icon: Icon, value, label, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    style={{ height: "100%", width: "100%" }}
  >
    <Paper
      elevation={0}
      sx={{
        p: { xs: "35px 20px", md: "50px 25px" },
        textAlign: "center",
        borderRadius: "20px",
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(143, 92, 177, 0.05), transparent)",
          transition: "left 0.5s ease",
        },
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "var(--shadow-hover), 0 0 30px rgba(143, 92, 177, 0.15)",
          borderColor: "var(--primary)",
          "&::before": {
            left: "100%",
          },
          "& .stat-icon": {
            transform: "scale(1.15) rotate(10deg)",
            background: "var(--gradient)",
            color: "white",
            boxShadow: "0 8px 20px rgba(143, 92, 177, 0.3)",
          },
        },
      }}
    >
      <Box
        className="stat-icon"
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "16px",
          background: "var(--input-bg)",
          color: "var(--primary)",
          display: "inline-flex",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Icon sx={{ fontSize: 36 }} />
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: "var(--gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: "2.2rem", sm: "2.5rem", md: "2.8rem" },
        }}
      >
        <CountUp
          key={value}
          end={Number(value) || 0}
          duration={2.5}
          separator=","
          prefix="+"
          enableScrollSpy
          scrollSpyOnce
        />
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {label}
      </Typography>
    </Paper>
  </motion.div>
);

const StatisticsSection = () => {
  const { t, i18n } = useTranslation();
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchStats = async () => {
      try {
        const response = await getPublicStatistics();
        if (active && response?.success && response.data) {
          setLiveStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch public statistics:", error);
      }
    };

    fetchStats();
    const refreshInterval = window.setInterval(fetchStats, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshInterval);
    };
  }, []);

  const stats = liveStats ? [
    { icon: PeopleAltIcon, value: liveStats.customers, label: t("stats.users") },
    { icon: EngineeringIcon, value: liveStats.approvedProviders, label: t("stats.providers") },
    { icon: MapIcon, value: liveStats.coveredAreas, label: t("stats.cities") },
    { icon: TimerIcon, value: liveStats.averageResponseMinutes, label: t("stats.response_time") },
  ] : [];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        px: { xs: 2, md: 10 },
        background: "var(--bg-section)",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
    >
      <Box textAlign="center" mb={7}>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
           <Typography
             variant="h4"
             sx={{
               fontWeight: 800,
               background: "var(--gradient)",
               WebkitBackgroundClip: "text",
               WebkitTextFillColor: "transparent",
               mb: 1.5,
               fontSize: { xs: "24px", md: "36px" }
             }}
           >
             {t("stats.title")}
           </Typography>
           <Typography variant="body1" color="var(--text-muted)" maxWidth={600} mx="auto">
             {t("stats.subtitle")}
           </Typography>
         </motion.div>
      </Box>

      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {stats.map((stat, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ display: "flex" }}>
            <StatisticItem {...stat} index={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
