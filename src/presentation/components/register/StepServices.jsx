import React, { useState } from 'react';
import FileUpload from '@/presentation/components/register/FileUpload';
import { 
  Wrench, Check, Zap, Truck, Settings, Layout, Wifi, Coffee, Package, 
  Droplet, Plus, Minus, Thermometer, Sparkles, Disc, 
  Battery, Construction, Coins, ArrowLeft, ArrowRight, X, Star, User
} from 'lucide-react';

const StepServices = ({ formData, updateFormData, nextStep, prevStep, lang, t }) => {
  const [showError, setShowError] = useState(false);

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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
        <div className="p-3 bg-violet-600/10 dark:bg-[#8f5cb1]/10 rounded-2xl text-violet-600 dark:text-[#8f5cb1]">
          <Settings size={26} />
        </div>
        <h2 className="text-2xl font-black text-violet-700 dark:!text-white tracking-tight">{t.services.title}</h2>
      </div>

      {/* Emergency Toggle */}
      <button 
        onClick={() => updateFormData({ is_emergency: !formData.is_emergency })}
        className={`w-full flex items-center justify-between p-7 rounded-[24px] border-2 transition-all duration-500 group/emergency ${
          formData.is_emergency 
            ? 'bg-[#8f5cb1] border-[#8f5cb1] text-white shadow-[0_20px_40px_-10px_rgba(143,92,177,0.4)]' 
            : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#8f5cb1]/60 hover:bg-[var(--bg-section-alt)]'
        }`}
      >
        <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${formData.is_emergency ? 'bg-white/20 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-[var(--bg-section-alt)] border border-[var(--border-color)] group-hover/emergency:scale-110 group-hover/emergency:border-[#8f5cb1]/60'}`}>
                <Zap size={24} className={`${formData.is_emergency ? 'animate-pulse text-white' : 'text-[#8f5cb1] dark:text-[#a57ed8] group-hover/emergency:text-[#8f5cb1] dark:group-hover/emergency:text-[#d1b3ff] transition-colors'}`} />
            </div>
            <span className="font-black text-xl">{t.services.emergency}</span>
        </div>
        <div className={`w-14 h-8 rounded-full p-1 transition-colors ${formData.is_emergency ? 'bg-white/30' : 'bg-[var(--bg-section-alt)] border border-[var(--border-color)] group-hover/emergency:border-[#8f5cb1]/40'}`}>
          <div className={`w-6 h-6 rounded-full shadow-sm transition-all duration-300 ${formData.is_emergency ? 'bg-white ' + (lang === 'ar' ? '-translate-x-6' : 'translate-x-6') : 'bg-slate-400 dark:bg-[#8f5cb1]/60'}`}></div>
        </div>
      </button>

      {/* Services Grid with Prices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainServices.map((service) => {
          const isSelected = formData.serviceType.includes(service.id);
          return (
            <div key={service.id} className="group flex flex-col space-y-3">
              <div
                onClick={() => toggleService(service.id)}
                className={`
                  relative flex flex-col items-center justify-center p-8 rounded-[24px] border-2 transition-all duration-300 cursor-pointer
                  hover:-translate-y-1.5 active:scale-95
                  ${isSelected 
                    ? 'bg-[#8f5cb1]/10 border-[#8f5cb1] shadow-xl ring-2 ring-[#8f5cb1]/30 scale-[1.02]' 
                    : 'bg-[var(--card-bg)] border-[var(--border-color)] hover:border-[#8f5cb1]/40 hover:bg-[var(--bg-section-alt)] shadow-sm'}
                `}
              >
                <div className={`p-5 rounded-2xl mb-4 transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-[#8f5cb1] text-white border-[#8f5cb1] scale-110 shadow-lg' 
                    : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[#8f5cb1]/60 group-hover:scale-110 group-hover:text-[#8f5cb1] group-hover:border-[#8f5cb1]/30'
                }`}>
                  {service.icon}
                </div>
                <span className={`font-bold text-[14px] uppercase transition-colors duration-300 text-center ${isSelected ? 'text-[#8f5cb1] dark:text-[#d1b3ff] drop-shadow-sm' : 'text-[var(--text-muted)] group-hover:text-[#8f5cb1] dark:group-hover:text-[#d1b3ff]'}`}>
                  {service.name}
                </span>
                {isSelected && <Check size={16} className="absolute top-5 right-5 text-emerald-500 animate-in zoom-in" />}
              </div>
              
              {isSelected && (
                <div className="relative animate-in slide-in-from-top-2 duration-300">
                  <input 
                    type="number" 
                    min="1"
                    inputMode="numeric"
                    placeholder={t.services.pricePlac}
                    value={formData.servicePrices[service.id] || ''}
                    onChange={(e) => handlePriceChange(service.id, e.target.value)}
                    className={`w-full bg-[var(--input-bg)] border rounded-[12px] py-3 px-10 text-xs font-bold text-[var(--text-dark)] outline-none focus:border-[#8f5cb1] focus:ring-4 focus:ring-[#8f5cb1]/10 transition-all ${formData.servicePrices[service.id] && !isValidPrice(formData.servicePrices[service.id]) ? 'border-rose-500' : 'border-[var(--border-color)]'}`}
                  />
                  <Coins size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#d1b3ff]/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Facilities Selection */}
      <div className="space-y-6">
        <h3 className="text-[15px] font-bold text-[var(--text-dark)] opacity-90 uppercase px-1">{t.services.facilitiesTitle}</h3>
        <div className="flex flex-wrap gap-4">
          {facilities.map((f) => {
            const isSelected = formData.facilities.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => toggleFacility(f.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 active:scale-95 group/fac ${
                  isSelected 
                    ? 'bg-[#8f5cb1] border-[#8f5cb1] text-white shadow-lg scale-105' 
                    : 'bg-[var(--input-bg)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#8f5cb1] hover:bg-[var(--bg-section-alt)] hover:text-[#8f5cb1]'
                }`}
              >
                <div className={`p-2 rounded-lg transition-all duration-300 ${isSelected ? 'bg-white/20 scale-110 rotate-6' : 'bg-[var(--card-bg)] border border-[var(--border-color)] group-hover/fac:border-[#8f5cb1]/30'} transition-transform duration-300`}>
                  {f.icon}
                </div>
                <span className={`text-[12px] font-bold uppercase ${isSelected ? 'text-white' : 'text-[var(--text-muted)] group-hover/fac:text-[#8f5cb1] dark:group-hover/fac:text-[#a57ed8]'}`}>
                  {f.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Experience & Tech Count Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      <div className="space-y-4">
        <h3 className="text-[15px] font-bold text-[var(--text-dark)] opacity-90 uppercase px-1">{lang === 'ar' ? 'نبذة عن الورشة' : 'About the Workshop'}</h3>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
          placeholder={t.services.bioPlac}
          className="w-full h-32 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[12px] p-5 text-sm font-medium text-[var(--text-dark)] placeholder:text-slate-400 dark:placeholder:text-white/20 outline-none focus:border-[#8f5cb1] focus:ring-4 focus:ring-[#8f5cb1]/10 transition-all resize-none"
        />
      </div>

      {/* File Upload Section */}
      <div className="space-y-6 pt-4">
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
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border-2 border-[#8f5cb1]/30 group/img shadow-md animate-in zoom-in duration-300">
                <img src={photo.previewUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" alt={photo.name || 'upload'} />
                <button 
                  onClick={() => updateFormData({ shopPhotos: formData.shopPhotos.filter((_, idx) => idx !== i) })}
                  className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <X size={24} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 pt-10">
        <button 
          onClick={nextStep}
          disabled={!isStepValid}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-14 py-5 font-black rounded-[12px] shadow-2xl transition-all active:scale-[0.98]
          ${isStepValid ? 'bg-[#8f5cb1] hover:bg-[#a57ed8] text-white shadow-[#8f5cb1]/40' : 'bg-[var(--input-bg)] text-[var(--text-muted)] opacity-40 cursor-not-allowed'}`}
        >
          <span className="relative z-10">{t.common.next}</span>
          {lang === 'ar' ? <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
        </button>
        <button 
          onClick={prevStep}
          className="order-2 px-10 py-5 bg-[var(--input-bg)] border-2 border-[var(--border-color)] text-[var(--text-muted)] font-black rounded-[12px] transition-all hover:bg-[var(--bg-section-alt)] hover:text-[var(--text-dark)]"
        >
          {t.common.prev}
        </button>
      </div>
    </div>
  );
};

const Counter = ({ label, value, icon, onIncrement, onDecrement }) => (
    <div className="flex-1 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-[24px] p-6 flex items-center justify-between shadow-sm group/counter hover:border-[#8f5cb1]/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="bg-[#8f5cb1]/10 p-3 rounded-xl transition-all duration-300 group-hover/counter:scale-110 group-hover/counter:bg-[#8f5cb1]/20">{icon}</div>
        <span className="text-[13px] font-bold uppercase text-[var(--text-muted)] group-hover/counter:text-[#8f5cb1] dark:group-hover/counter:text-[#a57ed8]">{label}</span>
      </div>
      <div className="flex items-center gap-5">
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
