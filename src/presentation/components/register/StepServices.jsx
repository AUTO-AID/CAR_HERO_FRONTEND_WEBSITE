import React, { useRef, useState } from 'react';
import FileUpload from '@/presentation/components/register/FileUpload';
import { 
  Wrench, Check, Zap, Truck, Settings, Layout, Wifi, Coffee, Package, 
  Droplet, Plus, Minus, Thermometer, Sparkles, Disc, 
  Battery, Construction, Coins, ArrowLeft, ArrowRight, X, Star, User
} from 'lucide-react';

const StepServices = ({ formData, updateFormData, nextStep, prevStep, lang, t }) => {
  const [summaryError, setSummaryError] = useState('');
  const rootRef = useRef(null);

  const mainServices = [
    { id: 'mechanical', name: t.services.mainServices.mechanical, icon: <Wrench size={24} /> },
    { id: 'electrical', name: t.services.mainServices.electrical, icon: <Zap size={24} /> },
    { id: 'towing', name: t.services.mainServices.towing, icon: <Truck size={24} /> },
    { id: 'fuel', name: t.services.mainServices.fuel, icon: <Droplet size={24} /> },
    { id: 'body', name: t.services.mainServices.body, icon: <Construction size={24} /> },
    { id: 'tires', name: t.services.mainServices.tires, icon: <Settings size={24} /> },
    { id: 'oil', name: t.services.mainServices.oil, icon: <Droplet size={24} /> },
    { id: 'ac', name: t.services.mainServices.ac, icon: <Thermometer size={24} /> },
    { id: 'detailing', name: t.services.mainServices.detailing, icon: <Sparkles size={24} /> },
    { id: 'brakes', name: t.services.mainServices.brakes, icon: <Disc size={24} /> },
    { id: 'battery', name: t.services.mainServices.battery, icon: <Battery size={24} /> },
    { id: 'suspension', name: t.services.mainServices.suspension, icon: <Layout size={24} /> },
  ];

  const facilities = [
    { id: 'wifi', name: t.services.facilities.wifi, icon: <Wifi size={20} /> },
    { id: 'waiting', name: t.services.facilities.waiting, icon: <Coffee size={20} /> },
    { id: 'parts', name: t.services.facilities.parts, icon: <Package size={20} /> },
  ];

  const toggleService = (id) => {
    const newServices = formData.serviceType.includes(id)
      ? formData.serviceType.filter(s => s !== id)
      : [...formData.serviceType, id];
    updateFormData({ serviceType: newServices });
  };

  const handlePriceChange = (id, price) => {
    const newPrices = { ...formData.servicePrices, [id]: price };
    updateFormData({ servicePrices: newPrices });
  };

  const toggleFacility = (id) => {
    const newFacilities = formData.facilities.includes(id)
      ? formData.facilities.filter(f => f !== id)
      : [...formData.facilities, id];
    updateFormData({ facilities: newFacilities });
  };

  const isValidPrice = (value) => {
    const price = Number(value);
    return Number.isFinite(price) && price > 0;
  };

  const isStepValid = formData.serviceType.length > 0
    && formData.serviceType.every((id) => isValidPrice(formData.servicePrices[id]));

  /**
   * كان الزرّ `disabled` حتى تُختار خدمة ويُدخَل سعرها الصحيح — بلا أي نصّ
   * يقول ذلك. المستخدم يرى زرّاً باهتاً ولا يعرف أهي الخدمة أم السعر.
   */
  const handleNext = () => {
    if (isStepValid) {
      setSummaryError('');
      nextStep();
      return;
    }

    const noService = formData.serviceType.length === 0;
    setSummaryError(
      noService
        ? t.errors.minServices
        : lang === 'ar'
          ? 'يرجى إدخال سعر صحيح لكل خدمة اخترتها.'
          : 'Enter a valid price for every service you selected.',
    );

    const target = noService
      ? rootRef.current?.querySelector('button[aria-pressed]')
      : rootRef.current?.querySelector('input[type="number"]');
    if (target) {
      target.focus();
      target.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  return (
    <div ref={rootRef} className="space-y-6 lg:space-y-7 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
        <div className="p-2.5 bg-[var(--primary)]/10 rounded-xl text-[var(--primary)]">
          <Settings size={26} />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-dark)] tracking-tight">{t.services.title}</h2>
      </div>

      {/* Emergency Toggle */}
      <button 
        onClick={() => updateFormData({ is_emergency: !formData.is_emergency })}
        className={`w-full flex items-center justify-between p-4 rounded-[16px] border-2 transition-all duration-500 group/emergency ${
          formData.is_emergency 
            ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_20px_40px_-10px_rgba(143,92,177,0.4)]' 
            : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary-a60)] hover:bg-[var(--bg-section-alt)]'
        }`}
      >
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${formData.is_emergency ? 'bg-white/20 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-[var(--bg-section-alt)] border border-[var(--border-color)] group-hover/emergency:scale-110 group-hover/emergency:border-[var(--primary-a60)]'}`}>
                <Zap size={24} className={`${formData.is_emergency ? 'animate-pulse text-white' : 'text-[var(--primary)] group-hover/emergency:text-[var(--primary)] dark:group-hover/emergency:text-[var(--primary-light)] transition-colors'}`} />
            </div>
            <span className="font-bold text-base lg:text-lg">{t.services.emergency}</span>
        </div>
        <div className={`w-14 h-8 rounded-full p-1 transition-colors ${formData.is_emergency ? 'bg-white/30' : 'bg-[var(--bg-section-alt)] border border-[var(--border-color)] group-hover/emergency:border-[var(--primary-a40)]'}`}>
          <div className={`w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${formData.is_emergency ? 'bg-white ' + (lang === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'bg-slate-400 dark:bg-[var(--primary-a60)]'}`}></div>
        </div>
      </button>

      {/* Services Grid with Prices */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        {mainServices.map((service) => {
          const isSelected = formData.serviceType.includes(service.id);
          return (
            <div key={service.id} className="group flex flex-col space-y-3">
              {/* كان `div` عليه onClick فقط: لا يستقبل التركيز ولا يستجيب
                  للوحة المفاتيح — واختيار خدمة واحدة شرط للمتابعة، أي أن
                  مستخدم لوحة المفاتيح كان محجوباً عن إكمال التسجيل أصلاً. */}
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleService(service.id)}
                className={`
                  relative flex w-full flex-col items-center justify-center p-4 lg:p-5 rounded-[16px] border-2 transition-all duration-300 cursor-pointer
                  hover:-translate-y-1.5 active:scale-95
                  ${isSelected 
                    ? 'bg-[var(--primary-a10)] border-[var(--primary)] shadow-xl ring-2 ring-[var(--primary-a30)] scale-[1.02]' 
                    : 'bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[var(--primary-a40)] hover:bg-[var(--bg-section-alt)] shadow-sm'}
                `}
              >
                <div className={`p-3 rounded-xl mb-2.5 transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)] scale-110 shadow-lg' 
                    : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--primary-a60)] group-hover:scale-110 group-hover:text-[var(--primary)] group-hover:border-[var(--primary-a30)]'
                }`}>
                  {service.icon}
                </div>
                <span className={`font-bold text-[11px] lg:text-xs uppercase transition-colors duration-300 text-center ${isSelected ? 'text-[var(--primary)] dark:text-[var(--primary-light)] drop-shadow-sm' : 'text-[var(--text-muted)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--primary-light)]'}`}>
                  {service.name}
                </span>
                {isSelected && <Check size={16} aria-hidden="true" className="absolute top-5 right-5 text-emerald-500 animate-in zoom-in" />}
              </button>

              {isSelected && (
                <div className="relative animate-in slide-in-from-top-2 duration-300">
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    aria-label={`${service.name} — ${lang === 'ar' ? 'السعر' : 'price'}`}
                    placeholder={t.services.pricePlac}
                    value={formData.servicePrices[service.id] || ''}
                    onChange={(e) => handlePriceChange(service.id, e.target.value)}
                    className={`w-full bg-[var(--input-bg)] border rounded-[12px] py-3 px-10 text-xs font-bold text-[var(--text-dark)] outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)] transition-all ${formData.servicePrices[service.id] && !isValidPrice(formData.servicePrices[service.id]) ? 'border-rose-500' : 'border-[var(--border-color)]'}`}
                  />
                  <Coins size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[var(--primary-light)]/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Facilities Selection */}
      <div className="space-y-3">
        <h3 className="text-[15px] font-bold text-[var(--text-dark)] opacity-90 uppercase px-1">{t.services.facilitiesTitle}</h3>
        <div className="flex flex-wrap gap-4">
          {facilities.map((f) => {
            const isSelected = formData.facilities.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFacility(f.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all duration-300 active:scale-95 group/fac ${
                  isSelected 
                    ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg scale-105' 
                    : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:bg-[var(--bg-section-alt)] hover:text-[var(--primary)]'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${isSelected ? 'bg-white/20 scale-110 rotate-6' : 'bg-[var(--card-bg)] border border-[var(--border-color)] group-hover/fac:border-[var(--primary-a30)]'} transition-transform duration-300`}>
                  {f.icon}
                </div>
                <span className={`text-[12px] font-bold uppercase ${isSelected ? 'text-white' : 'text-[var(--text-muted)] group-hover/fac:text-[var(--primary)] dark:group-hover/fac:text-[var(--primary-hover)]'}`}>
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience & Tech Count Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Counter 
          label={t.services.experience} 
          value={formData.experienceYears} 
          icon={<Star className="text-yellow-500" size={24} />}
          onIncrement={() => updateFormData({ experienceYears: formData.experienceYears + 1 })}
          onDecrement={() => updateFormData({ experienceYears: Math.max(0, formData.experienceYears - 1) })}
        />
        <Counter 
          label={t.services.techCount} 
          value={formData.techCount} 
          icon={<User className="text-blue-500" size={24} />}
          onIncrement={() => updateFormData({ techCount: formData.techCount + 1 })}
          onDecrement={() => updateFormData({ techCount: Math.max(0, formData.techCount - 1) })}
        />
      </div>

      {/* Bio / Additional Info */}
      <div className="space-y-2.5">
        <h3 id="bio-heading" className="text-[15px] font-bold text-[var(--text-dark)] opacity-90 px-1">{lang === 'ar' ? 'نبذة عن الورشة' : 'About the Workshop'}</h3>
        <textarea
          aria-labelledby="bio-heading"
          value={formData.additionalInfo}
          onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
          placeholder={t.services.bioPlac}
          className="w-full h-24 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[12px] p-4 text-sm font-medium text-[var(--text-dark)] placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)] transition-all resize-none"
        />
      </div>

      {/* File Upload Section */}
      <div className="space-y-3 pt-1">
        <h3 className="text-[15px] font-bold text-[var(--text-dark)] opacity-90 uppercase px-1">{lang === 'ar' ? 'الوثائق والصور' : 'Documents & Photos'}</h3>
        <FileUpload 
          t={t} 
          description={lang === 'ar' ? 'ارفع شعار الورشة، صور الواجهة، السجل التجاري أو أي وثائق مهنية أخرى' : 'Upload workshop logo, exterior photos, commercial record or any professional documents'} 
          onUpload={(files) => {
            const newPhotos = files.map(f => ({
              name: f.name,
              size: f.size,
              type: f.type,
              previewUrl: URL.createObjectURL(f),
            }));
            updateFormData({ shopPhotos: [...formData.shopPhotos, ...newPhotos] });
          }} 
          lang={lang} 
        />
        {formData.shopPhotos.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-2">
            {formData.shopPhotos.map((photo, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[var(--primary-a30)] group/img shadow-md animate-in zoom-in duration-300">
                <img src={photo.previewUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" alt={photo.name || 'upload'} />
                {/* كان بلا اسم وبلا type، ويظهر بالـhover فقط: التركيز بلوحة
                    المفاتيح كان يقع على زرّ شفّاف بلا اسم */}
                <button
                  type="button"
                  aria-label={`${lang === 'ar' ? 'حذف الصورة' : 'Remove photo'} ${photo.name || i + 1}`}
                  onClick={() => updateFormData({ shopPhotos: formData.shopPhotos.filter((_, idx) => idx !== i) })}
                  className="absolute inset-0 bg-rose-500/80 text-white opacity-0 transition-opacity flex items-center justify-center group-hover/img:opacity-100 focus-visible:opacity-100"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {summaryError && (
        <div role="alert" className="rounded-[12px] border border-rose-500/20 bg-rose-500/10 p-4 text-center text-sm font-bold text-rose-500">
          {summaryError}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={handleNext}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-12 py-3.5 font-bold rounded-[12px] shadow-2xl transition-all active:scale-[0.98]
          ${isStepValid ? 'bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-[var(--primary-a40)]' : 'bg-[var(--input-bg)] text-[var(--text-muted)]'}`}
        >
          <span className="relative z-10">{t.common.next}</span>
          {lang === 'ar' ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
        <button 
          onClick={prevStep}
          className="order-2 px-10 py-3.5 bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-[var(--text-muted)] font-bold rounded-[12px] transition-all hover:bg-[var(--bg-section-alt)] hover:text-[var(--text-dark)]"
        >
          {t.common.prev}
        </button>
      </div>
    </div>
  );
};

const Counter = ({ label, value, icon, onIncrement, onDecrement }) => (
    <div className="flex-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[16px] p-4 flex items-center justify-between shadow-sm group/counter hover:border-[var(--primary-a30)] transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-[var(--primary-a10)] p-3 rounded-xl transition-all duration-300 group-hover/counter:scale-110 group-hover/counter:bg-[var(--primary-a20)]">{icon}</div>
        <span className="text-[13px] font-bold uppercase text-[var(--text-muted)] group-hover/counter:text-[var(--primary)] dark:group-hover/counter:text-[var(--primary-hover)]">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onDecrement}
          className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:border-rose-500/50 hover:text-rose-500 transition-all active:scale-90"
        >
          <Minus size={18} />
        </button>
        <span className="text-2xl font-bold text-[var(--text-dark)] min-w-[30px] text-center">{value}</span>
        <button 
          onClick={onIncrement}
          className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:border-emerald-500/50 hover:text-emerald-500 transition-all active:scale-90"
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
);

export default StepServices;
