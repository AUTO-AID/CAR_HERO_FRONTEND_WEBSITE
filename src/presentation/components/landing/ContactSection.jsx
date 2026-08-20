import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";
import Accordion from "@/presentation/components/ui/Accordion";
import {
  CONTACT_EMAIL,
  buildMailtoLink,
  hasContactEndpoint,
  sendContactMessage,
} from "@/infrastructure/services/contact.service";
import { contactDetails } from "@/presentation/content/contactDetails";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [mailtoOpened, setMailtoOpened] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const text = isArabic
    ? {
        eyebrow: "تواصل معنا",
        titleStart: "نحن هنا",
        titleAccent: "لمساعدتك",
        intro: "لديك سؤال عن الخدمة، التسجيل كمزود، أو طريقة استخدام التطبيق؟ أرسل لنا رسالتك وسنعود إليك بأقرب وقت.",
        emailLabel: "البريد الإلكتروني",
        callLabel: "اتصل بنا",
        locationLabel: "مناطق الخدمة",
        emailValue: contactDetails.email,
        phoneValue: contactDetails.phone,
        locationValue: contactDetails.coverage.ar,
        formTitle: "أرسل لنا رسالة",
        formIntro: "املأ النموذج وسيتواصل معك فريق Car Hero لمساعدتك أو توجيه طلبك للقسم المناسب.",
        phone: "رقم الهاتف",
        reason: "سبب التواصل",
        reasonPlaceholder: "اختر سبب التواصل",
        reasons: ["استفسار عن خدمة", "مشكلة في طلب", "تسجيل مزود خدمة", "اقتراح أو ملاحظة"],
        consent: "أوافق على أن يتواصل فريق Car Hero معي بخصوص هذه الرسالة.",
        faqTitle: "الأسئلة الشائعة",
        faqIntro: "إجابات سريعة على أكثر الأسئلة التي تصلنا من السائقين ومزودي الخدمة.",
      }
    : {
        eyebrow: "Contact Us",
        titleStart: "Get in touch",
        titleAccent: "with Car Hero",
        intro: "Have a question about services, provider registration, or how the app works? Send us a message and our team will get back to you.",
        emailLabel: "Email Us",
        callLabel: "Call Us",
        locationLabel: "Service Areas",
        emailValue: contactDetails.email,
        phoneValue: contactDetails.phone,
        locationValue: contactDetails.coverage.en,
        formTitle: "Send us a message",
        formIntro: "Fill out the form and the Car Hero team will help you or route your request to the right team.",
        phone: "Phone Number",
        reason: "Reason for Contact",
        reasonPlaceholder: "Select a reason",
        reasons: ["Service inquiry", "Issue with a request", "Provider registration", "Suggestion or feedback"],
        consent: "I agree that the Car Hero team may contact me about this message.",
        faqTitle: "Frequently Asked Questions",
        faqIntro: "Quick answers to the questions we hear most from drivers and service providers.",
      };

  const faqData = t("contact_faq", { returnObjects: true });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    // لا نقطة نهاية مضبوطة: نفتح بريد المستخدم برسالة معبّأة بدل ادّعاء
    // إرسال لم يحدث. الرسالة تبقى في الحقول حتى يؤكّد هو الإرسال.
    if (!hasContactEndpoint) {
      window.location.href = buildMailtoLink(formData, isArabic);
      setMailtoOpened(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await sendContactMessage(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", reason: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setIsSubmitting(false);
      // الخطأ يشرح ما حدث وما البديل — لا اعتذار مبهم
      setErrorMessage(
        isArabic
          ? `تعذّر إرسال الرسالة (${error.status || "خطأ في الاتصال"}). راسلنا مباشرةً على ${CONTACT_EMAIL}.`
          : `Could not send the message (${error.status || "connection error"}). Email us directly at ${CONTACT_EMAIL}.`,
      );
    }
  };

  const contactCards = [
    { icon: Mail, label: text.emailLabel, value: text.emailValue, ltr: true },
    { icon: Phone, label: text.callLabel, value: text.phoneValue, ltr: true },
    { icon: MapPin, label: text.locationLabel, value: text.locationValue },
  ];

  return (
    <section id="contact" className="contact-page-shell" dir={isArabic ? "rtl" : "ltr"}>
      <div className="contact-hero-band">
        <div className="app-container">
          <Motion.div
            className="contact-page-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="contact-eyebrow">{text.eyebrow}</span>
            <h1>
              {text.titleStart} <span>{text.titleAccent}</span>
            </h1>
            <p>{text.intro}</p>
          </Motion.div>

          <div className="contact-method-grid">
            {contactCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Motion.div
                  key={card.label}
                  className="contact-method-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <span>
                    <Icon size={26} strokeWidth={2.4} />
                  </span>
                  <strong>{card.label}</strong>
                  {/* داخل بطاقة عربية يُعرض ‎+963 956868573‎ مقلوباً
                      «956868573 963+»: علامة '+' والمسافة محرفان محايدان
                      اتجاهياً فيرثان اتجاه الفقرة، ويُعاد ترتيب المقطعين.
                      <bdi> يعزل السلسلة كوحدة LTR مستقلّة عمّا حولها —
                      وهو نفس ما يفعله الفوتر أصلاً. التوسيط لا يتأثّر. */}
                  <p>{card.ltr ? <bdi dir="ltr">{card.value}</bdi> : card.value}</p>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="contact-form-band">
        <div className="app-container contact-form-layout">
          <Motion.div
            className="contact-form-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <h2>{text.formTitle}</h2>
            <p>{text.formIntro}</p>
          </Motion.div>

          <Motion.form
            className={`contact-form contact-modern-form ${isArabic ? "rtl-form" : "ltr-form"}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* كانت كل الحقول بلا <label>، تعتمد على placeholder وحده —
                فيختفي اسم الحقل فور الكتابة، ولا يعلنه قارئ الشاشة أصلاً */}
            <div className="contact-field-row">
              <div className="contact-field">
                <label htmlFor="contact-name">{t("contact1.full_name")}</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  disabled={isSubmitting || isSuccess}
                />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">{t("contact1.email")}</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  disabled={isSubmitting || isSuccess}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-phone">{text.phone}</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                dir="ltr"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                disabled={isSubmitting || isSuccess}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contact-reason">{text.reason}</label>
              <select
                id="contact-reason"
                name="reason"
                value={formData.reason}
                onChange={(event) => setFormData({ ...formData, reason: event.target.value })}
                disabled={isSubmitting || isSuccess}
              >
                <option value="">{text.reasonPlaceholder}</option>
                {text.reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">{t("contact1.message")}</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                disabled={isSubmitting || isSuccess}
              />
            </div>

            <label className="contact-consent">
              <input type="checkbox" name="consent" required disabled={isSubmitting || isSuccess} />
              <span>{text.consent}</span>
            </label>

            {/* حالة الإرسال كانت مرئية في نص الزر فقط — لا يعلنها قارئ الشاشة */}
            <p className="contact-form-status" role="status" aria-live="polite">
              {isSubmitting
                ? t("common.loading")
                : isSuccess
                  ? t("common.success")
                  : mailtoOpened
                    ? (isArabic
                        ? "فُتح تطبيق البريد لديك برسالة معبّأة — أكمل الإرسال من هناك."
                        : "Your email app opened with the message filled in — send it from there.")
                    : ""}
            </p>

            {errorMessage && (
              <p className="contact-form-error" role="alert">
                {errorMessage}
              </p>
            )}

            {/* لا يوجد خادم يستقبل الرسائل بعد. قول ذلك أصدق من زرّ يدّعي
                الإرسال، والمستخدم يعرف مسبقاً ما الذي سيحدث عند الضغط. */}
            {!hasContactEndpoint && (
              <p className="contact-form-note">
                {isArabic
                  ? `الضغط على الزر يفتح تطبيق البريد لديك برسالة جاهزة موجّهة إلى ${CONTACT_EMAIL}.`
                  : `The button opens your email app with a ready message addressed to ${CONTACT_EMAIL}.`}
              </p>
            )}

            {/* الزر يقول بالضبط ما سيحدث عند الضغط */}
            <button type="submit" disabled={isSubmitting || isSuccess} className="form-submit-btn contact-submit-btn">
              <Send size={18} strokeWidth={2.5} />
              {isSubmitting
                ? t("common.loading")
                : isSuccess
                  ? t("common.success")
                  : hasContactEndpoint
                    ? t("contact1.submit_btn")
                    : (isArabic ? "أرسل عبر بريدك" : "Send via your email")}
            </button>
          </Motion.form>
        </div>
      </div>

      <div className="contact-faq-band">
        <div className="app-container">
          <Motion.div
            className="contact-faq-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* كانت التسمية العلوية والعنوان يحملان النص ذاته حرفياً */}
            <span className="contact-eyebrow">{isArabic ? "إجابات سريعة" : "Quick answers"}</span>
            <h2>{text.faqTitle}</h2>
            <p>{text.faqIntro}</p>
          </Motion.div>

          <Accordion items={Array.isArray(faqData) ? faqData : []} className="contact-faq-list" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
