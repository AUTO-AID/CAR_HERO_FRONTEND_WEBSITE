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
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServiceSection/>
      <HowItWorks />
      <WhyChooseUs/>
      <CoverageSection />
      <LoyaltyRewards />
      <PricingPlans />
      <AppScreenshots />
      <SalientFeatures/>
      <StatisticsSection/>
      <ContactSection/>
      <TestimonialsSection/>
      <DownloadSection/>
      <Footer/>
    </>
  );
};

export default Home;
