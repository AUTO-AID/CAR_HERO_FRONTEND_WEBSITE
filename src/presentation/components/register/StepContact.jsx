import React, { useRef, useState } from 'react';
import Input from '@/presentation/components/register/Input';
import CustomSelect from '@/presentation/components/register/CustomSelect';
import { MapPin, ChevronDown, Plus, X, Briefcase, Store, CheckCircle2, Crosshair, Map as MapIcon, ArrowLeft, ArrowRight } from 'lucide-react';

const REQUIRED_FIELDS = ['businessName', 'category', 'serviceArea', 'district', 'coverageAreas', 'location'];

const StepContact = ({ formData, updateFormData, nextStep, prevStep, lang, t }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [coverageInput, setCoverageInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const rootRef = useRef(null);

  const syriaLocations = t.contact.syriaLocations || {};
  const provinces = Object.keys(syriaLocations);
  const districts = formData.serviceArea ? syriaLocations[formData.serviceArea] : [];

  const validate = (name, value) => {
    let error = '';
    if (name === 'businessName' && (!value || value.trim().length < 2)) error = t.common.required;
    if (name === 'category' && !value) error = t.common.required;
    if (name === 'serviceArea' && !value) error = t.errors.selectArea;
    if (name === 'district' && !value) error = t.errors.selectDistrict;
    if (name === 'coverageAreas' && value.length === 0) error = t.errors.minCoverage;
    if (name === 'location' && !value) error = t.common.required;
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const isFieldValid = (name) => {
    const value = formData[name];
    if (name === 'businessName') return value && value.trim().length >= 2;
    if (name === 'category') return !!value;
    if (name === 'serviceArea') return !!value;
    if (name === 'district') return !!value;
    if (name === 'coverageAreas') return value && value.length > 0;
    if (name === 'location') return !!value;
    return false;
  };

  const handleBlur = (name, value) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceArea') {
      updateFormData({ serviceArea: value, district: '' });
    } else {
      updateFormData({ [name]: value });
    }
    validate(name, value);
  };

  const addCoverageArea = () => {
    if (coverageInput.trim()) {
      const updated = [...formData.coverageAreas, coverageInput.trim()];
      updateFormData({ coverageAreas: updated });
      setCoverageInput('');
      validate('coverageAreas', updated);
    }
  };

  const removeCoverageArea = (index) => {
    const updated = formData.coverageAreas.filter((_, i) => i !== index);
    updateFormData({ coverageAreas: updated });
    validate('coverageAreas', updated);
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const locStr = `${lat},${lng}`;
          updateFormData({ location: locStr });
          validate('location', locStr);
          setIsLocating(false);
          window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
        },
        () => {
          setIsLocating(false);
          window.open('https://www.google.com/maps', '_blank');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
      window.open('https://www.google.com/maps', '_blank');
    }
  };

  const isFormValid = () => REQUIRED_FIELDS.every(isFieldValid);

  /**
   * زرّ «التالي» كان `disabled` حتى تكتمل كل الحقول.
   *
   * الزرّ المعطّل لا يشرح ما الناقص، ولا يستقبل التركيز، ولا يُعلَن لقارئ
   * الشاشة — فالمستخدم يرى زرّاً رمادياً ويخمّن. نبقيه مفعّلاً، وعند النقر
   * نُظهر ما ينقص ونضع التركيز على أوّل حقل غير مكتمل.
   */
  const handleNext = () => {
    if (isFormValid()) {
      setSummaryError('');
      nextStep();
      return;
    }

    setTouched((prev) => ({
      ...prev,
      ...Object.fromEntries(REQUIRED_FIELDS.map((field) => [field, true])),
    }));
    REQUIRED_FIELDS.forEach((field) => validate(field, formData[field]));
    setSummaryError(
      lang === 'ar'
        ? 'يرجى إكمال الحقول المطلوبة المميّزة بالأحمر قبل المتابعة.'
        : 'Please complete the required fields marked in red before continuing.',
    );

    const firstMissing = REQUIRED_FIELDS.find((field) => !isFieldValid(field));
    const node = rootRef.current?.querySelector(
      `[name="${firstMissing}"], #${firstMissing}-field, [data-field="${firstMissing}"]`,
    );
    if (node) {
      node.focus();
      node.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  return (
    <div ref={rootRef} className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-primary">
      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="p-2.5 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)]">
          <Store size={28} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-dark)] uppercase tracking-tight">{t.contact.title}</h2>
          <p className="text-[var(--text-muted)] text-[11px] sm:text-xs font-bold uppercase tracking-wider">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <div className="md:col-span-1">
          <Input 
            lang={lang} 
            icon={<Briefcase size={18} />} 
            label={t.contact.businessName} 
            name="businessName"
            value={formData.businessName} 
            onChange={handleChange} 
            onBlur={(e) => handleBlur('businessName', e.target.value)}
            error={touched.businessName ? errors.businessName : ''} 
            isValid={isFieldValid('businessName')}
            placeholder={t.contact.businessNamePlac} 
            required 
          />
        </div>

        <div className="md:col-span-1">
          <CustomSelect
            label={t.contact.providerType}
            name="category"
            value={formData.category}
            options={Object.entries(t.contact.providerOptions).map(([key, label]) => ({ key, label }))}
            onChange={handleChange}
            onBlur={() => handleBlur('category', formData.category)}
            placeholder={t.contact.providerTypePlac}
            icon={Briefcase}
            lang={lang}
            error={errors.category}
            touched={touched.category}
            isValid={isFieldValid('category')}
          />
        </div>

        <div className="md:col-span-1">
          <CustomSelect
            label={t.contact.serviceArea}
            name="serviceArea"
            value={formData.serviceArea}
            options={provinces.map(p => ({ value: p, label: p }))}
            onChange={handleChange}
            onBlur={() => handleBlur('serviceArea', formData.serviceArea)}
            placeholder={t.contact.serviceAreaPlac}
            icon={MapPin}
            lang={lang}
            error={errors.serviceArea}
            touched={touched.serviceArea}
            isValid={isFieldValid('serviceArea')}
          />
        </div>

        <div className="md:col-span-1">
          <CustomSelect
            label={t.contact.district}
            name="district"
            value={formData.district}
            options={districts.map(d => ({ value: d, label: d }))}
            onChange={handleChange}
            onBlur={() => handleBlur('district', formData.district)}
            placeholder={t.contact.districtPlac}
            icon={MapIcon}
            disabled={!formData.serviceArea}
            lang={lang}
            error={errors.district}
            touched={touched.district}
            isValid={isFieldValid('district')}
          />
        </div>

        <div className="md:col-span-2 space-y-2.5">
          <label htmlFor="coverage-area-input" className={`block text-sm font-bold px-1 ${errors.coverageAreas && touched.coverageAreas ? 'text-rose-500' : 'text-[var(--text-muted)]'}`}>
            {t.contact.coverage} <span className="text-rose-500" aria-hidden="true">*</span>
          </label>
          <div className="relative h-[50px]">
            <input
              id="coverage-area-input"
              data-field="coverageAreas"
              type="text"
              value={coverageInput}
              onChange={(e) => setCoverageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCoverageArea()}
              placeholder={t.contact.coveragePlac}
              className="w-full h-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[12px] pr-4 pl-14 text-[var(--text-dark)] outline-none focus:border-[var(--primary)] transition-all placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40"
            />
            <button
              type="button"
              onClick={addCoverageArea}
              aria-label={lang === 'ar' ? 'إضافة منطقة التغطية' : 'Add coverage area'}
              className={`absolute ${lang === 'ar' ? 'left-1.5' : 'right-1.5'} top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center bg-[var(--primary-surface)] text-[var(--on-primary)] rounded-lg hover:bg-[var(--primary-surface-hover)] transition-all`}
            >
              <Plus size={20} aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.coverageAreas.map((area, index) => (
              <span key={index} className="flex items-center gap-2 px-4 py-2 bg-violet-600/10 dark:bg-[var(--primary-a20)] text-[var(--primary)] border border-violet-600/20 dark:border-[var(--primary-a30)] rounded-xl text-xs font-bold animate-in zoom-in">
                {area}
                <button
                  type="button"
                  onClick={() => removeCoverageArea(index)}
                  aria-label={`${lang === 'ar' ? 'إزالة' : 'Remove'} ${area}`}
                  className="grid h-6 w-6 place-items-center rounded-md hover:text-rose-500"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
           <div className="relative group overflow-hidden rounded-[20px] border border-black/10 dark:border-white/10 shadow-2xl h-[220px] lg:h-[240px]">
              {/* كانت خلفية هذه اللوحة صورة من Unsplash: طلب إلى نطاق خارجي
                  داخل نموذج التسجيل، يتعطّل مع الشبكة الضعيفة أو حجب النطاق
                  فتبقى اللوحة بلا خلفية. صارت تدرّجاً من رموز الموقع. */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(143,92,177,0.55) 0%, rgba(30,18,48,0.92) 60%, rgba(13,8,21,0.97) 100%)",
                }}
              ></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center space-y-3">
                 <div className={`p-3.5 rounded-full shadow-[0_0_50px_rgba(143,92,177,0.4)] transition-all duration-500 ${formData.location ? 'bg-emerald-500 text-white scale-110' : 'bg-[var(--primary-surface)] text-[var(--on-primary)] animate-bounce'}`}>
                    {formData.location ? <CheckCircle2 size={42} strokeWidth={2.5} /> : <MapPin size={42} strokeWidth={2.5} />}
                 </div>
                 <div className="space-y-1 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {formData.location ? t.contact.locationSuccess : t.contact.pinMap}
                    </h3>
                    <p className="text-white/70 text-[11px] sm:text-xs font-bold leading-relaxed">{t.contact.pinMapDesc}</p>
                 </div>
                 <button
                    type="button"
                    data-field="location"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className={`min-h-[44px] px-10 py-2.5 font-bold rounded-[12px] transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn ${formData.location ? 'bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40 text-emerald-400' : 'bg-white text-slate-950 hover:bg-violet-600 dark:hover:bg-[#a56dcc] hover:text-white'}`}
                 >
                    {isLocating ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div> : <Crosshair size={22} />}
                    <span className="text-sm">{isLocating ? t.common.loading : t.contact.openMaps}</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      {summaryError && (
        <div role="alert" className="rounded-[12px] border border-rose-500/20 bg-rose-500/10 p-4 text-center text-sm font-bold text-rose-500">
          {summaryError}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-3">
        <button
          type="button"
          onClick={handleNext}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-12 py-3.5 font-bold rounded-[12px] shadow-xl transition-all active:scale-[0.98]
          ${isFormValid() ? 'bg-[var(--primary-surface)] hover:bg-[var(--primary-surface-hover)] text-[var(--on-primary)] shadow-[var(--shadow-hover)]' : 'bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-muted)]'}`}
        >
          <span className="text-base">{t.common.next}</span>
          {lang === 'ar' ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
        <button 
          onClick={prevStep}
          className="order-2 px-10 py-3.5 bg-[var(--bg-section-alt)] hover:bg-[var(--input-bg)] border border-[var(--border-color)] text-[var(--text-muted)] font-bold rounded-[12px] transition-all text-base"
        >
          {t.common.prev}
        </button>
      </div>
    </div>
  );
};

export default StepContact;
