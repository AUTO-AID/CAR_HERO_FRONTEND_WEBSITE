import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * يعيد التمرير لأعلى عند تغيّر المسار — إلا حين يحمل الرابط مرساةً، فعندها
 * يمرّر إليها. بدون هذا كانت الروابط من نوع `/#how-it-works` تفتح الصفحة من
 * أعلاها وتتجاهل المرساة تماماً.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // العنصر قد لا يكون قد رُكّب بعد عند الانتقال بين الصفحات
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const timer = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 260);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}
