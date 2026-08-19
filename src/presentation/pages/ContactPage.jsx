import React from "react";
import Navbar from "@/presentation/components/layout/Navbar";
import ContactSection from "@/presentation/components/landing/ContactSection";
import Footer from "@/presentation/components/layout/Footer";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main id="main">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
