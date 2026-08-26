import React, { useEffect, useMemo, useRef, useState } from 'react';
import Input from '@/presentation/components/register/Input';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  Lock,
  Pencil,
  RotateCw,
  ShieldCheck,
  Smartphone,
  User,
} from 'lucide-react';
import {
  registerProvider,
  resendOtp,
  verifyOtp as verifyOtpService,
} from '@/infrastructure/services/auth.service';

const otpInitialValue = ['', '', '', '', '', ''];

const StepAccount = ({
  formData,
  updateFormData,
  nextStep,
  isVerified,
  setIsVerified,
  lang,
  t,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [authStage, setAuthStage] = useState(isVerified ? 'otp' : 'basics');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(otpInitialValue);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpStatus, setOtpStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [phoneDraft, setPhoneDraft] = useState(formData.phone || '');

  const otpInputs = useRef([]);
  const formRef = useRef(null);
  const successTimerRef = useRef(null);

  const copy = useMemo(
    () => ({
      basicsTitle: lang === 'ar' ? 'ابدأ ببيانات الحساب' : 'Start with account basics',
      basicsText:
        lang === 'ar'
          ? 'نستخدم هذه البيانات لإنشاء طلب مزود الخدمة قبل إرسال رمز التحقق.'
          : 'We use these details to create your provider request before verification.',
      phoneTitle: lang === 'ar' ? 'تحقق من رقم الهاتف' : 'Verify phone number',
      phoneText:
        lang === 'ar'
          ? 'أدخل رقم واتساب فعال لاستلام رمز التحقق من Car Hero.'
          : 'Enter an active WhatsApp number to receive your Car Hero code.',
      otpTitle: lang === 'ar' ? 'أدخل رمز التحقق' : 'Enter verification code',
      otpGroupLabel: lang === 'ar' ? 'رمز التحقق المكوّن من ٦ خانات' : '6-digit verification code',
      otpDigitLabel: (n) =>
        lang === 'ar' ? `الخانة ${n} من ٦` : `Digit ${n} of 6`,
      otpText:
        lang === 'ar'
          ? 'أرسلنا رمزًا مكونًا من 6 خانات إلى'
          : 'We sent a 6-digit code to',
      completeTitle: lang === 'ar' ? 'تم تأكيد الرقم' : 'Phone confirmed',
      completeText:
        lang === 'ar'
          ? 'رقمك جاهز. يمكنك الانتقال لإكمال بيانات النشاط.'
          : 'Your number is ready. Continue to complete your business details.',
      passwordHint:
        lang === 'ar'
          ? '٨ أحرف على الأقل، مع حرف إنجليزي كبير ورقم واحد.'
          : 'At least 8 characters, including one capital letter and one number.',
      continue: lang === 'ar' ? 'متابعة' : 'Continue',
      continueToPhone: lang === 'ar' ? 'متابعة إلى رقم الهاتف' : 'Continue to phone',
      sendCode: lang === 'ar' ? 'إرسال الرمز' : 'Send code',
      changePhone: lang === 'ar' ? 'تعديل الرقم' : 'Edit phone',
      resendReady: lang === 'ar' ? 'إعادة إرسال الرمز' : 'Resend code',
      missingBasics:
        lang === 'ar'
          ? 'يرجى إدخال الاسم وكلمة مرور قوية قبل المتابعة.'
          : 'Enter your name and a strong password before continuing.',
      missingPhone:
        lang === 'ar'
          ? 'يرجى إدخال رقم هاتف سوري صحيح.'
          : 'Enter a valid Syrian phone number.',
      verified: lang === 'ar' ? 'تم التحقق بنجاح' : 'Verified successfully',
      checkingCode:
        lang === 'ar'
          ? '\u062c\u0627\u0631\u064a \u0627\u0644\u062a\u062d\u0642\u0642 \u0645\u0646 \u0627\u0644\u0631\u0645\u0632...'
          : 'Checking your code...',
      codeAccepted:
        lang === 'ar'
          ? '\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0631\u0645\u0632 \u0628\u0646\u062c\u0627\u062d'
          : 'Code confirmed successfully',
      movingNext:
        lang === 'ar'
          ? '\u0633\u0646\u0646\u0642\u0644\u0643 \u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a'
          : 'Taking you to the next step',
    }),
    [lang],
  );

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0 && !isVerified) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer, isVerified]);

  useEffect(() => {
    setPhoneDraft(formData.phone || '');
  }, [formData.phone]);

  useEffect(
    () => () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    },
    [],
  );

  const isPasswordValid = (value) =>
    value.length >= 8 && /^(?=.*[A-Z])(?=.*\d)/.test(value);

  // `required` يفحص الفراغ عند محاولة الإرسال فقط — لا نصرخ في وجه المستخدم
  // قبل أن يبدأ الكتابة، لكن الضغط على «متابعة» يجب أن يشرح أي حقل ينقص.
  const validate = (name, value, { required = false } = {}) => {
    let validationError = '';
    if (required && !String(value).trim()) {
      setErrors((prev) => ({ ...prev, [name]: t.errors.required }));
      return false;
    }
    if (name === 'fullName' && value.trim().length > 0 && value.trim().length < 3) {
      validationError = t.errors.shortName;
    }
    if (name === 'phone' && value.length === 10 && !/^09[0-9]{8}$/.test(value)) {
      validationError = t.errors.invalidPhone;
    }
    if (name === 'password' && value.length > 0 && !isPasswordValid(value)) {
      validationError = t.errors.passLength;
    }
    if (
      name === 'confirmPassword' &&
      value.length > 0 &&
      value !== formData.password
    ) {
      validationError = t.errors.passMismatch;
    }

    setErrors((prev) => ({ ...prev, [name]: validationError }));
    return !validationError;
  };

  const isFieldValid = (name) => {
    const value = formData[name] || '';
    if (name === 'fullName') return value.trim().length >= 3;
    if (name === 'phone') return /^09[0-9]{8}$/.test(phoneDraft);
    if (name === 'password') return isPasswordValid(value);
    if (name === 'confirmPassword') {
      return value.length >= 8 && value === formData.password;
    }
    return false;
  };

  const formattedPhone = () => `+963${(formData.phone || phoneDraft).slice(1)}`;

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFormData({ [name]: value });
    validate(name, value);
  };

  const handlePhoneChange = (event) => {
    const value = event.target.value
      .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
      .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
      .replace(/\D/g, '')
      .slice(0, 10);

    setPhoneDraft(value);
    updateFormData({ phone: value });

    if (touched.phone && value.length === 10) {
      validate('phone', value);
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    if (phoneDraft.length > 0 && phoneDraft.length < 10) {
      setErrors((prev) => ({ ...prev, phone: t.errors.invalidPhone }));
      return;
    }
    validate('phone', phoneDraft);
  };

  /**
   * ينقل التركيز إلى أوّل حقل غير صالح.
   *
   * يُحسب الاسم هنا مباشرةً بدل الاعتماد على `[aria-invalid="true"]` في
   * DOM: عند الإرسال تُضبط الأخطاء بـsetState، وقراءة السمة داخل rAF قد
   * تسبق تثبيت React للتحديث فلا تجد شيئاً.
   */
  const focusFirstInvalid = (fieldNames) => {
    const firstInvalidName = fieldNames.find((fieldName) => !isFieldValid(fieldName));
    if (!firstInvalidName) return;
    const node = formRef.current?.querySelector(`[name="${firstInvalidName}"]`);
    if (!node) return;
    node.focus();
    node.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };

  const continueToPhone = () => {
    const nextTouched = {
      fullName: true,
      password: true,
      confirmPassword: true,
    };
    setTouched((prev) => ({ ...prev, ...nextTouched }));
    validate('fullName', formData.fullName || '', { required: true });
    validate('password', formData.password || '', { required: true });
    validate('confirmPassword', formData.confirmPassword || '', { required: true });

    if (
      !isFieldValid('fullName') ||
      !isFieldValid('password') ||
      !isFieldValid('confirmPassword')
    ) {
      setError(copy.missingBasics);
      // النموذج كان يرفض التقدّم ويترك التركيز على زر «متابعة»: المستخدم
      // يقرأ بانراً عاماً ثم يبحث بنفسه عن الحقل الناقص.
      focusFirstInvalid(['fullName', 'password', 'confirmPassword']);
      return;
    }

    setError(null);
    setAuthStage('phone');
  };

  const sendOtp = async () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    validate('phone', phoneDraft || '');
    if (!isFieldValid('phone')) {
      setError(copy.missingPhone);
      return;
    }

    setError(null);
    setIsVerifying(true);
    try {
      const phone = formattedPhone();

      let registerResponse;
      try {
        registerResponse = await registerProvider(formData.fullName, phone, formData.password);
      } catch (err) {
        const msg = err.message || 'Registration failed';
        if (msg.includes('already exists') || err.status === 409) {
          try {
            await resendOtp(phone);
          } catch {
            throw new Error(
              lang === 'ar'
                ? 'هذا الرقم مسجل بالفعل. يرجى تسجيل الدخول أو استخدام رقم آخر.'
                : 'This phone number is already registered. Please log in or use another number.',
            );
          }
        } else {
          throw err;
        }
      }

      // في التطوير المحلي بلا واتساب، الخادم يتخطّى رمز التحقق (`DEV_SKIP_OTP`)
      // ويُرجع جلسة كاملة (`accessToken`) مباشرة بدل تحدّي OTP — فلا يوجد رمز
      // يُرسل أصلاً، ولا معنى لعرض شاشة إدخاله. كانت هذه الحالة تُتجاهَل هنا
      // فتبقى الشاشة على ستّ خانات فارغة إلى الأبد لأن لا رمز وصل ولا مستخدم
      // يعرف من أين يجيء.
      if (registerResponse?.data?.accessToken) {
        setIsVerified(true);
        successTimerRef.current = setTimeout(() => nextStep(), 600);
        return;
      }

      setIsOtpSent(true);
      setAuthStage('otp');
      setTimer(60);
      setOtpValues(otpInitialValue);
      setOtpStatus('idle');
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    } catch (err) {
      console.error(err);
      if (err.status === 404) {
        setIsOtpSent(false);
        setAuthStage('phone');
        setError(
          lang === 'ar'
            ? '\u0627\u0646\u062a\u0647\u062a \u062c\u0644\u0633\u0629 \u0627\u0644\u062a\u0633\u062c\u064a\u0644. \u0623\u0631\u0633\u0644 \u0631\u0645\u0632\u0627\u064b \u062c\u062f\u064a\u062f\u0627\u064b \u0644\u0647\u0630\u0627 \u0627\u0644\u0631\u0642\u0645.'
            : 'Registration session expired. Send a new code for this number.',
        );
        return;
      }
      setError(
        err.message ||
          (lang === 'ar'
            ? 'حدث خطأ أثناء إرسال رمز التحقق'
            : 'Failed to send OTP code'),
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOtpOnly = async () => {
    setError(null);
    setIsVerifying(true);
    try {
      await resendOtp(formattedPhone());
      setTimer(60);
      setOtpValues(otpInitialValue);
      setOtpStatus('idle');
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          (lang === 'ar'
            ? 'حدث خطأ أثناء إعادة إرسال رمز التحقق'
            : 'Failed to resend OTP code'),
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyOtp = async (code) => {
    if (isVerifying || otpStatus === 'success') return;

    setIsVerifying(true);
    setOtpStatus('checking');
    setError(null);
    try {
      await verifyOtpService(formattedPhone(), code);
      setIsVerified(true);
      setOtpStatus('success');
      successTimerRef.current = setTimeout(() => {
        nextStep();
      }, 850);
    } catch (err) {
      console.error(err);
      setOtpStatus('idle');
      setError(
        err.message ||
          (lang === 'ar' ? 'رمز التحقق غير صحيح' : 'Invalid OTP code'),
      );
      setOtpValues(otpInitialValue);
      setTimeout(() => otpInputs.current[0]?.focus(), 100);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isVerifying || otpStatus === 'success') return;
    if (!/^\d*$/.test(value)) return;
    const nextValues = [...otpValues];
    nextValues[index] = value.slice(-1);
    setOtpValues(nextValues);
    setOtpStatus('idle');

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }

    if (nextValues.every(Boolean)) {
      verifyOtp(nextValues.join(''));
    }
  };

  const handleOtpPaste = (event) => {
    if (isVerifying || otpStatus === 'success') return;
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length !== 6) return;
    event.preventDefault();
    const nextValues = pasted.split('');
    setOtpValues(nextValues);
    verifyOtp(pasted);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const FreeSyriaFlag = () => (
    <svg
      width="24"
      height="16"
      viewBox="0 0 3 2"
      className="shrink-0 rounded-sm shadow-sm ring-1 ring-slate-200 dark:ring-white/10"
    >
      <rect width="3" height="0.666" fill="#007A3D" />
      <rect y="0.666" width="3" height="0.666" fill="#FFFFFF" />
      <rect y="1.333" width="3" height="0.666" fill="#000000" />
      <g fill="#EE1C25">
        <path
          d="M 0.75 1.0 L 0.8 1.15 H 0.96 L 0.83 1.25 L 0.88 1.4 L 0.75 1.3 L 0.62 1.4 L 0.67 1.25 L 0.54 1.15 H 0.7 L 0.75 1.0"
          transform="scale(0.8) translate(0.2, 0.1)"
        />
        <path
          d="M 1.5 1.0 L 1.55 1.15 H 1.71 L 1.58 1.25 L 1.63 1.4 L 1.5 1.3 L 1.37 1.4 L 1.42 1.25 L 1.29 1.15 H 1.45 L 1.5 1.0"
          transform="scale(0.8) translate(0.38, 0.1)"
        />
        <path
          d="M 2.25 1.0 L 2.3 1.15 H 2.46 L 2.33 1.25 L 2.38 1.4 L 2.25 1.3 L 2.12 1.4 L 2.17 1.25 L 2.04 1.15 H 2.2 L 2.25 1.0"
          transform="scale(0.8) translate(0.56, 0.1)"
        />
      </g>
    </svg>
  );

  const StageDot = ({ stage, label, index }) => {
    const order = ['basics', 'phone', 'otp'];
    const activeIndex = order.indexOf(authStage);
    const dotIndex = order.indexOf(stage);
    const isActive = authStage === stage;
    const isDone = activeIndex > dotIndex || (stage === 'otp' && isVerified);

    return (
      <div className="flex min-w-0 items-center gap-2">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
            isDone
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : isActive
                ? 'border-[var(--primary-surface)] bg-[var(--primary-surface)] text-[var(--on-primary)]'
                : 'border-[var(--border-color)] bg-[var(--input-bg)] text-[var(--text-muted)]'
          }`}
        >
          {isDone ? <CheckCircle2 size={16} /> : index}
        </div>
        <span
          className={`hidden truncate text-xs font-bold uppercase sm:block ${
            isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  const renderPhoneInput = () => (
    <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-2`}>
      <label
        htmlFor="register-phone"
        className={`block px-1 text-sm font-bold ${
          errors.phone && touched.phone ? 'text-rose-500' : 'text-[var(--text-muted)]'
        }`}
      >
        {t.account.phone} <span className="text-rose-500" aria-hidden="true">*</span>
      </label>
      <div className="relative h-[58px]">
        <input
          id="register-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={phoneDraft}
          disabled={isVerified}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder={t.account.phonePlac}
          required
          aria-invalid={errors.phone && touched.phone ? 'true' : undefined}
          aria-describedby={errors.phone && touched.phone ? 'register-phone-error' : undefined}
          className={`h-full w-full rounded-[12px] border bg-[var(--input-bg)] text-xl font-bold text-[var(--text-dark)] outline-none transition-colors placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40 ${
            lang === 'ar' ? 'pr-32 pl-12 text-right' : 'pl-32 pr-12 text-left'
          } ${
            isVerified
              ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
              : errors.phone && touched.phone
                ? 'border-rose-500 ring-4 ring-rose-500/10'
                : 'border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)]'
          }`}
        />
        <div
          className={`absolute top-1/2 flex h-1/2 -translate-y-1/2 items-center gap-2 border-[var(--border-color)] px-2 ${
            lang === 'ar'
              ? 'right-3 border-l'
              : 'left-3 border-r'
          }`}
        >
          <FreeSyriaFlag />
          <span className="text-sm font-bold text-[var(--primary)]">+963</span>
        </div>
      </div>
      {errors.phone && touched.phone && (
        <p id="register-phone-error" role="alert" className="px-2 text-[12.5px] font-bold leading-relaxed text-rose-500">
          {errors.phone}
        </p>
      )}
    </div>
  );

  const renderBasics = () => (
    // كان القسم بلا `form`: Enter لا يقدّم الخطوة، ومديرو كلمات المرور لا
    // يتعرّفون على الحقول كنموذج تسجيل فلا يعرضون الحفظ.
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        continueToPhone();
      }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
    >
      <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-3`}>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--primary)]/10 text-[var(--primary)]">
          <Fingerprint size={26} />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-dark)]">
          {copy.basicsTitle}
        </h2>
        <p className="max-w-md text-sm font-semibold leading-7 text-[var(--text-muted)]">
          {copy.basicsText}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            lang={lang}
            icon={<User size={18} />}
            label={t.account.fullName}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName ? errors.fullName : ''}
            isValid={isFieldValid('fullName')}
            placeholder={t.account.fullNamePlac}
            autoComplete="name"
            required
          />
        </div>
        <Input
          lang={lang}
          icon={<Lock size={18} />}
          label={t.account.password}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ''}
          isValid={isFieldValid('password')}
          placeholder="********"
          autoComplete="new-password"
          // الشرط كان يظهر كخطأ بعد الفشل فقط — ذكره مسبقاً يوفّر محاولة ضائعة
          hint={copy.passwordHint}
          required
        />
        <Input
          lang={lang}
          icon={<ShieldCheck size={18} />}
          label={t.account.confirmPassword}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          isValid={isFieldValid('confirmPassword')}
          placeholder="********"
          autoComplete="new-password"
          required
        />
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--primary-surface)] px-5 text-sm font-bold uppercase text-[var(--on-primary)] shadow-lg shadow-violet-600/20 transition-colors hover:bg-[var(--primary-surface-hover)] active:scale-[0.99]"
          >
            <span>{copy.continueToPhone}</span>
            {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </form>
  );

  const renderPhone = () => (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        sendOtp();
      }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
    >
      <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-3`}>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--primary)]/10 text-[var(--primary)]">
          <Smartphone size={26} />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-dark)]">
          {copy.phoneTitle}
        </h2>
        <p className="max-w-md text-sm font-semibold leading-7 text-[var(--text-muted)]">
          {copy.phoneText}
        </p>
      </div>

      <div className="space-y-5">
        {renderPhoneInput()}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_1fr]">
          <button
            type="button"
            onClick={() => {
              setError(null);
              setAuthStage('basics');
            }}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] border border-[var(--border-color)] bg-[var(--input-bg)] px-5 text-sm font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
          >
            <Pencil size={16} />
            <span>{lang === 'ar' ? 'تعديل البيانات' : 'Edit details'}</span>
          </button>
          <button
            type="submit"
            disabled={isVerifying}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[12px] bg-[var(--primary-surface)] px-5 text-sm font-bold uppercase text-[var(--on-primary)] shadow-lg shadow-violet-600/20 transition-colors hover:bg-[var(--primary-surface-hover)] disabled:cursor-wait disabled:opacity-70"
          >
            {isVerifying && <RotateCw size={16} className="animate-spin" aria-hidden="true" />}
            <span>{copy.sendCode}</span>
          </button>
        </div>
      </div>
    </form>
  );

  const renderOtp = () => (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className={`${lang === 'ar' ? 'text-right' : 'text-left'} space-y-3`}>
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-[var(--primary)]/10 text-[var(--primary)]">
          <ShieldCheck size={26} />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-dark)]">
          {copy.otpTitle}
        </h2>
        <p className="max-w-md text-sm font-semibold leading-7 text-[var(--text-muted)]">
          {copy.otpText}{' '}
          <span className="whitespace-nowrap font-bold text-[var(--text-dark)]">
            {formattedPhone()}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            setError(null);
            setAuthStage('phone');
          }}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--primary)] hover:underline"
        >
          <Pencil size={14} />
          <span>{copy.changePhone}</span>
        </button>
      </div>

      <div className="space-y-5">
        {/* ستّ خانات كانت بلا تسمية إطلاقاً: قارئ الشاشة يعلن ستّة حقول
            نصّية متطابقة بلا اسم ولا موضع. المجموعة تحمل الاسم العام وكل
            خانة ترتيبها. */}
        <div
          role="group"
          aria-label={copy.otpGroupLabel}
          className="direction-ltr flex justify-center gap-2 sm:gap-4"
          dir="ltr"
        >
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                otpInputs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              aria-label={copy.otpDigitLabel(index + 1)}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={value}
              disabled={isVerifying || otpStatus === 'success'}
              onPaste={handleOtpPaste}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className={`aspect-square w-11 rounded-[12px] border-2 bg-[var(--input-bg)] text-center text-xl font-bold shadow-sm outline-none transition-all sm:w-14 sm:text-2xl ${
                otpStatus === 'success'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 ring-4 ring-emerald-500/10 dark:text-emerald-400'
                  : otpStatus === 'checking'
                    ? 'border-[var(--primary)] text-[var(--primary)] ring-4 ring-[var(--primary-a10)]'
                    : 'border-[var(--border-color)] text-[var(--primary)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)]'
              } disabled:cursor-wait`}
            />
          ))}
        </div>

        {(otpStatus === 'checking' || otpStatus === 'success') && (
          <div
            aria-live="polite"
            className={`mx-auto flex max-w-md items-center justify-center gap-3 rounded-[12px] border px-4 py-3 text-center text-sm font-bold transition-all ${
              otpStatus === 'success'
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                : 'border-[var(--primary-a20)] bg-[var(--primary-a10)] text-[var(--primary)]'
            }`}
          >
            {otpStatus === 'success' ? (
              <CheckCircle2 size={20} className="shrink-0 stroke-[3px]" />
            ) : (
              <RotateCw size={18} className="shrink-0 animate-spin" />
            )}
            <span>
              {otpStatus === 'success'
                ? `${copy.codeAccepted}. ${copy.movingNext}`
                : copy.checkingCode}
            </span>
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border-color)] pt-4 text-center sm:flex-row sm:text-start">
          {timer > 0 ? (
            <span className="text-xs font-bold uppercase text-[var(--text-muted)]">
              {t.account.resendOtp} ({String(Math.floor(timer / 60)).padStart(2, '0')}:
              {String(timer % 60).padStart(2, '0')})
            </span>
          ) : (
            <button
              type="button"
              onClick={resendOtpOnly}
              disabled={isVerifying}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[var(--primary)] hover:underline disabled:cursor-wait disabled:opacity-70"
            >
              <RotateCw size={14} className={isVerifying ? 'animate-spin' : ''} />
              <span>{copy.resendReady}</span>
            </button>
          )}
          {isVerifying && (
            <span className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)]">
              <RotateCw size={14} className="animate-spin text-[var(--primary)]" />
              {t.common.loading}
            </span>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-xl font-bold uppercase tracking-tight text-[var(--text-dark)] sm:text-2xl">
            {t.account.title}
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[var(--text-muted)]">
            {copy.verified && isVerified ? copy.verified : t.account.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StageDot stage="basics" label={t.account.fullName} index={1} />
          <StageDot stage="phone" label={t.account.phone} index={2} />
          <StageDot stage="otp" label={t.account.otpLabel} index={3} />
        </div>
      </div>

      {error && (
        // بانر الخطأ العام كان صامتاً لقارئ الشاشة: يظهر بصرياً فقط، فمستخدم
        // لوحة المفاتيح يضغط «متابعة» ولا يسمع شيئاً ولا يفهم لماذا لم يتقدّم
        <div
          role="alert"
          className="rounded-[12px] border border-rose-500/20 bg-rose-500/10 p-4 text-center text-sm font-bold text-rose-500"
        >
          {error}
        </div>
      )}

      {authStage === 'basics' && renderBasics()}
      {authStage === 'phone' && renderPhone()}
      {authStage === 'otp' && renderOtp()}
    </div>
  );
};

export default StepAccount;
