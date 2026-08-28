import { apiClient, apiBaseUrl } from "../api/client";

// Keep mock mode opt-in so public website data is loaded from the backend by default.
const MOCK_API = import.meta.env.VITE_MOCK_API === "true";
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * ذاكرة قصيرة للنداءات العامّة.
 *
 * الصفحة الواحدة كانت تطلب `/public/statistics` و`/public/governorates` ثلاث
 * مرّات لكل منهما (أكثر من مكوّن يجلب نفس الرقم، ومعها استدعاء React المزدوج
 * في وضع التطوير). النتيجة: ستّة نداءات لبيانات لا تتغيّر خلال الدقيقة.
 * نجمع الطلبات المتزامنة على وعد واحد ونحتفظ بالنتيجة لمدّة قصيرة.
 */
const publicCache = new Map();
const PUBLIC_TTL_MS = 60_000;

const cachedGet = (key, loader) => {
  const entry = publicCache.get(key);
  const now = Date.now();
  if (entry && (entry.pending || now - entry.at < PUBLIC_TTL_MS)) return entry.promise;

  const promise = loader()
    .then((value) => {
      publicCache.set(key, { promise: Promise.resolve(value), at: Date.now(), pending: false });
      return value;
    })
    .catch((error) => {
      publicCache.delete(key); // الفشل لا يُخزَّن — المحاولة التالية تُعيد النداء
      throw error;
    });

  publicCache.set(key, { promise, at: now, pending: true });
  return promise;
};

export const applyProvider = async (payload) => {
  if (MOCK_API) {
    await delay(1200); // Simulate network latency for the final submit
    return { success: true, message: "Mock application submitted successfully" };
  }
  return apiClient.post("/providers/apply", payload);
};

/**
 * رفع ملفّ تسجيل (صورة ورشة/وثيقة) إلى الخادم فيعيد رابطاً مطلقاً.
 *
 * نموذج التسجيل كان يحتفظ باسم الملفّ فقط، فلا يصل الأدمن أي صورة. نرفع الملفّ
 * الآن عبر نقطة عامّة (التسجيل بلا توكن) ونخزّن الرابط في `shopPhotos` لتُعرض في
 * لوحة الأدمن. الفشل غير قاتل: يبقى المرفق باسمه فقط كما كان.
 */
export const uploadApplicationDocument = async (file) => {
  if (MOCK_API) {
    await delay(400);
    return URL.createObjectURL(file);
  }
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${apiBaseUrl}/providers/apply/documents/upload`, {
    method: "POST",
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.message || "Upload failed");
    error.status = res.status;
    throw error;
  }
  return data.fileUrl || data?.data?.fileUrl || "";
};

export const getGovernorates = async () => {
  if (MOCK_API) {
    await delay(300);
    return [
      { id: 1, name: "Damascus", nameAr: "دمشق" },
      { id: 2, name: "Aleppo", nameAr: "حلب" },
      { id: 3, name: "Homs", nameAr: "حمص" }
    ];
  }
  return cachedGet("governorates", () => apiClient.get("/providers/public/governorates"));
};

export const getPublicStatistics = async () => {
  if (MOCK_API) {
    await delay(300);
    return { providers: 120, users: 5000, requests: 12000 };
  }
  return cachedGet("statistics", () => apiClient.get("/providers/public/statistics"));
};
