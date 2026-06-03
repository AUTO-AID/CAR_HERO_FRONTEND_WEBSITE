import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SyriaMap from '@/presentation/components/map/SyriaMap';
import { Explore } from '@mui/icons-material';

const CoverageSection = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="section"
      id="coverage-map-section"
      sx={{
        py: { xs: 8, md: 15 },
        px: { xs: 2, sm: 4, md: 8 },
        background: "var(--bg-section-alt)",
        transition: "background-color 0.4s ease",
        width: "100%",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              <Explore sx={{ fontSize: 32, color: "#fff" }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "var(--primary)",
                mb: 2,
                fontSize: { xs: "28px", sm: "36px", md: "44px" },
                letterSpacing: "-1px",
              }}
            >
              {t('coverage.title')}
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
              {t('coverage.subtitle')}
            </Typography>
          </motion.div>
        </Box>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SyriaMap />
        </motion.div>
      </Container>
    </Box>
  );
};

export default CoverageSection;
