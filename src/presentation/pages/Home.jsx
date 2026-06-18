import React from "react";
import Navbar from "@/presentation/components/layout/Navbar";
import HeroSection from "@/presentation/components/landing/HeroSection";
import ServiceSection from "@/presentation/components/landing/ServiceSection";
import HowItWorks from "@/presentation/components/landing/HowItWorks";
import WhyChooseUs from "@/presentation/components/landing/WhyChooseUs";
import CoverageSection from "@/presentation/components/landing/CoverageSection";
import AppScreenshots from "@/presentation/components/landing/AppScreenshots";
import PricingPlans from "@/presentation/components/landing/PricingPlans";
import SalientFeatures from "@/presentation/components/landing/SalientFeatures";
import Footer from "@/presentation/components/layout/Footer";
import DownloadSection from "@/presentation/components/landing/DownloadSection";
import StatisticsSection from "@/presentation/components/landing/StatisticsSection";
import TestimonialsSection from "@/presentation/components/landing/TestimonialsSection";
import ContactSection from "@/presentation/components/landing/ContactSection";
import LoyaltyRewards from "@/presentation/components/landing/LoyaltyRewards";

const SectionTone = ({ tone, children }) => (
  <div className={`landing-section-tone landing-section-tone-${tone}`}>{children}</div>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <SectionTone tone="a"><HeroSection /></SectionTone>
      <SectionTone tone="b"><ServiceSection /></SectionTone>
      <SectionTone tone="a"><HowItWorks /></SectionTone>
      <SectionTone tone="b"><WhyChooseUs /></SectionTone>
      <SectionTone tone="a"><CoverageSection /></SectionTone>
      <SectionTone tone="b"><LoyaltyRewards /></SectionTone>
      <SectionTone tone="a"><PricingPlans /></SectionTone>
      <SectionTone tone="b"><AppScreenshots /></SectionTone>
      <SectionTone tone="a"><SalientFeatures /></SectionTone>
      <SectionTone tone="b"><StatisticsSection /></SectionTone>
      <SectionTone tone="a"><ContactSection /></SectionTone>
      <SectionTone tone="b"><TestimonialsSection /></SectionTone>
      <SectionTone tone="a"><DownloadSection /></SectionTone>
      <Footer/>
    </>
  );
};

export default Home;
