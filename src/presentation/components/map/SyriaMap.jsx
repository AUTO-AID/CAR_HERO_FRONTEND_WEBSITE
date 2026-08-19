import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Chip } from '@mui/material';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
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
      background: 'var(--card-bg)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      p: 3,
      boxShadow: 'var(--shadow-lg)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <CheckCircle sx={{ color: 'var(--primary)', fontSize: 28 }} />
      <Box sx={{ textAlign: isArabic ? 'left' : 'right' }}>
        <Typography component="h3" sx={{ fontWeight: 700, color: 'var(--text-dark)', mb: 0.5, fontSize: '1.4rem' }}>
          {govName}
        </Typography>
        <Chip
          label={isArabic ? 'نشط' : 'Active'}
          size="small"
          sx={{ backgroundColor: 'rgba(139,111,192,0.2)', color: 'var(--primary)', fontWeight: 600, fontSize: '11px' }}
        />
      </Box>
    </Box>

    <Typography sx={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, mb: 3, textAlign: isArabic ? 'right' : 'left' }}>
      {isArabic
        ? `خدماتنا متوفرة بالكامل في ${govName}. فنيون متخصصون على مدار الساعة لخدمتك!`
        : `Our services are fully available in ${govName}. Expert technicians available 24/7!`
      }
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
      <Box sx={{ background: 'rgba(139,111,192,0.1)', borderRadius: '10px', p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 700 }}>{value}+</Typography>
        <Typography sx={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          {isArabic ? 'فني متاح' : 'Technicians'}
        </Typography>
      </Box>
      <Box sx={{ background: 'rgba(139,111,192,0.1)', borderRadius: '10px', p: 2, textAlign: 'center' }}>
        <Typography sx={{ color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 700 }}>24/7</Typography>
        <Typography sx={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          {isArabic ? 'متوفر' : 'Available'}
        </Typography>
      </Box>
    </Box>

    {/* كان زراً بارزاً بلا `onClick` إطلاقاً: أوضح دعوة للفعل في القسم
        وأكثرها إغراءً بالنقر، ولا يحدث شيء عند الضغط. والطلب لا يتم من
        الموقع أصلاً بل من التطبيق — كما تقول الأسئلة الشائعة نفسها. */}
    <Button
      fullWidth
      variant="contained"
      component={RouterLink}
      to="/app"
      sx={{
        background: 'var(--gradient)',
        borderRadius: '10px',
        py: 1.5,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '15px'
      }}
    >
      {isArabic ? 'اطلب الخدمة من التطبيق' : 'Request from the app'}
    </Button>
  </Box>
);

const ComingSoonPanel = ({ govName, isArabic, email, setEmail, onNotify, isSubmitting, isSuccess }) => (
  <Box
    sx={{
      background: 'var(--card-bg)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      p: 3,
      boxShadow: 'var(--shadow-lg)'
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Schedule sx={{ color: 'var(--text-muted)', fontSize: 28, opacity: 0.55 }} />
      <Box sx={{ textAlign: isArabic ? 'left' : 'right' }}>
        <Typography component="h3" sx={{ fontWeight: 700, color: 'var(--text-dark)', mb: 0.5, fontSize: '1.4rem' }}>
          {govName}
        </Typography>
        <Chip
          label={isArabic ? 'قريباً' : 'Coming Soon'}
          size="small"
          sx={{ backgroundColor: 'rgba(255,165,0,0.15)', color: 'var(--status-warning)', fontWeight: 600, fontSize: '11px' }}
        />
      </Box>
    </Box>

    <Typography
      component="div"
      dir={isArabic ? 'rtl' : 'ltr'}
      sx={{
        color: 'var(--text-muted)',
        fontSize: '14px',
        lineHeight: 1.7,
        mb: 3,
        textAlign: isArabic ? 'right' : 'left',
        unicodeBidi: 'isolate'
      }}
    >
      {isArabic ? (
        <>
          نحن نعمل جاهدين لإطلاق{' '}
          <Box component="bdi" dir="ltr" sx={{ display: 'inline', unicodeBidi: 'isolate' }}>
            Car Hero
          </Box>
          {' '}في {govName}. سجل بريدك ليتم إعلامك فور الإطلاق!
        </>
      ) : (
        `We're working to launch Car Hero in ${govName}. Register your email to be notified at launch!`
      )}
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
          backgroundColor: 'var(--input-bg)',
          borderRadius: '10px',
          '& fieldset': { borderColor: 'rgba(139,111,192,0.3)' },
          '&:hover fieldset': { borderColor: 'rgba(139,111,192,0.5)' },
          '&.Mui-focused fieldset': { borderColor: 'var(--primary)' }
        },
        '& input': { color: 'var(--text-dark)', textAlign: isArabic ? 'right' : 'left' }
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
      <Schedule sx={{ color: 'var(--status-warning)', fontSize: 18 }} />
      <Typography sx={{ color: 'var(--status-warning)', fontSize: '13px', fontWeight: 500 }}>
        {isArabic ? 'قيد الانتظار' : 'Coming Soon'}
      </Typography>
    </Box>

    <Button
      fullWidth
      variant="contained"
      onClick={onNotify}
      disabled={!email || isSubmitting || isSuccess}
      sx={{
        background: (email && !isSuccess) ? 'var(--gradient)' : (isSuccess ? '#10b981' : 'rgba(100,100,120,0.3)'),
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
      background: 'var(--card-bg)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      border: '1px solid var(--border-color)',
      p: 4,
      textAlign: 'center'
    }}
  >
    <MapIcon sx={{ fontSize: 48, color: 'rgba(139,111,192,0.4)', mb: 2 }} />
    <Typography sx={{ color: 'var(--text-dark)', fontSize: '1.1rem', fontWeight: 600, mb: 1.5 }}>
      {isArabic ? 'استكشف شبكتنا' : 'Explore Our Network'}
    </Typography>
    <Typography sx={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.7 }}>
      {isArabic
        ? 'مرر أو اضغط على أي مدينة على الخريطة لعرض حالة التغطية المباشرة، وتوفر الفنيين، وأنواع الخدمات.'
        : 'Hover or tap on any city on the map to view live coverage status, technician availability, and service types.'
      }
    </Typography>
  </Box>
);

import { getGovernorates } from '@/infrastructure/services/providers.service';

const DAMASCUS_ALIASES = new Set([
  'damascus',
  'rural damascus',
  'rular damascus',
  'damascus countryside',
  'دمشق',
  'ريف دمشق'
]);

const GOVERNORATE_ALIASES = new Map([
  ['damascus', 'Damascus'],
  ['rural damascus', 'Damascus'],
  ['rular damascus', 'Damascus'],
  ['damascus countryside', 'Damascus'],
  ['\u062f\u0645\u0634\u0642', 'Damascus'],
  ['\u0631\u064a\u0641 \u062f\u0645\u0634\u0642', 'Damascus'],
  ['aleppo', 'Aleppo'],
  ['\u062d\u0644\u0628', 'Aleppo'],
  ['homs', 'Homs'],
  ['\u062d\u0645\u0635', 'Homs'],
  ['hama', 'Hama'],
  ['\u062d\u0645\u0627\u0629', 'Hama'],
  ['lattakia', 'Lattakia'],
  ['latakia', 'Lattakia'],
  ['\u0627\u0644\u0644\u0627\u0630\u0642\u064a\u0629', 'Lattakia'],
  ['tartous', 'Tartous'],
  ['tartus', 'Tartous'],
  ['\u0637\u0631\u0637\u0648\u0633', 'Tartous'],
  ['idleb', 'Idleb'],
  ['idlib', 'Idleb'],
  ['\u0625\u062f\u0644\u0628', 'Idleb'],
  ['\u0627\u062f\u0644\u0628', 'Idleb'],
  ['ar-raqqa', 'Ar-Raqqa'],
  ['ar raqqa', 'Ar-Raqqa'],
  ['raqqa', 'Ar-Raqqa'],
  ['\u0627\u0644\u0631\u0642\u0629', 'Ar-Raqqa'],
  ['deir-ez-zor', 'Deir-ez-Zor'],
  ['deir ez-zor', 'Deir-ez-Zor'],
  ['deir ez zor', 'Deir-ez-Zor'],
  ['deir ezzor', 'Deir-ez-Zor'],
  ['\u062f\u064a\u0631 \u0627\u0644\u0632\u0648\u0631', 'Deir-ez-Zor'],
  ['al-hasakeh', 'Al-Hasakeh'],
  ['al hasakeh', 'Al-Hasakeh'],
  ['hasakeh', 'Al-Hasakeh'],
  ['hasakah', 'Al-Hasakeh'],
  ['al-hasakah', 'Al-Hasakeh'],
  ['al hasakah', 'Al-Hasakeh'],
  ['\u0627\u0644\u062d\u0633\u0643\u0629', 'Al-Hasakeh'],
  ['\u0627\u0644\u0642\u0627\u0645\u0634\u0644\u064a', 'Al-Hasakeh'],
  ["dar'a", "Dar'a"],
  ['daraa', "Dar'a"],
  ['dara', "Dar'a"],
  ['\u062f\u0631\u0639\u0627', "Dar'a"],
  ['as-sweida', 'As-Sweida'],
  ['as sweida', 'As-Sweida'],
  ['sweida', 'As-Sweida'],
  ['suwayda', 'As-Sweida'],
  ['\u0627\u0644\u0633\u0648\u064a\u062f\u0627\u0621', 'As-Sweida'],
  ['quneitra', 'Quneitra'],
  ['\u0627\u0644\u0642\u0646\u064a\u0637\u0631\u0629', 'Quneitra']
]);

const getCanonicalGovernorate = (value) => {
  const rawName = String(value || '').trim();
  if (!rawName) return '';

  const normalizedKey = rawName
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim();

  return GOVERNORATE_ALIASES.get(normalizedKey) || rawName;
};

const normalizeGovernorateData = (data) => {
  const totals = new Map();

  data.forEach((item) => {
    const rawName = String(item?.governorate || item?.name || item?._id || '').trim();
    if (!rawName) return;

    const normalizedName = rawName.toLocaleLowerCase('en');
    const name = DAMASCUS_ALIASES.has(normalizedName) ? 'Damascus' : getCanonicalGovernorate(rawName);
    const count = Number(item?.count ?? item?.value ?? 0);

    totals.set(name, (totals.get(name) || 0) + (Number.isFinite(count) ? count : 0));
  });

  return Array.from(totals, ([_id, count]) => ({ _id, count }));
};

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
        const data = json?.data?.data ?? json?.data ?? json;
        if (Array.isArray(data)) {
          setGovData(normalizeGovernorateData(data));
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
        gap: { xs: 3, md: 4 },
        minHeight: { xs: '680px', md: '680px' },
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
      {/* Info Panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '320px' },
          minHeight: { xs: '250px', md: '650px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          order: { xs: 2, md: 1 }
        }}
      >
        <AnimatePresence mode="wait">
          {displayGov ? (
            <Motion.div
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
            </Motion.div>
          ) : (
            <Motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DefaultPanel isArabic={isArabic} />
            </Motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Map */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          minWidth: 0,
          height: { xs: '460px', sm: '540px', md: '650px' },
          minHeight: { xs: '460px', sm: '540px', md: '650px' },
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
            src="/maps/syria_choropleth.html?v=5"
          sx={{
            width: '100%',
              height: { xs: '460px', sm: '540px', md: '650px' },
              minHeight: { xs: '460px', sm: '540px', md: '650px' },
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
