import {
  BatteryCharging,
  CircleDotDashed,
  Fuel,
  Gauge,
  KeyRound,
  Truck,
  Wrench,
  Wind,
} from "lucide-react";

/**
 * المصدر الوحيد لقائمة الخدمات.
 *
 * كانت موزّعة على ثلاثة مواضع بصياغات مختلفة: شبكة الرئيسية (٦)، و
 * `left_features`/`right_features` في ملف الترجمة (٦)، وقائمة رابعة داخل
 * صفحة معلومات التطبيق (٤). أي تعديل على خدمة كان يتطلب تتبّع ثلاثة ملفات،
 * وقد تباعدت الصياغات فعلاً. النصوص هنا مدموجة من المصادر الثلاثة.
 */
export const services = [
  {
    id: "towing",
    icon: Truck,
    ar: { title: "خدمة السحب", short: "نقل السيارة بأمان إلى أقرب ورشة أو موقع تختاره.", long: "عند التعطل الكامل أو الحادث، نصل إليك بسحّاب مناسب وننقل المركبة إلى الورشة أو الموقع الذي تحدده." },
    en: { title: "Towing Service", short: "Move the vehicle safely to a workshop or chosen location.", long: "For a full breakdown or an accident, we reach you with a suitable tow truck and move the vehicle to the workshop or location you choose." },
    home: true,
  },
  {
    id: "battery",
    icon: BatteryCharging,
    ar: { title: "تشغيل البطارية", short: "مساعدة سريعة عند ضعف البطارية أو توقف السيارة.", long: "بطارية فارغة أو ضعيفة؟ نقدم تشغيلاً فورياً، ونوفّر تبديل البطارية عند الحاجة في موقعك." },
    en: { title: "Battery Jump Start", short: "Fast help when the battery is weak or the car will not start.", long: "Dead or weak battery? We provide an immediate jump start, and battery replacement at your location when needed." },
    home: true,
  },
  {
    id: "tire",
    icon: CircleDotDashed,
    ar: { title: "تغيير الإطار", short: "تبديل الإطار المثقوب على الطريق بدون انتظار طويل.", long: "مشكلة في الإطار؟ خدمة تبديل وإصلاح سريعة في موقعك، دون الحاجة للوصول إلى ورشة." },
    en: { title: "Flat Tire Change", short: "Replace a flat tire on the road without a long wait.", long: "Tire trouble? Fast change and repair service right where you are, with no need to reach a workshop." },
    home: true,
  },
  {
    id: "fuel",
    icon: Fuel,
    ar: { title: "توصيل الوقود", short: "وقود يصلك عند نفاده لتكمل طريقك بسرعة.", long: "نفد الوقود على الطريق؟ نوصل الكمية التي تحتاجها إلى موقعك لتكمل رحلتك." },
    en: { title: "Fuel Delivery", short: "Fuel delivered when you run out so you can keep moving.", long: "Ran out of fuel on the road? We deliver the amount you need to your location so you can continue your journey." },
    home: true,
  },
  {
    id: "lockout",
    icon: KeyRound,
    ar: { title: "فتح الأقفال", short: "مساعدة عند إغلاق السيارة أو نسيان المفتاح بداخلها.", long: "نسيت المفاتيح بالداخل؟ فنيّون يفتحون المركبة بأمان ودون إحداث أي ضرر." },
    en: { title: "Lockout Service", short: "Help when the car is locked or the key is left inside.", long: "Keys locked inside? Technicians open the vehicle safely and without causing any damage." },
    home: true,
  },
  {
    id: "oil",
    icon: Wrench,
    ar: { title: "تغيير الزيت", short: "صيانة أساسية تحافظ على جاهزية سيارتك.", long: "احجز تغيير الزيت والفلاتر في الوقت المناسب لك، بسعر معروف قبل تأكيد الطلب." },
    en: { title: "Oil Change", short: "Essential maintenance to keep your car ready.", long: "Book an oil and filter change at a time that suits you, with the price known before you confirm the request." },
    home: true,
  },
  {
    id: "breakdown",
    icon: Gauge,
    ar: { title: "أعطال مفاجئة", short: "استجابة سريعة عند توقف السيارة على الطريق.", long: "الأعطال المفاجئة تحدث. يصلك فنيّ قريب لتشخيص العطل على الطريق وإعادتك للحركة، أو ترتيب السحب إن لزم." },
    en: { title: "Sudden Breakdown", short: "Fast response when the car stops on the road.", long: "Breakdowns happen. A nearby technician reaches you to diagnose the fault on the road and get you moving, or arrange towing if needed." },
    home: false,
  },
  {
    id: "engine",
    icon: Wind,
    ar: { title: "مشاكل المحرك", short: "فحص عاجل عند ظهور دخان أو مؤشرات تحذير.", long: "دخان أو أضواء تحذير على اللوحة؟ توقف بأمان واطلب فحصاً عاجلاً قبل أن يتفاقم العطل." },
    en: { title: "Engine Trouble", short: "Urgent check when smoke or warning lights appear.", long: "Smoke or warning lights on the dashboard? Park safely and request an urgent check before the fault gets worse." },
    home: false,
  },
];

/** الخدمات الستّ المعروضة في شبكة الصفحة الرئيسية كمعاينة. */
export const homeServices = services.filter((service) => service.home);
