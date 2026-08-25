import {
  BatteryCharging,
  CircleDotDashed,
  CircleGauge,
  Droplets,
  Fuel,
  KeyRound,
  SprayCan,
  TriangleAlert,
  Truck,
} from "lucide-react";

/**
 * المصدر الوحيد لقائمة الخدمات في الموقع — وهو نفسه كتالوج المنصّة.
 *
 * كانت موزّعة على أربعة مواضع بصياغات مختلفة: شبكة الرئيسية، و`servicesItems`
 * في ملفّي الترجمة، وقائمة داخل صفحة معلومات التطبيق، واثنا عشر «تخصّصاً» في
 * نموذج تسجيل الفنّي. أي تعديل على خدمة كان يتطلّب تتبّع أربعة ملفات، وقد
 * تباعدت الصياغات فعلاً.
 *
 * **`id` هنا هو `category` في الخادم حرفياً** — لا خريطة ترجمة بينهما. كان
 * النموذج يرسل معرّفات من عنده (`tires`, `detailing`, `mechanical`) يترجمها
 * الخادم إلى فئاته، فيملأ المزوّد خدماته وأسعارها ثم يجدها فارغة في لوحته.
 * نظائر هذا الملف: `CAR_HERO_BACKEND/src/config/service-catalog.ts`،
 * و`serviceCatalog.js` في التطبيقين، و`service-catalog.ts` في اللوحتين.
 */
export const services = [
  {
    id: "towing",
    icon: Truck,
    color: "#2563EB",
    ar: {
      title: "خدمة السحب",
      short: "نقل السيارة بأمان إلى أقرب ورشة أو موقع تختاره.",
      long: "عند التعطل الكامل أو الحادث، نصل إليك بسحّاب مناسب وننقل المركبة إلى الورشة أو الموقع الذي تحدده.",
    },
    en: {
      title: "Towing Service",
      short: "Move the vehicle safely to a workshop or chosen location.",
      long: "For a full breakdown or an accident, we reach you with a suitable tow truck and move the vehicle to the workshop or location you choose.",
    },
    home: true,
  },
  {
    id: "battery",
    icon: BatteryCharging,
    color: "#7C3AED",
    ar: {
      title: "تشغيل البطارية",
      short: "مساعدة سريعة عند ضعف البطارية أو توقف السيارة.",
      long: "بطارية فارغة أو ضعيفة؟ نقدم تشغيلاً فورياً، ونوفّر تبديل البطارية عند الحاجة في موقعك.",
    },
    en: {
      title: "Battery Jump Start",
      short: "Fast help when the battery is weak or the car will not start.",
      long: "Dead or weak battery? We provide an immediate jump start, and battery replacement at your location when needed.",
    },
    home: true,
  },
  {
    id: "tire",
    icon: CircleDotDashed,
    color: "#E11D48",
    ar: {
      title: "تغيير الإطار",
      short: "تبديل الإطار المثقوب على الطريق بدون انتظار طويل.",
      long: "مشكلة في الإطار؟ خدمة تبديل وإصلاح سريعة في موقعك، دون الحاجة للوصول إلى ورشة.",
    },
    en: {
      title: "Flat Tire Change",
      short: "Replace a flat tire on the road without a long wait.",
      long: "Tire trouble? Fast change and repair service right where you are, with no need to reach a workshop.",
    },
    home: true,
  },
  {
    id: "fuel",
    icon: Fuel,
    color: "#F59E0B",
    ar: {
      title: "توصيل الوقود",
      short: "وقود يصلك عند نفاده لتكمل طريقك بسرعة.",
      long: "نفد الوقود على الطريق؟ نوصل الكمية التي تحتاجها إلى موقعك لتكمل رحلتك.",
    },
    en: {
      title: "Fuel Delivery",
      short: "Fuel delivered when you run out so you can keep moving.",
      long: "Ran out of fuel on the road? We deliver the amount you need to your location so you can continue your journey.",
    },
    home: true,
  },
  {
    id: "lockout",
    icon: KeyRound,
    color: "#0891B2",
    ar: {
      title: "فتح الأقفال",
      short: "مساعدة عند إغلاق السيارة أو نسيان المفتاح بداخلها.",
      long: "نسيت المفاتيح بالداخل؟ فنيّون يفتحون المركبة بأمان ودون إحداث أي ضرر.",
    },
    en: {
      title: "Lockout Service",
      short: "Help when the car is locked or the key is left inside.",
      long: "Keys locked inside? Technicians open the vehicle safely and without causing any damage.",
    },
    home: true,
  },
  {
    id: "oil",
    icon: Droplets,
    color: "#059669",
    ar: {
      title: "تغيير الزيت",
      short: "صيانة أساسية تحافظ على جاهزية سيارتك.",
      long: "احجز تغيير الزيت والفلاتر في الوقت المناسب لك، بسعر معروف قبل تأكيد الطلب.",
    },
    en: {
      title: "Oil Change",
      short: "Essential maintenance to keep your car ready.",
      long: "Book an oil and filter change at a time that suits you, with the price known before you confirm the request.",
    },
    home: true,
  },
  {
    id: "breakdown",
    icon: TriangleAlert,
    color: "#EA580C",
    ar: {
      title: "أعطال مفاجئة",
      short: "استجابة سريعة عند توقف السيارة على الطريق.",
      long: "الأعطال المفاجئة تحدث. يصلك فنيّ قريب لتشخيص العطل على الطريق وإعادتك للحركة، أو ترتيب السحب إن لزم.",
    },
    en: {
      title: "Sudden Breakdown",
      short: "Fast response when the car stops on the road.",
      long: "Breakdowns happen. A nearby technician reaches you to diagnose the fault on the road and get you moving, or arrange towing if needed.",
    },
    home: false,
  },
  {
    id: "engine",
    icon: CircleGauge,
    color: "#DC2626",
    ar: {
      title: "مشاكل المحرك",
      short: "فحص عاجل عند ظهور دخان أو مؤشرات تحذير.",
      long: "دخان أو أضواء تحذير على اللوحة؟ توقف بأمان واطلب فحصاً عاجلاً قبل أن يتفاقم العطل.",
    },
    en: {
      title: "Engine Trouble",
      short: "Urgent check when smoke or warning lights appear.",
      long: "Smoke or warning lights on the dashboard? Park safely and request an urgent check before the fault gets worse.",
    },
    home: false,
  },
  {
    id: "car_wash",
    icon: SprayCan,
    color: "#0284C7",
    ar: {
      title: "غسيل السيارة",
      short: "غسيل وتلميع كامل في موقعك، أو ضمن خطة دورية.",
      long: "احجز غسيلاً كاملاً داخلياً وخارجياً حيث أنت، أو اشترك بخطة غسيل دورية تُولّد المواعيد تلقائياً بلا حجز في كل مرة.",
    },
    en: {
      title: "Car Wash",
      short: "Full wash and detailing at your place, or on a plan.",
      long: "Book a full interior and exterior wash wherever you are, or subscribe to a recurring plan that schedules the visits for you.",
    },
    home: false,
  },
];

/** الخدمات الستّ المعروضة في شبكة الصفحة الرئيسية كمعاينة. */
export const homeServices = services.filter((service) => service.home);

/**
 * أسماء الخدمات للغة الحالية — يستهلكها التذييل بدل نسخته الخاصة في ملفّي
 * الترجمة، التي كانت تعرض «المساعدة على الطريق» وهي ليست خدمة في الكتالوج.
 */
export function serviceTitles(lang) {
  const key = lang === "ar" ? "ar" : "en";
  return services.map((service) => service[key].title);
}
