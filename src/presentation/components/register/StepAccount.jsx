import React, { useState, useRef, useEffect } from 'react';
import Input from '@/presentation/components/register/Input';
import { User, Lock, ArrowLeft, ArrowRight, ShieldCheck, Fingerprint, CheckCircle2, RotateCw, Smartphone } from 'lucide-react';
import { registerProvider, resendOtp, verifyOtp as verifyOtpService } from '@/infrastructure/services/auth.service';

const StepAccount = ({ formData, updateFormData, nextStep, isVerified, setIsVerified, lang, t }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);
  
  const otpInputs = useRef([]);

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0 && !isVerified) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer, isVerified]);

  const validate = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      if (value.trim().length > 0 && value.trim().length < 3) error = t.errors.shortName;
    }
    if (name === 'phone') {
      const phoneRegex = /^09[0-9]{8}$/;
      if (value.length > 0 && !phoneRegex.test(value)) error = t.errors.invalidPhone;
    }
    if (name === 'password') {
      if (value.length > 0 && value.length < 8) error = t.errors.passLength;
    }
    if (name === 'confirmPassword') {
      if (value.length > 0 && value !== formData.password) error = t.errors.passMismatch;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const isFieldValid = (name) => {
    const value = formData[name] || '';
    if (name === 'fullName') return value.trim().length >= 3;
    if (name === 'phone') return /^09[0-9]{8}$/.test(value);
    if (name === 'password') return value.length >= 8;
    if (name === 'confirmPassword') return value.length >= 8 && value === formData.password;
    return false;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    validate(name, value);
  };

  const sendOtp = async () => {
    if (!isFieldValid('phone')) return;
    setError(null);
    setIsVerifying(true);
    try {
      const formattedPhone = `+963${formData.phone.slice(1)}`;

      try {
        await registerProvider(formData.fullName, formattedPhone, formData.password);
      } catch (err) {
        const msg = err.message || 'Registration failed';
        if (msg.includes('already exists') || err.status === 409) {
          try {
            await resendOtp(formattedPhone);
            setIsOtpSent(true);
            setTimer(60);
            setOtpValues(['', '', '', '', '', '']);
            setTimeout(() => {
              otpInputs.current[0]?.focus();
            }, 100);
            return;
          } catch (e) {
            // Ignore fallback resend error, throw original conflict
          }
          throw new Error(lang === 'ar' ? 'هذا الرقم مسجل بالفعل. يرجى تسجيل الدخول أو استخدام رقم آخر.' : 'This phone number is already registered. Please log in or use another number.');
        }
        throw err;
      }

      setIsOtpSent(true);
      setTimer(60);
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
         otpInputs.current[0]?.focus();
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.message || (lang === 'ar' ? 'حدث خطأ أثناء إرسال رمز التحقق' : 'Failed to send OTP code'));
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOtpOnly = async () => {
    setError(null);
    setIsVerifying(true);
    try {
      const formattedPhone = `+963${formData.phone.slice(1)}`;
      await resendOtp(formattedPhone);
      setTimer(60);
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.message || (lang === 'ar' ? 'حدث خطأ أثناء إعادة إرسال رمز التحقق' : 'Failed to resend OTP code'));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    if (newOtpValues.every(val => val !== '')) {
      verifyOtp(newOtpValues.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = async (code) => {
    setIsVerifying(true);
    setError(null);
    try {
      const formattedPhone = `+963${formData.phone.slice(1)}`;
      await verifyOtpService(formattedPhone, code);
      setIsVerified(true);
    } catch (err) {
      console.error(err);
      setError(err.message || (lang === 'ar' ? 'رمز التحقق غير صحيح' : 'Invalid OTP code'));
      setOtpValues(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputs.current[0]?.focus();
      }, 100);
    } finally {
      setIsVerifying(false);
    }
  };

  const isFormValid = () => {
    return (
      isFieldValid('fullName') &&
      isFieldValid('phone') &&
      isVerified &&
      isFieldValid('password') &&
      isFieldValid('confirmPassword')
    );
  };

  const handleNext = () => {
    if (isFormValid()) nextStep();
  };

  const FreeSyriaFlag = () => (
    <svg width="24" height="16" viewBox="0 0 3 2" className="rounded-sm shadow-sm ring-1 ring-slate-200 dark:ring-white/10 shrink-0">
      <rect width="3" height="0.666" fill="#007A3D"/>
      <rect y="0.666" width="3" height="0.666" fill="#FFFFFF"/>
      <rect y="1.333" width="3" height="0.666" fill="#000000"/>
      <g fill="#EE1C25">
        <path d="M 0.75 1.0 L 0.8 1.15 H 0.96 L 0.83 1.25 L 0.88 1.4 L 0.75 1.3 L 0.62 1.4 L 0.67 1.25 L 0.54 1.15 H 0.7 L 0.75 1.0" transform="scale(0.8) translate(0.2, 0.1)"/>
        <path d="M 1.5 1.0 L 1.55 1.15 H 1.71 L 1.58 1.25 L 1.63 1.4 L 1.5 1.3 L 1.37 1.4 L 1.42 1.25 L 1.29 1.15 H 1.45 L 1.5 1.0" transform="scale(0.8) translate(0.38, 0.1)"/>
        <path d="M 2.25 1.0 L 2.3 1.15 H 2.46 L 2.33 1.25 L 2.38 1.4 L 2.25 1.3 L 2.12 1.4 L 2.17 1.25 L 2.04 1.15 H 2.2 L 2.25 1.0" transform="scale(0.8) translate(0.56, 0.1)"/>
      </g>
    </svg>
  );

  return (
    <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="p-2.5 bg-violet-600/10 dark:bg-[#8f5cb1]/10 rounded-xl text-violet-600 dark:text-[#8f5cb1]">
          <Fingerprint size={28} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-violet-700 dark:!text-white uppercase tracking-tight">{t.account.title}</h2>
          {t.account.subtitle && <p className="text-slate-500 dark:text-[#c9a7e3] text-[11px] sm:text-xs font-bold uppercase tracking-wider">{t.account.subtitle}</p>}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-center font-bold text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <div className="md:col-span-1">
          <Input 
            lang={lang} icon={<User size={18} />} label={t.account.fullName} name="fullName"
            value={formData.fullName} onChange={handleChange} onBlur={handleBlur}
            error={touched.fullName ? errors.fullName : ''} 
            isValid={isFieldValid('fullName')}
            placeholder={t.account.fullNamePlac} required
          />
        </div>

        <div className="md:col-span-1 space-y-1.5 flex flex-col">
          <label className={`block text-sm font-bold uppercase px-1 ${errors.phone && touched.phone ? 'text-rose-500' : 'text-slate-500 dark:text-[#c9a7e3]'}`}>
            {t.account.phone} <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center h-[52px]">
            <div className="relative flex-1 h-full">
               <input
                name="phone" type="tel" maxLength={10} value={formData.phone}
                disabled={isVerified}
                onChange={handleChange} onBlur={handleBlur} placeholder={t.account.phonePlac}
                className={`w-full h-full transition-all duration-300 font-bold bg-[var(--input-bg)] border rounded-[12px] text-lg
                ${lang === 'ar' ? 'pr-28 pl-24 text-right' : 'pl-28 pr-24 text-left'} 
                text-[var(--text-dark)] placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40 outline-none 
                ${isVerified ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400' : errors.phone && touched.phone ? 'border-rose-500 ring-4 ring-rose-500/10 animate-shake' : 'border-[var(--border-color)] focus:border-[#8f5cb1] focus:ring-4 focus:ring-[#8f5cb1]/10'}`}
              />
              <div className={`absolute ${lang === 'ar' ? 'right-2.5' : 'left-2.5'} top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 border-slate-200 dark:border-white/10 ${lang === 'ar' ? 'border-l' : 'border-r'} h-1/2`}>
                <FreeSyriaFlag />
                <span className="text-violet-600 dark:text-[#d1b3ff] font-bold text-sm ml-1">+963</span>
              </div>
              {isVerified && (
                <div className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-emerald-500 animate-in zoom-in`}>
                  <CheckCircle2 size={24} className="stroke-[3px]" />
                </div>
              )}
            </div>
            {!isVerified && isFieldValid('phone') && !isOtpSent && (
               <button 
                type="button"
                onClick={sendOtp}
                className={`
                  absolute ${lang === 'ar' ? 'left-2' : 'right-2'} h-[40px] px-4 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all active:scale-95 z-20
                  bg-violet-600 dark:bg-[#8f5cb1] text-white hover:bg-violet-700 dark:hover:bg-[#a56dcc] shadow-lg shadow-violet-600/20 dark:shadow-[#8f5cb1]/20 animate-in fade-in zoom-in
                `}
              >
                {t.account.sendOtp}
              </button>
            )}
          </div>
          {errors.phone && touched.phone && <p className="text-[10px] sm:text-[11px] font-bold text-rose-500 px-2">{errors.phone}</p>}
          {isVerified && !touched.password && (
            <p className="text-[10px] font-bold text-emerald-500 px-2 animate-in slide-in-from-top-1">
              {lang === 'ar' ? 'تم التحقق من الرقم بنجاح' : 'Phone verified successfully'}
            </p>
          )}
        </div>

        {isOtpSent && !isVerified && (
          <div className="md:col-span-2 bg-violet-600/5 dark:bg-[#8f5cb1]/5 p-5 rounded-[24px] border border-violet-600/20 dark:border-[#8f5cb1]/20 animate-in slide-in-from-top-2 duration-500 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                 <Smartphone size={16} className="text-violet-600 dark:text-[#8f5cb1]" />
                 <span className="text-[11px] font-black text-violet-600 dark:text-[#d1b3ff] uppercase tracking-widest">{t.account.otpLabel}</span>
              </div>
              <div className="text-[11px] font-black">
                {timer > 0 ? (
                  <span className="text-slate-400 dark:text-white/40">{t.account.resendOtp} ({String(Math.floor(timer/60)).padStart(2,'0')}:{String(timer%60).padStart(2,'0')})</span>
                ) : (
                  <button onClick={resendOtpOnly} className="text-violet-600 dark:text-[#d1b3ff] hover:underline flex items-center gap-1.5 active:scale-95">
                    <RotateCw size={14} className="animate-spin-slow" /> {t.account.resendOtp}
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-2 sm:gap-4 direction-ltr" dir="ltr">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  ref={el => { otpInputs.current[i] = el; }}
                  type="text" inputMode="numeric" maxLength={1} value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-10 sm:w-14 aspect-square bg-[var(--input-bg)] border-2 border-[var(--border-color)] rounded-xl sm:rounded-2xl text-center text-lg sm:text-2xl font-black text-[#8f5cb1] dark:text-[#a57ed8] outline-none focus:border-[#8f5cb1] focus:ring-4 focus:ring-[#8f5cb1]/10 transition-all shadow-sm"
                />
              ))}
            </div>
            {isVerifying && (
              <div className="flex items-center justify-center gap-2 py-1">
                 <RotateCw size={16} className="animate-spin text-violet-600 dark:text-[#8f5cb1]" />
                 <span className="text-xs font-bold text-slate-400 dark:text-white/40">{t.common.loading}</span>
              </div>
            )}
          </div>
        )}

        <div className="md:col-span-1">
          <Input 
            lang={lang} icon={<Lock size={18} />} label={t.account.password} name="password" type="password"
            value={formData.password} onChange={handleChange} onBlur={handleBlur}
            error={touched.password ? errors.password : ''} 
            isValid={isFieldValid('password')}
            placeholder="••••••••" required
          />
        </div>

        <div className="md:col-span-1">
          <Input 
            lang={lang} icon={<ShieldCheck size={18} />} label={t.account.confirmPassword} name="confirmPassword" type="password"
            value={formData.confirmPassword || ''} onChange={handleChange} onBlur={handleBlur}
            error={touched.confirmPassword ? errors.confirmPassword : ''} 
            isValid={isFieldValid('confirmPassword')}
            placeholder="••••••••" required
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-12 py-3.5 font-black rounded-[14px] shadow-2xl transition-all active:scale-[0.98] overflow-hidden
          ${isFormValid() ? 'bg-violet-600 dark:bg-[#8f5cb1] hover:bg-violet-700 dark:hover:bg-[#a56dcc] text-white shadow-violet-600/30 dark:shadow-[#8f5cb1]/30' : 'bg-slate-200 dark:bg-[#1a1425] text-slate-400 dark:text-[#c9a7e3]/30 cursor-not-allowed opacity-60'}`}
        >
          <span className="relative z-10 text-base">{t.common.next}</span>
          {lang === 'ar' ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </div>
    </div>
  );
};

export default StepAccount;
