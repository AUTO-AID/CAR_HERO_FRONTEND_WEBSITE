import React, { Suspense, lazy } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from '@/application/providers/NotificationProvider';
import ErrorBoundary from '@/presentation/components/layout/ErrorBoundary';
import PageLoader from '@/presentation/components/layout/PageLoader';
import ScrollToTop from '@/presentation/components/layout/ScrollToTop';
import SkipLink from '@/presentation/components/layout/SkipLink';
import DocumentTitle from '@/presentation/components/layout/DocumentTitle';
import './index.css';

const Home = lazy(() => import('@/presentation/pages/Home'));
const RegisterPage = lazy(() => import('@/presentation/pages/RegisterPage'));
const PricingPage = lazy(() => import('@/presentation/pages/PricingPage'));
const ContactPage = lazy(() => import('@/presentation/pages/ContactPage'));
const AppPage = lazy(() => import('@/presentation/pages/AppPage'));
const ServicesPage = lazy(() => import('@/presentation/pages/ServicesPage'));
const NotFoundPage = lazy(() => import('@/presentation/pages/NotFoundPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <SkipLink />
        <DocumentTitle />
        <Suspense fallback={<PageLoader />}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* المساران القديمان: «أخرى» تسمية لا تدل على محتواها، و«معلومات
                عن التطبيق» طويلة. إعادة التوجيه تحفظ أي رابط منشور. */}
            <Route path="/other" element={<Navigate to="/services" replace />} />
            <Route path="/app-info" element={<Navigate to="/app" replace />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </NotificationProvider>
    </ErrorBoundary>
  );
}
