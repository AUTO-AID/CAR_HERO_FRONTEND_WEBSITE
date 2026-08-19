import React from "react";
import Navbar from "@/presentation/components/layout/Navbar";
import HeroSection from "@/presentation/components/landing/HeroSection";
import HowItWorks from "@/presentation/components/landing/HowItWorks";
import HomeExperience from "@/presentation/components/landing/HomeExperience";
import CoverageSection from "@/presentation/components/landing/CoverageSection";
import TrustSection from "@/presentation/components/landing/TrustSection";
import HomeProviderCta from "@/presentation/components/landing/HomeProviderCta";
import Footer from "@/presentation/components/layout/Footer";

const SectionTone = ({ tone, children }) => (
  <div className={`landing-section-tone landing-section-tone-${tone}`}>{children}</div>
);

/**
 * ترتيب الصفحة الرئيسية كقصة واحدة موجّهة للسائق:
 * الوعد ← كيف يعمل ← ماذا نقدّم ← أين نعمل ← لماذا نُصدَّق ← ماذا تفعل الآن.
 *
 * كان الترتيب سابقاً: الوعد ← الخدمات ← دعوة موجّهة للمزوّدين ← أرقام ←
 * خريطة ← آراء. أي أن الصفحة كانت تطلب الفعل قبل أن تشرح كيف تعمل الخدمة،
 * وتقطع رحلة السائق بدعوة لجمهور مختلف تماماً.
 */
const Home = () => {
  return (
    <>
      <Navbar />
      <main id="main">
        <SectionTone tone="a"><HeroSection /></SectionTone>
        <SectionTone tone="b"><HowItWorks /></SectionTone>
        <SectionTone tone="a"><HomeExperience /></SectionTone>
        <SectionTone tone="b"><CoverageSection /></SectionTone>
        <SectionTone tone="a"><TrustSection /></SectionTone>
        <SectionTone tone="b"><HomeProviderCta /></SectionTone>
      </main>
      <Footer />
    </>
  );
};

export default Home;
