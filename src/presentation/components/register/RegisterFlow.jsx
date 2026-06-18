import React, { useState, useEffect } from 'react';
import { translations } from './translations';
import { StepId } from './types';
import Stepper from './Stepper';
import StepAccount from './StepAccount';
import StepContact from './StepContact';
import StepServices from './StepServices';
import StepHours from './StepHours';
import StepSuccess from './StepSuccess';
import Navbar from '@/presentation/components/layout/Navbar';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useTranslation } from 'react-i18next';
import i18n from '@/infrastructure/i18n';
import { useTheme } from '@mui/material/styles';

const RegisterFlow = () => {
  const { t: tGlobal } = useTranslation();
  const themeMui = useTheme();
  const theme = themeMui.palette.mode;
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';
  
  const [currentStep, setCurrentStep] = useState(StepId.ACCOUNT);
  const [isVerified, setIsVerified] = useState(false);
  // Remove local lang/theme states
  const [formData, setFormData] = useState({
    fullName: '', businessName: '', category: '', email: '', password: '', confirmPassword: '',
    referral: '', phone: '', whatsapp: '', location: '', serviceArea: '', district: '',
    coverageAreas: [], instagram: '', facebook: '',
    serviceType: [], servicePrices: {}, is_emergency: false,
    facilities: [], experienceYears: 0, techCount: 0, additionalInfo: '',
    workingHours: {
      'الأحد': { start: '08:00', end: '18:00', closed: false },
      'الإثنين': { start: '08:00', end: '18:00', closed: false },
      'الثلاثاء': { start: '08:00', end: '18:00', closed: false },
      'الأربعاء': { start: '08:00', end: '18:00', closed: false },
      'الخميس': { start: '08:00', end: '18:00', closed: false },
      'الجمعة': { start: '08:00', end: '18:00', closed: true },
      'السبت': { start: '08:00', end: '18:00', closed: false }
    },
    shopPhotos: []
  });

  // Global synchronization is handled by RootWrapper
  // We just listen to theme/lang changes via hooks above

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, StepId.SUCCESS));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, StepId.ACCOUNT));

  const t = translations[lang];

  const renderStep = () => {
    const props = { formData, updateFormData, nextStep, prevStep, lang, t };
    switch (currentStep) {
      case StepId.ACCOUNT: return <StepAccount {...props} isVerified={isVerified} setIsVerified={setIsVerified} />;
      case StepId.CONTACT: return <StepContact {...props} />;
      case StepId.SERVICES: return <StepServices {...props} />;
      case StepId.HOURS: return <StepHours {...props} />;
      case StepId.SUCCESS: return <StepSuccess lang={lang} t={t} formData={formData} />;
      default: return <StepAccount {...props} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-primary ${theme === 'dark' ? 'bg-[#1a0f2e]' : 'bg-slate-50'}`} style={{ background: theme === 'dark' ? 'linear-gradient(135deg, #1a0f2e 0%, #2d1b3d 100%)' : undefined }}>
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/5 dark:bg-[#8f5cb1]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 dark:bg-[#e88ccd]/5 blur-[120px] rounded-full animate-pulse"></div>
      </div>

      <Navbar minimal={true} />

      <main className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 lg:py-10 flex flex-col items-center">
        {currentStep !== StepId.SUCCESS && (
          <div className="w-full max-w-6xl mb-8 lg:mb-10 space-y-2 text-center px-2 sm:px-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#8f5cb1] dark:text-[#a57ed8] tracking-tight leading-tight">
                {t.header.title}
              </h1>
             {t.header.subtitle && <p className="text-slate-500 dark:text-[#c9a7e3] font-bold uppercase text-xs sm:text-sm">{t.header.subtitle}</p>}
             <div className="pt-5 lg:pt-6">
               <Stepper currentStep={currentStep} lang={lang} />
             </div>
          </div>
        )}

        <div className={`w-full max-w-6xl glass rounded-[20px] lg:rounded-[24px] p-5 sm:p-7 lg:p-8 shadow-2xl relative overflow-hidden transition-all duration-700`}>
          {currentStep !== StepId.SUCCESS && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-[#0c0816]">
              <div 
                className="h-full bg-gradient-to-r from-[#8f5cb1] to-[#d1b3ff] transition-all duration-700"
                style={{ width: `${(currentStep / StepId.HOURS) * 100}%` }}
              ></div>
            </div>
          )}
          {renderStep()}
        </div>

        {currentStep !== StepId.SUCCESS && (
          <button 
            className="mt-7 flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-[#8f5cb1] dark:hover:text-[#d1b3ff] transition-all active:scale-95 group font-bold uppercase text-xs"
            onClick={() => window.location.href = '/'}
          >
            {lang === 'ar' ? (
              <><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> {t.common.backToHome}</>
            ) : (
              <><ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.common.backToHome}</>
            )}
          </button>
        )}
      </main>

      <style>{`
        .glass {
          background: ${theme === 'dark' ? 'rgba(26, 21, 37, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
          backdrop-filter: blur(20px);
          border: 1px solid ${theme === 'dark' ? 'rgba(143, 92, 177, 0.2)' : 'rgba(143, 92, 177, 0.15)'};
          box-shadow: ${theme === 'dark' ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(143, 92, 177, 0.1)'};
        }
        .direction-ltr { direction: ltr; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        label { font-family: 'Poppins', sans-serif !important; }
        h1, h2, h3, h4, span, button { font-family: 'Poppins', sans-serif !important; }
      `}</style>
    </div>
  );
};

export default RegisterFlow;
