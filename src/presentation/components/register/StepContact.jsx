import React, { useState } from 'react';
import Input from '@/presentation/components/register/Input';
import CustomSelect from '@/presentation/components/register/CustomSelect';
import { MapPin, ChevronDown, Plus, X, Briefcase, Store, CheckCircle2, Crosshair, Map as MapIcon, ArrowLeft, ArrowRight } from 'lucide-react';

const StepContact = ({ formData, updateFormData, nextStep, prevStep, lang, t }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [coverageInput, setCoverageInput] = useState('');
  const [isLocating, setIsLocating] = useState(false);

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

  const isFormValid = () => {
    return (
      isFieldValid('businessName') &&
      isFieldValid('category') &&
      isFieldValid('serviceArea') &&
      isFieldValid('district') &&
      isFieldValid('location') &&
      isFieldValid('coverageAreas')
    );
  };

  return (
    <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-primary">
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        <div className="p-2.5 bg-violet-600/10 dark:bg-[#8f5cb1]/10 rounded-xl text-violet-600 dark:text-[#8f5cb1]">
          <Store size={28} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-violet-700 dark:!text-white uppercase tracking-tight">{t.contact.title}</h2>
          <p className="text-slate-500 dark:text-[#c9a7e3] text-[11px] sm:text-xs font-bold uppercase tracking-wider">{t.contact.subtitle}</p>
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
          <label className={`block text-sm font-bold uppercase px-1 ${errors.coverageAreas && touched.coverageAreas ? 'text-rose-500' : 'text-slate-500 dark:text-[#c9a7e3]'}`}>
            {t.contact.coverage} <span className="text-rose-500">*</span>
          </label>
          <div className="relative h-[50px]">
            <input
              type="text"
              value={coverageInput}
              onChange={(e) => setCoverageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCoverageArea()}
              placeholder={t.contact.coveragePlac}
              className="w-full h-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[12px] pr-4 pl-14 text-[var(--text-dark)] outline-none focus:border-[#8f5cb1] transition-all placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40"
            />
            <button 
              type="button" onClick={addCoverageArea}
              className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 p-2 bg-violet-600 dark:bg-[#8f5cb1] text-white rounded-lg hover:bg-violet-700 dark:hover:bg-[#a56dcc] transition-all`}
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.coverageAreas.map((area, index) => (
              <span key={index} className="flex items-center gap-2 px-4 py-2 bg-violet-600/10 dark:bg-[#8f5cb1]/20 text-violet-600 dark:text-[#d1b3ff] border border-violet-600/20 dark:border-[#8f5cb1]/30 rounded-xl text-xs font-black animate-in zoom-in">
                {area}
                <button onClick={() => removeCoverageArea(index)} className="hover:text-rose-500"><X size={14} /></button>
              </span>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
           <div className="relative group overflow-hidden rounded-[20px] border border-black/10 dark:border-white/10 shadow-2xl h-[220px] lg:h-[240px]">
              <div className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200")'}}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 dark:from-[#1a0f2e]/90 via-slate-900/40 to-transparent"></div>
              </div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center space-y-3">
                 <div className={`p-3.5 rounded-full shadow-[0_0_50px_rgba(143,92,177,0.4)] transition-all duration-500 ${formData.location ? 'bg-emerald-500 text-white scale-110' : 'bg-violet-600 dark:bg-[#8f5cb1] text-white animate-bounce'}`}>
                    {formData.location ? <CheckCircle2 size={42} strokeWidth={2.5} /> : <MapPin size={42} strokeWidth={2.5} />}
                 </div>
                 <div className="space-y-1 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {formData.location ? t.contact.locationSuccess : t.contact.pinMap}
                    </h3>
                    <p className="text-white/70 text-[11px] sm:text-xs font-bold leading-relaxed">{t.contact.pinMapDesc}</p>
                 </div>
                 <button 
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isLocating}
                    className={`px-10 py-2.5 font-black rounded-[12px] transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn ${formData.location ? 'bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/40 text-emerald-400' : 'bg-white text-slate-950 hover:bg-violet-600 dark:hover:bg-[#a56dcc] hover:text-white'}`}
                 >
                    {isLocating ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div> : <Crosshair size={22} />}
                    <span className="text-sm">{isLocating ? t.common.loading : t.contact.openMaps}</span>
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-3">
        <button 
          onClick={nextStep}
          disabled={!isFormValid()}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-12 py-3.5 font-black rounded-[12px] shadow-xl transition-all active:scale-[0.98]
          ${isFormValid() ? 'bg-violet-600 dark:bg-[#8f5cb1] hover:bg-violet-700 dark:hover:bg-[#a56dcc] text-white shadow-violet-600/30 dark:shadow-[#8f5cb1]/30' : 'bg-slate-200 dark:bg-[#1a1425] text-slate-400 dark:text-[#c9a7e3]/30 cursor-not-allowed opacity-60'}`}
        >
          <span className="text-base">{t.common.next}</span>
          {lang === 'ar' ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
        <button 
          onClick={prevStep}
          className="order-2 px-10 py-3.5 bg-slate-200/50 dark:bg-[#1a1425] hover:bg-slate-200 dark:hover:bg-[#251b36] border border-slate-200 dark:border-[#8f5cb1]/10 text-slate-600 dark:text-white/40 font-black rounded-[12px] transition-all text-base"
        >
          {t.common.prev}
        </button>
      </div>
    </div>
  );
};

export default StepContact;
