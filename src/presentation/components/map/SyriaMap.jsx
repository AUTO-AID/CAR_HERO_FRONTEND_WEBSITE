import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Chip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Schedule, Map as MapIcon } from '@mui/icons-material';

const governorateNames = {
  'Damascus': { en: 'Damascus', ar: 'دمشق' },
  'Aleppo': { en: 'Aleppo', ar: 'حلب' },
  'Homs': { en: 'Homs', ar: 'حمص' },
  'Hama': { en: 'Hama', ar: 'حماة' },
  'Lattakia': { en: 'Lattakia', ar: 'اللاذقية' },
  'Tartous': { en: 'Tartous', ar: 'طرطوس' },
  'Idleb': { en: 'Idleb', ar: 'إدلب' },
  'Ar-Raqqa': { en: 'Ar-Raqqa', ar: 'الرقة' },
  'Deir-ez-Zor': { en: 'Deir ez-Zor', ar: 'دير الزور' },
  'Al-Hasakeh': { en: 'Al-Hasakeh', ar: 'الحسكة' },
  "Dar'a": { en: "Dar'a", ar: 'درعا' },
  'As-Sweida': { en: 'As-Sweida', ar: 'السويداء' },
  'Quneitra': { en: 'Quneitra', ar: 'القنيطرة' },
  'Rural Damascus': { en: 'Rural Damascus', ar: 'ريف دمشق' },
  'Rular Damascus': { en: 'Rural Damascus', ar: 'ريف دمشق' }
};

const ActivePanel = ({ govName, value, isArabic }) => (
  <Box
    sx={{
      background: 'rgba(30, 30, 45, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(139,111,192,0.25)',
      p: 3,
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <CheckCircle sx={{ color: '#8b6fc0', fontSize: 28 }} />
      <Box sx={{ textAlign: isArabic ? 'left' : 'right' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 0.5, fontSize: '1.4rem' }}>
          {govName}
        </Typography>
        <Chip
          label={isArabic ? 'نشط' : 'Active'}
          size="small"
          sx={{ backgroundColor: 'rgba(139,111,192,0.2)', color: '#a78bfa', fontWeight: 600, fontSize: '11px' }}
        />
      </Box>
    </Box>

    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7, mb: 3, textAlign: isArabic ? 'right' : 'left' }}>
      {isArabic
        ? `خدماتنا متوفرة بالكامل في ${govName}. فنيون متخصصون على مدار الساعة لخدمتك!`
        : `Our services are fully available in ${govName}. Expert technicians available 24/7!`
      }
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
      <Box sx={{ background: 'rgba(139,111,192,0.1)', borderRadius: '10px', p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 700 }}>{value}+</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
          {isArabic ? 'فني متاح' : 'Technicians'}
        </Typography>
      </Box>
      <Box sx={{ background: 'rgba(139,111,192,0.1)', borderRadius: '10px', p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: '#a78bfa', fontSize: '1.5rem', fontWeight: 700 }}>24/7</Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
          {isArabic ? 'متوفر' : 'Available'}
        </Typography>
      </Box>
    </Box>

    <Button
      fullWidth
      variant="contained"
      sx={{
        background: 'linear-gradient(135deg, #6a1b9a, #8b6fc0)',
        borderRadius: '10px',
        py: 1.5,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '15px'
      }}
    >
      {isArabic ? 'اطلب خدمة الآن' : 'Request Service'}
    </Button>
  </Box>
);

const ComingSoonPanel = ({ govName, isArabic, email, setEmail, onNotify, isSubmitting, isSuccess }) => (
  <Box
    sx={{
      background: 'rgba(30, 30, 45, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid rgba(139,111,192,0.25)',
      p: 3,
      boxShadow: '0 12px 40px rgba(0,0,0,0.3)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Schedule sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 28 }} />
      <Box sx={{ textAlign: isArabic ? 'left' : 'right' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 0.5, fontSize: '1.4rem' }}>
          {govName}
        </Typography>
        <Chip
          label={isArabic ? 'قريباً' : 'Coming Soon'}
          size="small"
          sx={{ backgroundColor: 'rgba(255,165,0,0.15)', color: '#f5a623', fontWeight: 600, fontSize: '11px' }}
        />
      </Box>
    </Box>

    <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.7, mb: 3, textAlign: isArabic ? 'right' : 'left' }}>
      {isArabic
        ? `نحن نعمل جاهدين لإطلاق كار هيرو في ${govName}. سجل بريدك ليتم إعلامك فور الإطلاق!`
        : `We're working to launch Car Hero in ${govName}. Register your email to be notified at launch!`
      }
    </Typography>

    <TextField
      fullWidth
      placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email address'}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={isSubmitting || isSuccess}
      size="small"
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: '10px',
          '& fieldset': { borderColor: 'rgba(139,111,192,0.3)' },
          '&:hover fieldset': { borderColor: 'rgba(139,111,192,0.5)' },
          '&.Mui-focused fieldset': { borderColor: '#8b6fc0' }
        },
        '& input': { color: '#fff', textAlign: isArabic ? 'right' : 'left' }
      }}
    />

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        py: 1.5,
        px: 2,
        borderRadius: '10px',
        border: '1px solid rgba(245,166,35,0.2)',
        backgroundColor: 'rgba(245,166,35,0.05)',
        mb: 2
      }}
    >
      <Schedule sx={{ color: '#f5a623', fontSize: 18 }} />
      <Typography sx={{ color: '#f5a623', fontSize: '13px', fontWeight: 500 }}>
        {isArabic ? 'قيد الانتظار' : 'Coming Soon'}
      </Typography>
    </Box>

    <Button
      fullWidth
      variant="contained"
      onClick={onNotify}
      disabled={!email || isSubmitting || isSuccess}
      sx={{
        background: (email && !isSuccess) ? 'linear-gradient(135deg, #6a1b9a, #8b6fc0)' : (isSuccess ? '#10b981' : 'rgba(100,100,120,0.3)'),
        borderRadius: '10px',
        py: 1.5,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '15px',
        color: (email && !isSuccess) || isSuccess ? '#fff' : 'rgba(255,255,255,0.3)'
      }}
    >
      {isSubmitting ? (isArabic ? 'جاري التسجيل...' : 'Registering...') : isSuccess ? (isArabic ? 'تم التسجيل بنجاح ✓' : 'Registered Successfully ✓') : (isArabic ? 'أعلمني عند الإطلاق' : 'Notify Me')}
    </Button>
  </Box>
);

const DefaultPanel = ({ isArabic }) => (
  <Box
    sx={{
      background: 'rgba(30, 30, 45, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid rgba(139,111,192,0.15)',
      p: 4,
      textAlign: 'center'
    }}
  >
    <MapIcon sx={{ fontSize: 48, color: 'rgba(139,111,192,0.4)', mb: 2 }} />
    <Typography sx={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, mb: 1.5 }}>
      {isArabic ? 'استكشف شبكتنا' : 'Explore Our Network'}
    </Typography>
    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7 }}>
      {isArabic
        ? 'مرر أو اضغط على أي مدينة على الخريطة لعرض حالة التغطية المباشرة، وتوفر الفنيين، وأنواع الخدمات.'
        : 'Hover or tap on any city on the map to view live coverage status, technician availability, and service types.'
      }
    </Typography>
  </Box>
);

import { getGovernorates } from '@/infrastructure/services/providers.service';

const SyriaMap = () => {
  const { i18n } = useTranslation();
  const iframeRef = useRef(null);
  const [selectedGov, setSelectedGov] = useState(null);
  const [previewGov, setPreviewGov] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [govData, setGovData] = useState([]);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const fetchGovData = async () => {
      try {
        const json = await getGovernorates();
        if (json.success && Array.isArray(json.data)) {
          setGovData(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch governorate data:', err);
      }
    };
    fetchGovData();
  }, []);

  useEffect(() => {
    if (iframeRef.current && govData.length > 0) {
      const iframe = iframeRef.current;
      const sendData = () => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(
            {
              type: 'UPDATE_DATA',
              data: govData
            },
            '*'
          );
        }
      };

      const handleLoad = () => {
        sendData();
      };

      iframe.addEventListener('load', handleLoad);
      sendData();

      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [govData]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data || !event.data.type) return;
      
      if (event.data.type === 'MAP_SELECT') {
        // Click locks selection
        setSelectedGov(event.data.data);
        setPreviewGov(null);
      } else if (event.data.type === 'MAP_HOVER') {
        // Hover shows preview (doesn't clear selection)
        setPreviewGov(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Display priority: preview > selection
  const displayGov = previewGov || selectedGov;

  const getGovernorateDisplay = (name) => {
    const gov = governorateNames[name];
    return gov ? (isArabic ? gov.ar : gov.en) : name;
  };

  const handleNotify = () => {
    if (email && displayGov) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 3000);
      }, 1500);
    }
  };

  const isActive = displayGov?.status === 'active';
  const govName = displayGov ? getGovernorateDisplay(displayGov.governorate) : '';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        gap: 4,
        minHeight: '600px',
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
      {/* Info Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '340px' },
          minHeight: { xs: '250px', md: '550px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: { xs: 2, md: 1 }
        }}
      >
        <AnimatePresence mode="wait">
          {displayGov ? (
            <motion.div
              key={displayGov.governorate}
              initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isArabic ? 30 : -30 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {isActive ? (
                <ActivePanel govName={govName} value={displayGov.value} isArabic={isArabic} />
              ) : (
                <ComingSoonPanel
                  govName={govName}
                  isArabic={isArabic}
                  email={email}
                  setEmail={setEmail}
                  onNotify={handleNotify}
                  isSubmitting={isSubmitting}
                  isSuccess={isSuccess}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DefaultPanel isArabic={isArabic} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Map */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          minWidth: 0,
          height: { xs: '390px', sm: '440px', md: '550px' },
          minHeight: { xs: '390px', sm: '440px', md: '550px' },
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          order: { xs: 1, md: 2 },
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          ref={iframeRef}
          component="iframe"
          src="/maps/syria_choropleth.html"
          sx={{
            width: '100%',
            height: { xs: '390px', sm: '440px', md: '550px' },
            minHeight: { xs: '390px', sm: '440px', md: '550px' },
            border: 'none',
            background: 'transparent',
            display: 'block'
          }}
          title="Syria Coverage Map"
        />
      </Box>
    </Box>
  );
};

export default SyriaMap;
