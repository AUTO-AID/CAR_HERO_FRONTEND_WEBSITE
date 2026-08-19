import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion as Motion } from "framer-motion";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimerIcon from "@mui/icons-material/Timer";
import MapIcon from "@mui/icons-material/Map";
import { getPublicStatistics } from "@/infrastructure/services/providers.service";

/** هل يفضّل المستخدم تقليل الحركة؟ العدّ التصاعدي حركة كسائر الحركات */
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return undefined;
    setReduced(query.matches);
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
};

/**
 * رقم يبدأ مرسوماً بقيمته النهائية، ثم يُعاد عدّه تصاعدياً عند دخوله الشاشة.
 * الفشل المحتمل الوحيد هنا هو «لا حركة» — لا «صفر».
 */
const AnimatedNumber = ({ value, prefix = "" }) => {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const animatedRef = useRef(false);

  useEffect(() => { setDisplay(value); }, [value]);

  useEffect(() => {
    if (reducedMotion || !value || animatedRef.current || !ref.current) return undefined;
    const node = ref.current;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting) || animatedRef.current) return;
      animatedRef.current = true;
      observer.disconnect();
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        // تباطؤ في النهاية: العدّ الخطّي يبدو آلياً
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(step);
      };
      setDisplay(0);
      requestAnimationFrame(step);
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {Number(display).toLocaleString("en-US")}
    </span>
  );
};

const StatisticItem = ({ icon, value, label, index, prefix }) => (
  <Motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    style={{ height: "100%", width: "100%" }}
  >
    <Paper
      elevation={0}
      sx={{
        p: { xs: "35px 20px", md: "50px 25px" },
        textAlign: "center",
        borderRadius: "20px",
        background: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, transparent, rgba(143, 92, 177, 0.05), transparent)",
          transition: "left 400ms ease",
        },
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "var(--shadow-hover), 0 0 30px rgba(143, 92, 177, 0.15)",
          borderColor: "var(--primary)",
          "&::before": {
            left: "100%",
          },
          "& .stat-icon": {
            transform: "scale(1.15) rotate(10deg)",
            background: "var(--gradient)",
            color: "white",
            boxShadow: "0 8px 20px rgba(143, 92, 177, 0.3)",
          },
        },
      }}
    >
      <Box
        className="stat-icon"
        sx={{
          mb: 3,
          p: 2,
          borderRadius: "16px",
          background: "rgba(143, 92, 177, 0.08)",
          border: "1.5px solid rgba(143, 92, 177, 0.2)",
          color: "var(--primary-text)",
          display: "inline-flex",
          transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {React.createElement(icon, { sx: { fontSize: 36 } })}
      </Box>

      <Typography
        component="p"
        sx={{
          fontWeight: 700,
          background: "var(--gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 1,
          fontFamily: "'Inter', sans-serif",
          fontSize: { xs: "2.2rem", sm: "2.5rem", md: "2.8rem" },
        }}
      >
        {/* الرقم يُرسم كاملاً أولاً، والعدّ التصاعدي تحسين فوقه لا شرط لظهوره.
            كان `enableScrollSpy` يتسابق مع وصول البيانات: القسم يكون داخل
            الشاشة قبل أن تصل الأرقام، فلا يُطلق المراقب أبداً وتبقى «+٠»
            معروضة مكان ١٬٦٢٣ و١٬٨٠١ — أي أن أهمّ دليل ثقة في الصفحة كان
            يعرض صفراً. */}
        <AnimatedNumber value={Number(value) || 0} prefix={prefix} />
      </Typography>

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1rem", md: "1.1rem" },
          fontWeight: 700,
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {label}
      </Typography>
    </Paper>
  </Motion.div>
);

/** هيكل بطاقة بمقاس البطاقة النهائي — يحجز المساحة ويشير إلى أن شيئاً قادم */
const StatisticSkeleton = () => (
  <Paper
    elevation={0}
    aria-hidden="true"
    sx={{
      p: { xs: "35px 20px", md: "50px 25px" },
      borderRadius: "20px",
      background: "var(--card-bg)",
      border: "1px solid var(--border-color)",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
    }}
  >
    <Box className="stat-skeleton" sx={{ width: 68, height: 68, borderRadius: "16px" }} />
    <Box className="stat-skeleton" sx={{ width: "62%", height: 38, borderRadius: "12px" }} />
    <Box className="stat-skeleton" sx={{ width: "80%", height: 16, borderRadius: "8px" }} />
  </Paper>
);

const StatisticsSection = ({ hideHeader = false, onUnavailable }) => {
  const { t, i18n } = useTranslation();
  const [liveStats, setLiveStats] = useState(null);
  // "loading" ← "ready" | "failed". كانت الحالة الوحيدة `null`، فلا يفرّق
  // القسم بين «لم تصل بعد» و«لن تصل» — ويعرض الفراغ ذاته في الحالتين.
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const fetchStats = async () => {
      try {
        const response = await getPublicStatistics();
        const data = response?.data?.data ?? response?.data ?? response;
        if (!active) return;
        if (data && typeof data === "object") {
          setLiveStats({
            customers: Number(data.customers ?? data.users ?? 0),
            approvedProviders: Number(data.approvedProviders ?? data.providers ?? data.totalProviders ?? 0),
            coveredAreas: Number(data.coveredAreas ?? data.cities ?? data.governorates ?? 0),
            averageResponseMinutes: Number(data.averageResponseMinutes ?? data.responseTime ?? 0),
          });
          setStatus("ready");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Failed to fetch public statistics:", error);
        // نُبقي آخر أرقام وصلت إن وُجدت — فشل تحديث دوري لا يمحو ما عُرض
        if (active) setStatus((prev) => (prev === "ready" ? "ready" : "failed"));
      }
    };

    fetchStats();
    const refreshInterval = window.setInterval(fetchStats, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshInterval);
    };
  }, []);

  // الأب يحتاج معرفة أن الأرقام غير متاحة ليخفي القسم بدل ترك عنوان بلا محتوى
  useEffect(() => {
    onUnavailable?.(status === "failed");
  }, [status, onUnavailable]);

  const stats = liveStats ? [
    { icon: PeopleAltIcon, value: liveStats.customers, label: t("stats.users"), prefix: "+" },
    { icon: EngineeringIcon, value: liveStats.approvedProviders, label: t("stats.providers"), prefix: "+" },
    { icon: MapIcon, value: liveStats.coveredAreas, label: t("stats.cities"), prefix: "+" },
    // زمن الاستجابة كلّما قلّ كان أفضل — «+١٢ دقيقة» تقرأ كوعد بالأسوأ
    { icon: TimerIcon, value: liveStats.averageResponseMinutes, label: t("stats.response_time"), prefix: "" },
  ] : [];

  // لا شيء يُعرض عند الفشل — أفضل من شبكة فارغة تحت عنوان يَعِد بأرقام
  if (status === "failed") return null;

  return (
    <Box
      id="stats"
      sx={{
        // داخل شريط الثقة يملك الغلاف الإيقاع، فلا يضيف القسم حشوته فوقه
        py: hideHeader ? 0 : { xs: 8, md: 10 },
        px: hideHeader ? 0 : { xs: 2, md: 10 },
        background: hideHeader ? "transparent" : "var(--bg-section)",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative orbs */}
      <Box sx={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(143, 92, 177, 0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', bottom: -80, right: -80, width: 250, height: 250, borderRadius: '50%', background: 'rgba(143, 92, 177, 0.04)', filter: 'blur(50px)', pointerEvents: 'none' }} />
      {/* يُخفى حين يُعرَض القسم داخل شريط الثقة، فالشريط يحمل عنواناً واحداً */}
      {!hideHeader && (
        <Box textAlign="center" mb={7}>
           <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
           >
             <Typography
               component="h2"
               sx={{
                 fontWeight: 700,
                 background: "var(--gradient)",
                 WebkitBackgroundClip: "text",
                 WebkitTextFillColor: "transparent",
                 mb: 1.5,
                 fontSize: { xs: "24px", md: "36px" }
               }}
             >
               {t("stats.title")}
             </Typography>
             <Typography variant="body1" color="var(--text-muted)" maxWidth={600} mx="auto">
               {t("stats.subtitle")}
             </Typography>
           </Motion.div>
        </Box>
      )}

      {/* أثناء الانتظار تُرسم البطاقات الأربع بهيكلها ومقاسها النهائي: لا
          فراغ يظهر ثم يقفز، ولا ارتفاع يتغيّر عند وصول الأرقام. */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        aria-busy={status === "loading"}
      >
        {status === "loading"
          ? [0, 1, 2, 3].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ display: "flex" }}>
                <StatisticSkeleton />
              </Grid>
            ))
          : stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ display: "flex" }}>
                <StatisticItem {...stat} index={i} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default StatisticsSection;
