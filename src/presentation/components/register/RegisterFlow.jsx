import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import i18n from '@/infrastructure/i18n';

const RegisterFlow = () => {
  const navigate = useNavigate();
  const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';
  
  const [currentStep, setCurrentStep] = useState(StepId.ACCOUNT);
  const [isVerified, setIsVerified] = useState(false);
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
    <div className={`min-h-screen transition-colors duration-500 font-primary bg-[var(--bg-default)]`}>
      {/* Background Orbs (Optimized) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)]/5 blur-[80px] rounded-full animate-pulse opacity-70" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 dark:bg-[#e88ccd]/5 blur-[80px] rounded-full animate-pulse opacity-70" style={{ animationDuration: '5s' }}></div>
      </div>

      <Navbar minimal={true} />

      <main id="main" className="relative z-10 container mx-auto px-3 sm:px-4 pt-24 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 flex flex-col items-center">
        {currentStep !== StepId.SUCCESS && (
          <div className="w-full max-w-6xl mb-8 lg:mb-10 space-y-2 text-center px-2 sm:px-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-[var(--primary)] tracking-tight leading-tight">
                {t.header.title}
              </h1>
             {t.header.subtitle && <p className="text-[var(--text-muted)] font-bold uppercase text-xs sm:text-sm">{t.header.subtitle}</p>}
             <div className="pt-5 lg:pt-6">
               <Stepper currentStep={currentStep} lang={lang} />
             </div>
          </div>
        )}

        <div className={`w-full max-w-6xl glass rounded-[20px] lg:rounded-[24px] p-5 sm:p-7 lg:p-8 shadow-2xl relative overflow-hidden transition-opacity duration-500`}>
          {currentStep !== StepId.SUCCESS && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-[#0c0816]">
              <div 
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] transition-all duration-500"
                style={{ width: `${(currentStep / StepId.HOURS) * 100}%` }}
              ></div>
            </div>
          )}
          {renderStep()}
        </div>

        {currentStep !== StepId.SUCCESS && (
          <button
            // كان `type` غير محدّد داخل شجرة تحوي نماذج، فيصير submit ضمنياً
            type="button"
            className="mt-7 inline-flex min-h-[44px] items-center gap-2 px-3 text-[var(--text-muted)] hover:text-[var(--primary)] transition-all active:scale-95 group font-bold text-xs"
            onClick={() => navigate('/')}
          >
            {lang === 'ar' ? (
              <><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> {t.common.backToHome}</>
            ) : (
              <><ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t.common.backToHome}</>
            )}
          </button>
        )}
      </main>

      {/* كانت هنا قاعدتان تفرضان Poppins على كل العناوين والأزرار والتسميات
          بـ !important. وPoppins بلا محارف عربية، فيسقط تصيير النص العربي
          إلى خط احتياطي عشوائي — داخل أهم مسار تحويل في الموقع. الخط الآن
          من جذر المستند حسب الاتجاه. */}
      <style>{`
        .glass {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-hover);
        }
        .direction-ltr { direction: ltr; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default RegisterFlow;
