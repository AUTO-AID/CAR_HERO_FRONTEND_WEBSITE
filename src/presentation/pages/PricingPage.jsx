import React from "react";
import Navbar from "@/presentation/components/layout/Navbar";
import PricingPlans from "@/presentation/components/landing/PricingPlans";
import LoyaltyRewards from "@/presentation/components/landing/LoyaltyRewards";
import Footer from "@/presentation/components/layout/Footer";

const SectionTone = ({ tone, children }) => (
  <div className={`landing-section-tone landing-section-tone-${tone}`}>{children}</div>
);

const PricingPage = () => {
  return (
    <>
      <Navbar />
      <main id="main">
        <SectionTone tone="a"><PricingPlans /></SectionTone>
        <SectionTone tone="b"><LoyaltyRewards /></SectionTone>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage;
