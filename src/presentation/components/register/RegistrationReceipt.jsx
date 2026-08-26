import React from 'react';
import logo from '@/assets/logo_carHero.webp';
import { services as serviceCatalog } from '@/presentation/content/services';

const colors = {
  primary: '#8f5cb1',
  primaryDark: '#5f3479',
  primarySoft: '#f5eef9',
  border: '#e6d8ef',
  text: '#251632',
  muted: '#796987',
  green: '#059669',
  rose: '#e11d48',
};

const Page = ({ children, footer, pageNumber }) => (
  <article
    data-pdf-page
    style={{
      width: 1080,
      height: 1527,
      boxSizing: 'border-box',
      padding: 42,
      background: '#f7f3fa',
      color: colors.text,
      fontFamily: "'IBM Plex Sans Arabic', 'Noto Sans Arabic', 'Tahoma', 'Arial', sans-serif",
      lineHeight: 1.55,
      overflow: 'hidden',
    }}
  >
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 26, background: '#fff', border: `1px solid ${colors.border}`, boxShadow: '0 24px 70px rgba(74, 40, 97, 0.1)' }}>
      {children}
      <footer style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: '16px 32px', background: colors.primarySoft, borderTop: `1px solid ${colors.border}`, color: colors.muted, fontSize: 10, fontWeight: 700 }}>
        <span>{footer}</span>
        <span>Car Hero</span>
        <span>{pageNumber}</span>
      </footer>
    </div>
  </article>
);

const Header = ({ title, subtitle, pending }) => (
  <header style={{ position: 'relative', padding: '32px 38px', background: 'linear-gradient(135deg, #ffffff 0%, #f4eaf9 100%)', borderBottom: `5px solid ${colors.primary}` }}>
    <div style={{ position: 'absolute', width: 230, height: 230, borderRadius: '50%', background: '#e7d5f1', opacity: 0.55, top: -150, left: -80 }} />
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 28 }}>
      <div>
        <div style={{ color: colors.primary, fontSize: 13, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6 }}>CAR HERO</div>
        <h1 style={{ margin: 0, color: colors.text, fontSize: 32, fontWeight: 700 }}>{title}</h1>
        <div style={{ marginTop: 8, color: colors.muted, fontSize: 13, fontWeight: 700 }}>{subtitle}</div>
        {pending && <span style={{ display: 'inline-block', marginTop: 12, padding: '7px 14px', borderRadius: 999, background: '#fff5dc', border: '1px solid #f4d98a', color: '#986c00', fontSize: 11, fontWeight: 700 }}>{pending}</span>}
      </div>
      <div style={{ width: 250, height: 125, borderRadius: 20, background: '#fff', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <img src={logo} alt="Car Hero" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    </div>
  </header>
);

const Section = ({ title, subtitle, children, compact = false }) => (
  <section style={{ marginTop: compact ? 20 : 28 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: compact ? 12 : 16 }}>
      <div style={{ width: 7, height: 32, borderRadius: 99, background: `linear-gradient(180deg, ${colors.primary}, ${colors.primaryDark})` }} />
      <div>
        <h2 style={{ margin: 0, color: colors.primaryDark, fontSize: 20, fontWeight: 700 }}>{title}</h2>
        {subtitle && <div style={{ color: colors.muted, fontSize: 10, fontWeight: 700, marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ flex: 1, height: 1, background: colors.border }} />
    </div>
    {children}
  </section>
);

const InfoCard = ({ label, value, wide = false, emphasis = false }) => (
  <div style={{ gridColumn: wide ? '1 / -1' : undefined, padding: emphasis ? '20px 22px' : '15px 17px', minHeight: emphasis ? 68 : 54, borderRadius: 16, border: `1px solid ${emphasis ? '#d9c1e8' : colors.border}`, background: emphasis ? 'linear-gradient(135deg, #ffffff 0%, #f8f1fb 100%)' : '#fff', boxShadow: emphasis ? '0 10px 24px rgba(95, 52, 121, 0.07)' : 'none' }}>
    <div style={{ color: colors.muted, fontSize: 11, fontWeight: 700, marginBottom: 5 }}>{label}</div>
    <div style={{ color: colors.text, fontSize: emphasis ? 18 : 15, fontWeight: 700, overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>{value || '-'}</div>
  </div>
);

const Tags = ({ items, emptyText }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {items.length ? items.map((item) => (
      <span key={item} style={{ padding: '7px 12px', borderRadius: 999, background: colors.primarySoft, border: `1px solid ${colors.border}`, color: colors.primaryDark, fontSize: 11, fontWeight: 700 }}>
        {item}
      </span>
    )) : <span style={{ color: colors.muted, fontWeight: 700 }}>{emptyText}</span>}
  </div>
);

const RegistrationReceipt = React.forwardRef(({ lang, t, formData }, ref) => {
  const isArabic = lang === 'ar';
  const text = {
    documentTitle: isArabic ? 'طلب تسجيل مزود خدمة' : 'Service Provider Registration',
    pending: isArabic ? 'قيد المراجعة' : 'Pending Review',
    account: isArabic ? 'بيانات مقدم الطلب' : 'Applicant Information',
    business: isArabic ? 'بيانات النشاط والموقع' : 'Business & Location',
    accountSubtitle: isArabic ? 'المعلومات الأساسية لمقدم طلب التسجيل' : 'Core applicant information',
    businessSubtitle: isArabic ? 'هوية النشاط وموقع تقديم الخدمات' : 'Business identity and service location',
    detailsTitle: isArabic ? 'تفاصيل الطلب والخدمات' : 'Application & Service Details',
    detailsSubtitle: isArabic ? 'الخدمات والتشغيل والمرافق' : 'Services, operations, and facilities',
    scheduleTitle: isArabic ? 'الدوام والمرفقات' : 'Schedule & Attachments',
    scheduleSubtitle: isArabic ? 'أوقات العمل والوثائق المرفقة' : 'Working hours and attached documents',
    coverage: isArabic ? 'نطاق التغطية' : 'Coverage Areas',
    services: isArabic ? 'الخدمات والأسعار' : 'Services & Prices',
    operations: isArabic ? 'تفاصيل التشغيل والمرافق' : 'Operations & Facilities',
    hours: isArabic ? 'أوقات الدوام' : 'Working Hours',
    attachments: isArabic ? 'المرفقات' : 'Attachments',
    name: isArabic ? 'اسم صاحب الطلب' : 'Applicant Name',
    phone: isArabic ? 'رقم الهاتف' : 'Phone Number',
    businessName: isArabic ? 'اسم المحل / النشاط' : 'Business Name',
    providerType: isArabic ? 'نوع مزود الخدمة' : 'Provider Type',
    province: isArabic ? 'المحافظة' : 'Province',
    district: isArabic ? 'المنطقة' : 'District',
    coordinates: isArabic ? 'الإحداثيات' : 'Coordinates',
    experience: isArabic ? 'سنوات الخبرة' : 'Experience Years',
    technicians: isArabic ? 'عدد الفنيين' : 'Technicians',
    emergency: isArabic ? 'خدمات الطوارئ 24/7' : '24/7 Emergency',
    facilities: isArabic ? 'المرافق المتاحة' : 'Facilities',
    bio: isArabic ? 'نبذة عن النشاط' : 'Business Description',
    noAttachments: isArabic ? 'لا توجد مرفقات' : 'No attachments',
    yes: isArabic ? 'نعم' : 'Yes',
    no: isArabic ? 'لا' : 'No',
    closed: isArabic ? 'مغلق' : 'Closed',
    year: isArabic ? 'سنة' : 'years',
    servicesCount: isArabic ? 'الخدمات المختارة' : 'Selected Services',
    coverageCount: isArabic ? 'مناطق التغطية' : 'Coverage Areas',
    photosCount: isArabic ? 'المرفقات' : 'Attachments',
    verified: isArabic ? 'الهاتف متحقق' : 'Phone Verified',
    generated: isArabic ? 'تم إنشاء هذا المستند إلكترونيًا بواسطة Car Hero' : 'Generated electronically by Car Hero',
  };

  const providerType = t.contact.providerOptions?.[formData.category] || formData.category;
  // أسماء الخدمات مصدرها كتالوج الموقع نفسه (`services.js`) لا `t.services` —
  // فترجمات التسجيل لا تحمل خريطة أسماء خدمات، وكان `t.services.mainServices`
  // غير معرّف فينهار الرسم عند فهرسته بمعرّف خدمة مثل `towing`.
  const serviceNameById = Object.fromEntries(
    serviceCatalog.map((service) => [service.id, (isArabic ? service.ar : service.en).title]),
  );
  const services = (formData.serviceType || []).map((serviceId) => ({ id: serviceId, name: serviceNameById[serviceId] || serviceId, price: formData.servicePrices?.[serviceId] }));
  const facilities = formData.facilities.map((facility) => t.services.facilities?.[facility] || facility);
  const attachments = formData.shopPhotos || [];
  const attachmentNames = attachments.map((photo) => photo.name || (isArabic ? 'ملف مرفق' : 'Attachment'));
  const generatedAt = new Intl.DateTimeFormat(isArabic ? 'ar-SY' : 'en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
  return (
    <div ref={ref} dir={isArabic ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Page footer={generatedAt} pageNumber="1 / 3">
        <Header title={text.documentTitle} subtitle={formData.businessName || 'Car Hero Provider'} pending={text.pending} />
        <main style={{ flex: 1, padding: '16px 38px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
          <Section title={text.account} subtitle={text.accountSubtitle}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <InfoCard label={text.name} value={formData.fullName} emphasis />
              <InfoCard label={text.phone} value={formData.phone} emphasis />
            </div>
          </Section>
          <Section title={text.business} subtitle={text.businessSubtitle}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <InfoCard label={text.businessName} value={formData.businessName} emphasis />
              <InfoCard label={text.providerType} value={providerType} emphasis />
              <InfoCard label={text.province} value={formData.serviceArea} />
              <InfoCard label={text.district} value={formData.district} />
              <InfoCard label={text.coordinates} value={formData.location} wide />
            </div>
          </Section>
        </main>
      </Page>
      <Page footer={text.generated} pageNumber="2 / 3">
        <Header title={text.detailsTitle} subtitle={text.detailsSubtitle} />
        <main style={{ flex: 1, padding: '18px 38px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', gap: 26 }}>
          <Section title={text.coverage}>
            <div style={{ padding: 15, borderRadius: 12, background: colors.primarySoft, border: `1px solid ${colors.border}` }}>
              <Tags items={formData.coverageAreas || []} emptyText="-" />
            </div>
          </Section>
          <Section title={text.services}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
              {services.map((service) => (
                <div key={service.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `1px solid ${colors.border}`, background: '#fff' }}>
                  <strong style={{ color: colors.text, fontSize: 13 }}>{service.name}</strong>
                  <span style={{ color: colors.primaryDark, fontSize: 12, fontWeight: 700 }}>{service.price ? `${Number(service.price).toLocaleString()} SYP` : '-'}</span>
                </div>
              ))}
            </div>
          </Section>
          <Section title={text.operations}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <InfoCard label={text.experience} value={`${formData.experienceYears || 0} ${text.year}`} />
              <InfoCard label={text.technicians} value={formData.techCount || 0} />
              <InfoCard label={text.emergency} value={formData.is_emergency ? text.yes : text.no} />
              <div style={{ padding: '15px 17px', borderRadius: 12, border: `1px solid ${colors.border}`, background: '#fff' }}>
                <div style={{ color: colors.muted, fontSize: 11, fontWeight: 700, marginBottom: 7 }}>{text.facilities}</div>
                <Tags items={facilities} emptyText="-" />
              </div>
              <InfoCard label={text.bio} value={formData.additionalInfo} wide />
            </div>
          </Section>
        </main>
      </Page>

      <Page footer={text.generated} pageNumber="3 / 3">
        <Header title={text.scheduleTitle} subtitle={text.scheduleSubtitle} />
        <main style={{ padding: '4px 38px 24px' }}>
          <Section title={text.hours} compact>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {Object.entries(formData.workingHours).map(([day, config]) => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 12, background: config.closed ? '#fff1f3' : '#effcf7', border: `1px solid ${config.closed ? '#fecdd3' : '#bbf7d0'}` }}>
                  <div style={{ color: colors.text, fontWeight: 700, fontSize: 13 }}>{t.hours.days[day] || day}</div>
                  <div style={{ color: config.closed ? colors.rose : colors.green, fontSize: 11, fontWeight: 700 }}>{config.closed ? text.closed : `${config.start} - ${config.end}`}</div>
                </div>
              ))}
            </div>
          </Section>
          <Section title={text.attachments} compact>
            <div style={{ padding: 15, borderRadius: 12, background: '#fbf9fc', border: `1px solid ${colors.border}` }}>
              <Tags items={attachmentNames} emptyText={text.noAttachments} />
              {attachments.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
                  {attachments.slice(0, 9).map((photo, index) => (
                    <div key={`${photo.name}-${index}`} style={{ overflow: 'hidden', height: 170, borderRadius: 12, border: `1px solid ${colors.border}`, background: '#fff' }}>
                      <img src={photo.previewUrl} alt={photo.name || 'Attachment'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        </main>
      </Page>
    </div>
  );
});

RegistrationReceipt.displayName = 'RegistrationReceipt';

export default RegistrationReceipt;
