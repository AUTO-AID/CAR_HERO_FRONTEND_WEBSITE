import React, { useState } from 'react';
import { Clock, Loader2 } from 'lucide-react';
import { applyProvider } from '@/infrastructure/services/providers.service';
import { services as serviceCatalog } from '@/presentation/content/services';

const StepHours = ({ formData, updateFormData, nextStep, prevStep, lang, t }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * لم تعد هناك خريطة تُترجم معرّفات النموذج إلى فئات الخادم: `serviceType`
   * يحمل الآن `category` حرفياً (`towing`, `oil`, `car_wash`…) لأن الخطوة
   * السابقة تبني قائمتها من الكتالوج نفسه. ما بقي هو الاسم العربي المرافق،
   * ويُقرأ من الكتالوج أيضاً بدل نسخة ثالثة مكتوبة هنا.
   */
  const serviceMetaMap = Object.fromEntries(
    serviceCatalog.map((service) => [service.id, { name: service.ar.title, unit: 'خدمة' }]),
  );

  const canonicalDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const parseLocation = (location) => {
    if (!location) return null;
    const [lat, lng] = String(location).split(',').map((part) => Number(part.trim()));
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { latitude: lat, longitude: lng };
  };

  const normalizePhone = (phone) => {
    const trimmed = String(phone || '').trim();
    return trimmed.startsWith('09') ? `+963${trimmed.slice(1)}` : trimmed;
  };

  const validateWorkingHours = () => {
    return Object.values(formData.workingHours).every((conf) => {
      if (conf.closed) return true;
      return conf.start && conf.end && conf.start < conf.end;
    });
  };

  const buildServicesList = () => {
    return formData.serviceType.map((serviceId) => {
      const meta = serviceMetaMap[serviceId] || { name: serviceId, unit: 'خدمة' };
      const price = Number(formData.servicePrices[serviceId]);
      return {
        service_id: serviceId,
        name: meta.name,
        price,
        currency: 'SYP_NEW',
        unit: meta.unit,
      };
    });
  };

  const handleToggle = (day) => {
    const newHours = { ...formData.workingHours };
    newHours[day].closed = !newHours[day].closed;
    updateFormData({ workingHours: newHours });
  };

  const handleTimeChange = (day, field, value) => {
    const newHours = { ...formData.workingHours };
    newHours[day][field] = value;
    updateFormData({ workingHours: newHours });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Map frontend data to backend CreateProviderDto
      const workingHoursArray = Object.values(formData.workingHours).map((conf, index) => ({
        day: canonicalDays[index],
        open: conf.start,
        close: conf.end,
        isClosed: conf.closed
      }));
      const coords = parseLocation(formData.location);

      if (!coords) {
        throw new Error('Missing provider coordinates');
      }
      if (!validateWorkingHours()) {
        throw new Error('Invalid working hours');
      }

      const serviceCategories = Array.from(new Set(formData.serviceType));
      const servicesList = buildServicesList();

      if (!servicesList.length || servicesList.some((service) => !Number.isFinite(service.price) || service.price <= 0)) {
        throw new Error('Invalid service prices');
      }

      const payload = {
        phone: normalizePhone(formData.phone),
        businessName: formData.businessName,
        ownerName: formData.fullName,
        description: formData.additionalInfo || formData.category,
        category: formData.category,
        address: formData.district,
        city: formData.serviceArea,
        governorate: formData.serviceArea,
        coverageAreas: formData.coverageAreas,
        longitude: coords.longitude,
        latitude: coords.latitude,
        serviceCategories,
        services_list: servicesList,
        is_emergency: formData.is_emergency,
        facilities: formData.facilities,
        techCount: formData.techCount,
        shopPhotos: formData.shopPhotos.map(({ name, size, type, url }) => (url ? { name, size, type, url } : { name, size, type })),
        workingHours: workingHoursArray,
        experienceYears: formData.experienceYears,
      };

      if (formData.email?.trim()) {
        payload.email = formData.email.trim();
      }

      await applyProvider(payload);
      nextStep();
    } catch (err) {
      console.error(err);
      setError(lang === 'ar' ? 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى' : 'Failed to submit application, please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5 lg:space-y-6 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[var(--primary)]/10 rounded-2xl text-[var(--primary)] shadow-sm">
            <Clock size={26} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-dark)] uppercase tracking-tight">{t.hours.title}</h2>
        </div>
      </div>

      {error && (
        <div role="alert" className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-center font-bold">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2.5 lg:gap-3">
        {Object.entries(formData.workingHours).map(([day, config]) => (
          <div key={day} className={`flex flex-col sm:grid sm:grid-cols-[120px_minmax(0,1fr)_80px] sm:items-center p-3 lg:px-4 rounded-[12px] border transition-all duration-500 gap-3 ${
            config.closed 
                ? 'bg-[var(--input-bg)] border-[var(--border-color)] opacity-60' 
                : 'bg-[var(--card-bg)] border-[var(--border-color)] shadow-xl'
          }`}>
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${config.closed ? 'bg-rose-500 grayscale' : 'bg-emerald-500 dark:bg-[var(--primary)] shadow-[0_0_12px_rgba(16,185,129,0.3)] dark:shadow-[0_0_12px_var(--primary)] animate-pulse'}`}></div>
                <span className={`font-bold text-sm uppercase tracking-tight ${config.closed ? 'text-[var(--text-muted)]' : 'text-[var(--text-dark)]'}`}>{t.hours.days[day] || day}</span>
              </div>
            </div>
            
            <div className={`flex items-center justify-center gap-2.5 lg:gap-4 transition-all duration-500 ${config.closed ? 'grayscale pointer-events-none opacity-20' : ''}`}>
              <div className="relative flex-1 max-w-[150px]">
                {/* أربع عشرة خانة وقت كانت بلا اسم: قارئ الشاشة يعلن «الوقت»
                    أربع عشرة مرّة بلا ذكر اليوم ولا إن كانت فتحاً أم إغلاقاً */}
                <input
                  type="time"
                  aria-label={`${t.hours.days[day] || day} — ${lang === 'ar' ? 'وقت الفتح' : 'opening time'}`}
                  disabled={config.closed}
                  value={config.start}
                  onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                  className="h-11 w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-2.5 text-xs font-bold text-[var(--text-dark)] outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)] transition-colors"
                />
              </div>
              <span className="text-[var(--text-muted)] text-xs font-bold uppercase">{t.hours.to}</span>
              <div className="relative flex-1 max-w-[150px]">
                <input
                  type="time"
                  aria-label={`${t.hours.days[day] || day} — ${lang === 'ar' ? 'وقت الإغلاق' : 'closing time'}`}
                  disabled={config.closed}
                  value={config.end}
                  onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                  className="h-11 w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-lg px-2.5 text-xs font-bold text-[var(--text-dark)] outline-none focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)] transition-colors"
                />
              </div>
            </div>

            {/* الزرّ يبدّل حالة اليوم، فحالته المضغوطة جزء من معناه */}
            <button
              type="button"
              aria-pressed={config.closed}
              onClick={() => handleToggle(day)}
              className={`min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-lg text-[11px] font-bold transition-all border duration-300 ${config.closed ? 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border-color)]' : 'bg-rose-500/5 text-rose-500 dark:text-rose-400 border-rose-500/10'}`}
            >
              {config.closed ? t.hours.closed : t.hours.disable}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`order-1 flex-1 group relative inline-flex items-center justify-center gap-3 px-12 py-3.5 bg-[var(--primary-surface)] hover:bg-[var(--primary-surface-hover)] text-[var(--on-primary)] font-bold rounded-[12px] shadow-2xl shadow-[var(--shadow-hover)] transition-all active:scale-[0.98] ${isSubmitting ? 'opacity-70 pointer-events-none' : ''}`}
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <>
              <span>{t.common.send}</span>
              <span className="transition-transform group-hover:rotate-12 group-hover:scale-125">✓</span>
            </>
          )}
        </button>
        <button 
          onClick={prevStep}
          className="order-2 px-10 py-3.5 text-[var(--text-muted)] hover:text-[var(--primary)] font-bold transition-all text-center border-2 border-[var(--border-color)] rounded-[12px] hover:bg-[var(--bg-section-alt)] uppercase tracking-widest text-[10px]"
        >
          {t.common.prev}
        </button>
      </div>
    </div>
  );
};

export default StepHours;
