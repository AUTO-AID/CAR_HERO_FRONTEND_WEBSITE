import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SyriaMap from '@/presentation/components/map/SyriaMap';
import Section from '@/presentation/components/ui/Section';
import SectionHead from '@/presentation/components/ui/SectionHead';

const CoverageSection = () => {
  const { t } = useTranslation();

  return (
    <Section id="coverage-map-section" rhythm="spacious" width="wide">
      <SectionHead title={t('coverage.title')} subtitle={t('coverage.subtitle')} />

      <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SyriaMap />
      </Motion.div>
    </Section>
  );
};

export default CoverageSection;
