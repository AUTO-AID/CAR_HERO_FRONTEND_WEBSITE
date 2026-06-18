import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { LoginIcon, DollarSignIcon, CalendarIcon } from '@/presentation/components/ui/icons';
import { motion as Motion } from 'framer-motion';

const ContactSection = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    const faqData = t("contact_faq", { returnObjects: true });
    const partnerCards = t("partner_cards", { returnObjects: true });

    const toggleQuestion = (index) => {
        setActiveQuestion((prev) => (prev === index ? null : index));
    };

    const cardIcons = [<LoginIcon />, <DollarSignIcon />, <CalendarIcon />];

    return (
        <section id="contact" className="section">
            <div className="app-container">
                {/* Section Header */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">{t("contact1.title")}</h2>
                    <p className="section-subtitle"><b>{t("contact1.subtitle")}</b></p>
                </Motion.div>

                <div className="contact-grid">
                    {/* FAQ */}
                    <Motion.div
                        className="faq"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3>{t("contact1.faq_title")}</h3>

                        {Array.isArray(faqData) && faqData.map((item, index) => (
                            <Motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <div
                                    className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
                                    onClick={() => toggleQuestion(index)}
                                >
                                    <div className="faq-row">
                                        <div className="faq-question">{item.q}</div>
                                        <div className="faq-toggle">+</div>
                                    </div>
                                    <div className="faq-answer-wrapper">
                                        <p className="faq-answer">{item.a}</p>
                                    </div>
                                </div>
                            </Motion.div>
                        ))}
                    </Motion.div>

                    {/* Contact Form */}
                    <Motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>{t("contact1.send_message")}</h3>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder={t("contact1.full_name")} 
                                required 
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                disabled={isSubmitting || isSuccess}
                                className="input-enhanced"
                            />
                            <input 
                                type="email" 
                                placeholder={t("contact1.email")} 
                                required 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                disabled={isSubmitting || isSuccess}
                                className="input-enhanced"
                            />
                            <textarea 
                                placeholder={t("contact1.message")} 
                                rows={4} 
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                disabled={isSubmitting || isSuccess}
                                className="input-enhanced"
                            ></textarea>
                            <button type="submit" disabled={isSubmitting || isSuccess} className={`form-submit-btn ${!isSubmitting && !isSuccess ? 'pulse' : ''}`} style={{ backgroundColor: isSuccess ? '#10b981' : '' }}>
                                {isSubmitting ? t("common.loading", "جاري الإرسال...") : isSuccess ? t("common.success", "تم الإرسال بنجاح ✓") : t("contact1.submit_btn")}
                            </button>
                        </form>
                    </Motion.div>
                </div>

                {/* Partner Section */}
                <div className="partner-section" id="partner-section">
                    <Motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="section-title">{t("contact1.partner_title")}</h2>
                    </Motion.div>

                    <div className="partner-cards">
                        {Array.isArray(partnerCards) && partnerCards.map((card, index) => (
                            <Motion.div
                                key={index}
                                className="partner-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className="card-icon">
                                    {cardIcons[index]}
                                </div>
                                <h4 className="partner-card-title">{card.title}</h4>
                                <p>{card.desc}</p>
                            </Motion.div>
                        ))}
                    </div>

                    <Motion.div
                        className="partner-cta-panel"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="partner-cta-copy">
                            <span className="partner-cta-eyebrow">
                                {isArabic ? "انضم كمزوّد خدمة معتمد" : "Join as a verified service provider"}
                            </span>
                            <h3>
                                {isArabic
                                    ? "هل تدير ورشة أو مركزًا لخدمات السيارات؟"
                                    : "Do you run a workshop or automotive service center?"}
                            </h3>
                            <p>
                                {isArabic
                                    ? "سجّل نشاطك كمزوّد خدمة في Car Hero، واعرض خدماتك للعملاء القريبين منك واستقبل طلبات جديدة. املأ نموذج التسجيل، وسيراجع فريقنا بياناتك للتواصل معك واستكمال الاعتماد."
                                    : "Register your business as a Car Hero service provider, showcase your services to nearby customers, and receive new requests. Complete the application form and our team will review your details to finish the verification process."}
                            </p>
                        </div>
                        <button className="register-btn partner-primary-cta" onClick={() => navigate("/register")}>
                            {t("contact1.register_btn")}
                            <span aria-hidden="true">{isArabic ? "←" : "→"}</span>
                        </button>
                    </Motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
