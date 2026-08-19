import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * عنوان ووصف لكل مسار.
 *
 * كان `<title>CarHero</title>` ثابتاً في كل الصفحات: قارئ الشاشة يعلن
 * العنوان نفسه بعد كل انتقال فلا يعرف المستخدم أين وصل، وسجل المتصفّح
 * يمتلئ بستّ مدخلات متطابقة، ومحرّكات البحث ترى صفحة واحدة مكرّرة.
 */
const titles = {
  ar: {
    "/": ["Car Hero — مساعدة الطريق تصل إليك أينما كنت", "منصة تربط السائقين بأقرب مزوّد متاح لخدمات الطوارئ على الطريق والصيانة المجدولة في سوريا."],
    "/services": ["الخدمات — Car Hero", "ثماني خدمات تغطي طوارئ الطريق والصيانة: سحب، بطارية، إطار، وقود، أقفال، زيت، أعطال، محرك."],
    "/app": ["التطبيق — Car Hero", "تعرّف على تطبيق Car Hero: اطلب المساعدة من موقعك، تابع المزوّد، واحجز خدمات الصيانة."],
    "/pricing": ["الأسعار — Car Hero", "خطط Car Hero المجانية والمميّزة وبرنامج نقاط الولاء."],
    "/contact": ["تواصل معنا — Car Hero", "أرسل استفسارك لفريق Car Hero، أو اطّلع على إجابات الأسئلة الشائعة للسائقين ومزوّدي الخدمة."],
    "/register": ["انضم كمزوّد — Car Hero", "سجّل ورشتك أو خدمتك الميدانية لاستقبال طلبات السائقين القريبين منك."],
    notFound: ["الصفحة غير موجودة — Car Hero", "الرابط الذي فتحته لم يعد متاحاً."],
  },
  en: {
    "/": ["Car Hero — Roadside help that reaches you wherever you are", "A platform connecting drivers with the nearest available provider for roadside emergencies and scheduled vehicle services in Syria."],
    "/services": ["Services — Car Hero", "Eight services covering roadside emergencies and maintenance: towing, battery, tire, fuel, lockout, oil, breakdown, engine."],
    "/app": ["The App — Car Hero", "Explore the Car Hero app: request help from your location, track the provider, and book maintenance."],
    "/pricing": ["Pricing — Car Hero", "Car Hero free and premium plans, and the loyalty points programme."],
    "/contact": ["Contact — Car Hero", "Send your question to the Car Hero team, or read answers to common questions from drivers and providers."],
    "/register": ["Join as Provider — Car Hero", "Register your workshop or field service to receive requests from nearby drivers."],
    notFound: ["Page not found — Car Hero", "The link you opened is no longer available."],
  },
};

export default function DocumentTitle() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const lang = i18n.language === "ar" ? "ar" : "en";

  useEffect(() => {
    const entry = titles[lang][pathname] ?? titles[lang].notFound;
    const [title, description] = entry;

    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [pathname, lang]);

  return null;
}
