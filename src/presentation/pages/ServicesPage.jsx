import React from "react";
import Navbar from "@/presentation/components/layout/Navbar";
import ServicesCatalog from "@/presentation/components/landing/ServicesCatalog";
import Footer from "@/presentation/components/layout/Footer";

const SectionTone = ({ tone, children }) => (
  <div className={`landing-section-tone landing-section-tone-${tone}`}>{children}</div>
);

/**
 * حلّت محل `OtherPage` — تبويب «أخرى» الذي كان يحمل خمسة أقسام هي جوهر
 * الرسالة التسويقية خلف تسمية لا تدل على شيء.
 */
const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main id="main">
        <SectionTone tone="a">
          <ServicesCatalog />
        </SectionTone>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
