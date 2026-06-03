import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  MobileScreenShare,
  AutoAwesome,
} from "@mui/icons-material";

const appScreenshots = [
  "/photo_car_hero/photo_1_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_2_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_3_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_4_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_5_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_6_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_7_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_8_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_9_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_10_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_11_2026-03-23_17-28-16.jpg",
  "/photo_car_hero/photo_12_2026-03-23_17-28-16.jpg",
];

const AppScreenshots = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === appScreenshots.length - 1 ? 0 : prev + 1,
      );
      setDirection(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? appScreenshots.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === appScreenshots.length - 1 ? 0 : prev + 1,
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction * (isRtl ? -100 : 100),
      scale: 0.95,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * (isRtl ? 100 : -100),
      scale: 0.95,
    }),
  };

  return (
    <Box
      id="app-screenshots"
      sx={{
        py: { xs: 10, md: 14 },
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: "var(--bg-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "5%",
          right: isRtl ? "auto" : "-3%",
          left: isRtl ? "-3%" : "auto",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(143, 92, 177, 0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.1, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "0%",
          left: isRtl ? "auto" : "-2%",
          right: isRtl ? "-2%" : "auto",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          borderRadius: "50%",
        }}
      />

      <Box sx={{ textAlign: "center", mb: 8, position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--primary) 0%, #6b4c9a 100%)",
              mx: "auto",
              mb: 3,
              boxShadow:
                "0 12px 40px rgba(143, 92, 177, 0.4), inset 0 2px 10px rgba(255,255,255,0.2)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s infinite",
              },
            }}
          >
            <MobileScreenShare sx={{ fontSize: 36, color: "#fff" }} />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              letterSpacing: "1px",
              background:
                "linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 50%, #6b4c9a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: { xs: "28px", sm: "36px", md: "44px" },
              textShadow: "0 0 40px rgba(143, 92, 177, 0.3)",
            }}
          >
            {t("appScreenshots.title") || "App Screenshots"}
          </Typography>

          <Typography
            sx={{
              color: "var(--text-muted)",
              maxWidth: 600,
              mx: "auto",
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            {t("appScreenshots.subtitle") ||
              "Explore the Car Hero app interface"}
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 2.5,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<AutoAwesome sx={{ color: "#FFD700" }} />}
                label={t("appScreenshots.feature1") || "Easy Booking"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "var(--primary-light)",
                  fontWeight: 600,
                  borderRadius: "10px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
              <Chip
                icon={<AutoAwesome sx={{ color: "#00E5FF" }} />}
                label={t("appScreenshots.feature2") || "Real-time Tracking"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "#00E5FF",
                  fontWeight: 600,
                  borderRadius: "10px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
              <Chip
                icon={<AutoAwesome sx={{ color: "#FF6B9D" }} />}
                label={t("appScreenshots.feature3") || "24/7 Support"}
                sx={{
                  background: "rgba(143, 92, 177, 0.15)",
                  border: "1px solid rgba(143, 92, 177, 0.3)",
                  color: "#FF6B9D",
                  fontWeight: 600,
                  borderRadius: "10px",
                  px: 1.5,
                  "& .MuiChip-icon": { ml: isRtl ? 0 : 1 },
                }}
              />
            </Box>
          </motion.div>
        </motion.div>
      </Box>

      {/* Phone Carousel */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "280px",
            mx: "auto",
          }}
        >
          {/* Phone Frame Glow Effect */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95%",
              height: "95%",
              background:
                "radial-gradient(circle, rgba(143, 92, 177, 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              zIndex: 0,
            }}
          />

          {/* Phone Notch */}
          <Box
            sx={{
              position: "absolute",
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "140px",
              height: "28px",
              background: "linear-gradient(180deg, #1a1a2e 0%, #2a2a3e 100%)",
              borderRadius: "0 0 18px 18px",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          />

          {/* Phone Frame */}
          <Box
            sx={{
              position: "relative",
              borderRadius: "40px",
              overflow: "hidden",
              border: "4px solid #3a3a5e",
              boxShadow: `
                0 25px 80px rgba(0,0,0,0.6),
                0 0 0 2px #2a2a3e,
                0 0 60px rgba(143, 92, 177, 0.3),
                inset 0 0 40px rgba(0,0,0,0.3)
              `,
              background: "linear-gradient(135deg, #1a1a2e 0%, #0a0a14 100%)",
              aspectRatio: "9/19",
              mx: "auto",
              zIndex: 1,
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)",
                pointerEvents: "none",
                zIndex: 5,
              },
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={appScreenshots[currentIndex]}
                alt={`App screenshot ${currentIndex + 1}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>

            {/* Screen Reflection Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
                pointerEvents: "none",
                zIndex: 6,
              }}
            />
          </Box>

          {/* Pagination Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: "-50px",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              zIndex: 5,
              flexWrap: "wrap",
              px: 2,
            }}
          >
            {appScreenshots.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  width: index === currentIndex ? "32px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  backgroundColor:
                    index === currentIndex
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow:
                    index === currentIndex ? "0 0 12px var(--primary)" : "none",
                  "&:hover": {
                    backgroundColor:
                      index === currentIndex
                        ? "var(--primary)"
                        : "rgba(255,255,255,0.4)",
                  },
                }}
              />
            ))}
          </Box>

          {/* Navigation Arrows - Desktop */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isRtl ? "right" : "left"]: { md: "-70px" },
              left: isRtl ? "auto" : { md: "-70px" },
              right: isRtl ? { md: "-70px" } : "auto",
              backgroundColor: "rgba(143, 92, 177, 0.25)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: 50,
              height: 50,
              border: "1px solid rgba(143, 92, 177, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(143, 92, 177, 0.5)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(143, 92, 177, 0.4)",
              },
              display: { xs: "none", md: "flex" },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {isRtl ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              [isRtl ? "left" : "right"]: { md: "-70px" },
              right: isRtl ? "auto" : { md: "-70px" },
              left: isRtl ? { md: "-70px" } : "auto",
              backgroundColor: "rgba(143, 92, 177, 0.25)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: 50,
              height: 50,
              border: "1px solid rgba(143, 92, 177, 0.4)",
              "&:hover": {
                backgroundColor: "rgba(143, 92, 177, 0.5)",
                transform: "translateY(-50%) scale(1.1)",
                boxShadow: "0 8px 25px rgba(143, 92, 177, 0.4)",
              },
              display: { xs: "none", md: "flex" },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* Mobile Navigation */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            gap: 2,
            mt: 6,
          }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor:
                  "linear-gradient(135deg, var(--primary) 0%, #6b4c9a 100%)",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, #6b4c9a 100%)",
                color: "#fff",
                width: 56,
                height: 56,
                boxShadow: "0 8px 20px rgba(143, 92, 177, 0.4)",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(143, 92, 177, 0.6)",
                },
              }}
            >
              {isRtl ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor:
                  "linear-gradient(135deg, var(--primary) 0%, #6b4c9a 100%)",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, #6b4c9a 100%)",
                color: "#fff",
                width: 56,
                height: 56,
                boxShadow: "0 8px 20px rgba(143, 92, 177, 0.4)",
                "&:hover": {
                  boxShadow: "0 12px 30px rgba(143, 92, 177, 0.6)",
                },
              }}
            >
              {isRtl ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </motion.div>
        </Box>

        {/* Screenshot Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Typography
            sx={{
              mt: 4,
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            {currentIndex + 1} / {appScreenshots.length}
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AppScreenshots;
