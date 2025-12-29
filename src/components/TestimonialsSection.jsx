import React, { useRef } from "react";
import { Box, Typography, Avatar, Rating, Paper, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// Since I don't know if react-slick is installed, I will use a simple manageable grid for robustness, or check package.json. 
// However, a Grid is safer and often cleaner for this number of items. Let's stick to a responsive Grid.

const TestimonialCard = ({ name, role, feedback, avatar, rating, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
        borderRadius: "24px",
        background: "rgba(255, 255, 255, 0.03)", // Very subtle base
        backdropFilter: "blur(20px)",
        border: "1px solid var(--border-color)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "#8f5cb1",
          background: "var(--card-bg)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
          "& .quote-icon": {
            color: "var(--primary)",
            opacity: 0.8,
            transform: "rotate(180deg) scale(1.1)",
          },
        },
      }}
    >
      <FormatQuoteIcon
        className="quote-icon"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 60,
          color: "rgba(143, 92, 177, 0.1)",
          transform: "rotate(180deg)",
          transition: "all 0.4s ease",
        }}
      />
      
      <Box display="flex" flexDirection="column" gap={2} height="100%">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={avatar}
            sx={{
              width: 56,
              height: 56,
              border: "2px solid #8f5cb1",
            }}
          >
            {name ? name[0] : '?'}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={700} color="var(--text-dark)">
              {name}
            </Typography>
            <Typography variant="body2" color="#8f5cb1" fontWeight={600}>
              {role}
            </Typography>
          </Box>
        </Box>

        <Rating value={rating} readOnly sx={{ color: "#fbbf24" }} />

        <Typography
          variant="body1"
          color="var(--text-muted)"
          sx={{
            fontStyle: "italic",
            lineHeight: 1.7,
            flex: 1,
            zIndex: 1,
          }}
        >
          "{feedback}"
        </Typography>
      </Box>
    </Paper>
  </motion.div>
);

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  
  // Dummy data if not in translations yet (or fallback)
  const testimonials = t("testimonials.items", { returnObjects: true });
  // Realistic images matching local demographics (Middle Eastern appearance)
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150", // Mahmoud
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150", // Sarah
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150"  // Omar
  ];

  const items = (Array.isArray(testimonials) ? testimonials : [
    { name: "John Doe", role: "Car Owner", feedback: "Amazing service! Saved me in the middle of nowhere.", rating: 5 },
    { name: "Sarah Smith", role: "Frequent Traveler", feedback: "The app is so easy to use and the mechanic arrived in 10 mins.", rating: 5 },
    { name: "Ahmed Ali", role: "VIP Member", feedback: "Professional team and premium support. Highly recommended!", rating: 5 },
  ]).map((item, index) => ({ ...item, avatar: avatars[index % avatars.length] }));

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 10 },
        background: "var(--bg-section-alt)",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        overflow: "hidden",
      }}
    >
      <Box textAlign="center" mb={6}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: "var(--gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: { xs: "24px", md: "36px" }
            }}
          >
            {t("testimonials.title") || "What Our Clients Say"}
          </Typography>
          <Typography variant="body1" color="var(--text-muted)" maxWidth={600} mx="auto">
            {t("testimonials.subtitle") || "Real experiences from real users."}
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {items.map((item, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <TestimonialCard {...item} index={i} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialsSection;
