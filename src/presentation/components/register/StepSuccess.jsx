import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Download, Loader2, Award, ShieldCheck, Briefcase } from 'lucide-react';

const StepSuccess = ({ lang, t, formData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const timestamp = new Date().toLocaleString(lang === 'ar' ? 'ar-SY' : 'en-US');
    const fileName = `CarHero_Registration_${formData.businessName.replace(/\s+/g, '_')}.html`;

    const providerType = t.contact.categoryOptions?.[formData.category] || formData.category;
    const servicesList = formData.serviceType.map(s => t.services.mainServices[s] || s);
    const photosCount = formData.shopPhotos?.length || 0;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>Car Hero - Request Summary</title>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          :root { --primary: #8f5cb1; --secondary: #d1b3ff; --accent: #10b981; --bg: #f8fafc; --card: #ffffff; --text: #0f172a; --muted: #64748b; }
          body { font-family: 'IBM Plex Sans Arabic', sans-serif; background: var(--bg); color: var(--text); padding: 50px; margin: 0; line-height: 1.6; }
          .receipt-container { max-width: 850px; margin: 0 auto; background: var(--card); border-radius: 40px; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1); overflow: hidden; border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 60px 50px; color: white; display: flex; justify-content: space-between; align-items: center; }
          .logo-area { font-size: 38px; font-weight: 800; letter-spacing: -1.5px; }
          .status-badge { background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 10px 24px; border-radius: 15px; font-size: 14px; font-weight: 700; border: 1px solid rgba(255,255,255,0.3); }
          
          .content { padding: 50px; }
          .section { margin-bottom: 45px; }
          .section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; }
          .section-title { font-size: 18px; font-weight: 800; color: var(--primary); text-transform: uppercase; }
          
          .grid-row { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; margin-bottom: 20px; }
          .info-block { background: #fdfdff; border: 1px solid #f1f5f9; padding: 20px; border-radius: 20px; }
          .label { font-size: 11px; font-weight: 700; color: var(--muted); text-transform: uppercase; margin-bottom: 5px; display: block; }
          .value { font-size: 16px; font-weight: 700; color: var(--text); }
          
          .tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
          .tag { background: #f1f5f9; color: var(--text); padding: 6px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; border: 1px solid #e2e8f0; }
          .tag.primary { background: var(--primary); color: white; border: none; }
          
          .schedule-grid { display: grid; grid-template-cols: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
          .schedule-item { border: 1px solid #eee; padding: 12px; border-radius: 15px; text-align: center; background: white; }
          .schedule-item.closed { background: #fff1f2; border-color: #fecaca; }

          .footer { background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: var(--muted); }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="header">
            <div class="logo-area">Car <span>Hero</span></div>
            <div class="status-badge">REGISTRATION PENDING / قيد المراجعة</div>
          </div>

          <div class="content">
            <div class="section">
              <div class="section-header"><div class="section-title">Account / بيانات الحساب</div></div>
              <div class="grid-row">
                <div class="info-block"><span class="label">Name / الاسم</span><div class="value">${formData.fullName}</div></div>
                <div class="info-block"><span class="label">Phone / الهاتف</span><div class="value">${formData.phone}</div></div>
              </div>
            </div>

            <div class="section">
              <div class="section-header"><div class="section-title">Business / بيانات النشاط</div></div>
              <div class="grid-row">
                <div class="info-block"><span class="label">Shop Name / اسم المحل</span><div class="value">${formData.businessName}</div></div>
                <div class="info-block"><span class="label">Type / النوع</span><div class="value">${providerType}</div></div>
              </div>
              <div class="grid-row">
                <div class="info-block"><span class="label">Location / الموقع</span><div class="value">${formData.serviceArea} - ${formData.district}</div></div>
                <div class="info-block"><span class="label">GPS / الإحداثيات</span><div class="value">${formData.location}</div></div>
              </div>
            </div>

            <div class="section">
              <div class="section-header"><div class="section-title">Services & Attachments / الخدمات والمرفقات</div></div>
              <div class="info-block">
                 <span class="label">Services / الخدمات</span>
                 <div class="tag-cloud">${servicesList.map(s => `<span class="tag primary">${s}</span>`).join('')}</div>
              </div>
              <div class="grid-row" style="margin-top: 20px;">
                <div class="info-block">
                  <span class="label">Experience / الخبرة</span>
                  <div class="value">${formData.experienceYears} Years</div>
                </div>
                <div class="info-block">
                  <span class="label">Attached Photos / الصور المرفقة</span>
                  <div class="value" style="color: var(--primary)">${photosCount} Photos / صور</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-header"><div class="section-title">Working Hours / أوقات الدوام</div></div>
              <div class="schedule-grid">
                ${Object.entries(formData.workingHours).map(([day, conf]) => `
                  <div class="schedule-item ${conf.closed ? 'closed' : ''}">
                    <div style="font-weight: 800;">${t.hours.days[day] || day}</div>
                    <div style="font-size: 11px;">${conf.closed ? 'CLOSED' : `${conf.start} - ${conf.end}`}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="footer">
            Car Hero Syria &copy; 2025 • High Standards for Auto Services
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-in zoom-in-95 fade-in duration-1000">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-[#8f5cb1]/20 dark:bg-[#8f5cb1]/20 blur-[100px] rounded-full animate-pulse"></div>
        <div className="relative z-10 w-40 h-40 bg-[#8f5cb1] text-white rounded-[3rem] flex items-center justify-center shadow-[0_25px_60px_rgba(143,92,177,0.4)] rotate-3 animate-bounce-slow">
          <CheckCircle size={80} strokeWidth={2.5} />
        </div>
        <div className="absolute -bottom-6 -right-6 glass p-4 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-4">
            <ShieldCheck className="text-[#d1b3ff]" size={32} />
        </div>
      </div>

      <div className="space-y-10 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl font-bold text-[#8f5cb1] dark:text-white tracking-tight leading-tight">
            {t.success.title}
          </h2>
          <div className="flex items-center justify-center gap-2">
             <div className="h-1.5 w-12 bg-[#8f5cb1] rounded-full"></div>
             <div className="h-1.5 w-1.5 bg-[#8f5cb1]/40 rounded-full"></div>
             <div className="h-1.5 w-1.5 bg-[#8f5cb1]/40 rounded-full"></div>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-white/90 text-lg sm:text-xl leading-relaxed font-medium px-4">
          {t.success.message}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="p-8 rounded-[2.5rem] glass text-right rtl:text-right ltr:text-left flex flex-col gap-4 hover:border-[#8f5cb1]/40 transition-all shadow-xl group cursor-default">
             <div className="w-14 h-14 bg-[#8f5cb1]/20 rounded-2xl flex items-center justify-center text-[#d1b3ff] group-hover:scale-110 group-hover:rotate-6 transition-all">
                <Award size={32} />
             </div>
             <div>
                <h4 className="font-bold text-[var(--text-dark)] text-xl leading-none mb-2">{t.success.nextTitle}</h4>
                <p className="text-sm text-[var(--text-muted)] font-bold leading-relaxed">{t.success.nextDesc}</p>
             </div>
          </div>

          <div className="p-8 rounded-[2.5rem] glass text-right rtl:text-right ltr:text-left flex flex-col gap-4 hover:border-[#8f5cb1]/40 transition-all shadow-xl group cursor-default">
             <div className="w-14 h-14 bg-[#8f5cb1]/20 rounded-2xl flex items-center justify-center text-[#d1b3ff] group-hover:scale-110 group-hover:-rotate-6 transition-all">
                <Briefcase size={32} />
             </div>
             <div>
                <h4 className="font-bold text-[var(--text-dark)] text-xl leading-none mb-2">{t.success.visionTitle}</h4>
                <p className="text-sm text-[var(--text-muted)] font-bold leading-relaxed">{t.success.visionDesc}</p>
             </div>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="group relative px-14 py-5 bg-gradient-to-r from-[#8f5cb1] to-[#6d3a91] text-white font-bold rounded-[2rem] shadow-[0_20px_40px_rgba(143,92,177,0.3)] hover:shadow-[#8f5cb1]/50 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 overflow-hidden"
          >
            <span className="relative z-10">{t.success.backBtn}</span>
            {lang === 'ar' ? (
              <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            ) : (
              <ArrowLeft size={22} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
              relative px-14 py-5 glass hover:bg-[#8f5cb1]/10 text-[#8f5cb1] dark:text-white font-bold rounded-[2rem] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 shadow-xl group border border-[#8f5cb1]/30
              ${isDownloading ? 'opacity-70 cursor-wait' : ''}
            `}
          >
            {isDownloading ? (
              <Loader2 size={24} className="animate-spin text-[#d1b3ff]" />
            ) : (
              <Download size={24} className="text-[#d1b3ff] group-hover:-translate-y-1 transition-transform" />
            )}
            <span>{isDownloading ? t.common.loading : t.success.downloadBtn}</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0) rotate(3deg); } 50% { transform: translateY(-15px) rotate(0deg); } }
      `}</style>
    </div>
  );
};

export default StepSuccess;
