import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Smartphone,
  Build as Wrench,
  LocationOn as MapPin,
  Navigation,
  VerifiedUser as ShieldCheck
} from '@mui/icons-material';
import Section from '@/presentation/components/ui/Section';
import SectionHead from '@/presentation/components/ui/SectionHead';

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
    <Section id="how-it-works" rhythm="spacious">
      <SectionHead title={t('how_it_works.title')} subtitle={t('how_it_works.subtitle')} />

      {/* Timeline Content */}
      <Box sx={{ position: 'relative', width: '100%' }}>

        {/* Connecting Line (Desktop) */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            position: 'absolute',
            top: '40px',
            left: '10%',
            right: '10%',
            height: '3px',
            background: 'var(--border-color)',
            zIndex: 0,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundImage: 'repeating-linear-gradient(to right, var(--primary), var(--primary) 8px, transparent 8px, transparent 16px)',
              opacity: 0.3,
            }
          }}
        >
           <Motion.div
             initial={{ width: 0 }}
             whileInView={{ width: '100%' }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.5 }}
             style={{ height: '100%', background: 'var(--gradient)' }}
           />
        </Box>

        {/* Steps Container — شبكة تتدرّج بدل صفّ من خمسة يُضغط عند ٩٦٠ بكسل.
            خمسة أعمدة داخل ١٦١ بكسل كانت تكسر العناوين إلى سطر وسطرين
            وثلاثة، فتتفاوت خطوط الأساس ويصعب المسح البصري للخطوات. */}
        <Box
          className="how-steps-grid"
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: 0,
              }}
            >
              {/* Icon Wrapper */}
              <Motion.div
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
                    transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
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
                      backgroundColor: 'transparent',
                      background: 'var(--gradient)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'all 250ms ease',
                    }}
                  >
                    {index + 1}
                  </Box>
                </Box>
              </Motion.div>

              {/* Text Content */}
              <Motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
              >
                <Typography
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: "var(--text-dark)",
                    fontSize: 'var(--fs-h3)',
                    lineHeight: 1.3
                  }}
                >
                  {t(`how_it_works.steps.${index}.title`)}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--text-muted)",
                    fontSize: "0.92rem",
                    lineHeight: 1.65,
                  }}
                >
                  {t(`how_it_works.steps.${index}.description`)}
                </Typography>
              </Motion.div>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default HowItWorks;
