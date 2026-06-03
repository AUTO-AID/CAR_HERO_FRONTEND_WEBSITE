import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Smartphone, 
  Build as Wrench, 
  LocationOn as MapPin, 
  Navigation, 
  VerifiedUser as ShieldCheck
} from '@mui/icons-material';

const HowItWorks = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const steps = [
    { icon: <Smartphone sx={{ fontSize: 32 }} /> },
    { icon: <Wrench sx={{ fontSize: 32 }} /> },
    { icon: <MapPin sx={{ fontSize: 32 }} /> },
    { icon: <Navigation sx={{ fontSize: 32 }} /> },
    { icon: <ShieldCheck sx={{ fontSize: 32 }} /> },
  ];

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 15 },
        position: 'relative',
        background: "var(--bg-light)",
        transition: "background-color 0.4s ease",
        width: "100%",
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
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
              {t('how_it_works.title')}
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
              {t('how_it_works.subtitle')}
            </Typography>
          </motion.div>
        </Box>

        {/* Timeline Content */}
        <Box sx={{ position: 'relative', width: '100%' }}>
          
          {/* Connecting Line (Desktop) */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: '40px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'var(--border-color)',
              zIndex: 0
            }}
          >
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: '100%' }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 0.5 }}
               style={{ height: '100%', background: 'var(--gradient)' }}
             />
          </Box>

          {/* Steps Container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: { xs: 8, md: 2 },
              position: 'relative',
              zIndex: 1
            }}
          >
            {steps.map((step, index) => (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: { xs: '100%', md: 'auto' },
                  maxWidth: { md: '200px' }
                }}
              >
                {/* Icon Wrapper */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '20px',
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--primary)',
                      position: 'relative',
                      boxShadow: 'var(--shadow-sm)',
                      mb: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.05)',
                        borderColor: 'var(--primary)',
                        boxShadow: 'var(--shadow-hover), 0 0 25px rgba(143, 92, 177, 0.2)',
                        background: 'var(--gradient)',
                        color: 'white',
                        '& .step-badge': {
                          transform: 'scale(1.15)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                        }
                      }
                    }}
                  >
                    {step.icon}
                    
                    {/* Badge */}
                    <Box
                      className="step-badge"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: isRtl ? 'auto' : -10,
                        left: isRtl ? -10 : 'auto',
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {index + 1}
                    </Box>
                  </Box>
                </motion.div>

                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "var(--text-dark)",
                      fontSize: '18px',
                      lineHeight: 1.2
                    }}
                  >
                    {t(`how_it_works.steps.${index}.title`)}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      px: 1
                    }}
                  >
                    {t(`how_it_works.steps.${index}.description`)}
                  </Typography>
                </motion.div>
              </Box>
            ))}
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default HowItWorks;
