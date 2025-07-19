// 🚀 DEPLOYMENT TRIGGER: June 24, 2025 - SEO Enhanced Version Ready for Production
// All Phase 1 & 2 SEO implementations completed and ready for deployment

import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apolloClient';
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { WordPressProvider } from "./providers/WordPressProvider";
import { CartProvider } from "./contexts/CartContext";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SecurityHeaders from "./components/security/SecurityHeaders";
import SEOProvider from "./components/seo/SEOProvider";
import { GoogleAnalytics } from "./components/Analytics";
import { ClarityAnalytics } from "./components/Analytics/ClarityAnalytics";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import WhatsAppButton from "./components/common/WhatsAppButton";
import { usePerformanceMonitoring, trackPageLoad } from "./hooks/usePerformanceMonitoring";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { LoadingSpinner } from "./components/common/SkeletonLoaders";
import { monitorBundleSize } from "./utils/bundleAnalyzer";

// Lazy load heavy pages for better performance
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AppBuilding = lazy(() => import("./pages/AppBuilding"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const WorkflowAutomation = lazy(() => import("./pages/WorkflowAutomation"));
const ServicesAndPricing = lazy(() => import("./pages/ServicesAndPricing"));
const Admin = lazy(() => import("./pages/Admin"));
const Cart = lazy(() => import("./pages/Cart"));
const AnalyticsTest = lazy(() => import("./pages/AnalyticsTest"));

// Removed old ErrorBoundary component - now using enhanced version from components

// Query Client Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

// App Component - removed duplicate React.StrictMode
const App = () => {
  // Initialize performance monitoring
  usePerformanceMonitoring();
  
  // Track page load performance and monitor bundle size
  React.useEffect(() => {
    trackPageLoad();
    monitorBundleSize();
  }, []);

  return (
  <ErrorBoundary>
    <HelmetProvider>
      <SecurityHeaders />
      <SEOProvider>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}> 
            <WordPressProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter
                  future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                  }}
                >
                  <CartProvider>
                  <GoogleAnalytics />
                  <ClarityAnalytics />
                  <div className="flex flex-col min-h-screen">
                    <a href="#main-content" className="skip-link">
                      Skip to main content
                    </a>
                    <Navbar />
                    <main id="main-content" className="flex-grow">
                      <ErrorBoundary>
                        <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                            <Route path="/services" element={<ErrorBoundary><Services /></ErrorBoundary>} />
                            <Route path="/services-pricing" element={<ErrorBoundary><ServicesAndPricing /></ErrorBoundary>} />
                            <Route path="/portfolio" element={<ErrorBoundary><Portfolio /></ErrorBoundary>} />
                            <Route path="/blog" element={<ErrorBoundary><Blog /></ErrorBoundary>} />
                            <Route path="/blog/:id" element={<ErrorBoundary><BlogPostDetail /></ErrorBoundary>} />
                            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
                            <Route path="/app-building" element={<ErrorBoundary><AppBuilding /></ErrorBoundary>} />
                            <Route path="/case-study/:id" element={<ErrorBoundary><CaseStudy /></ErrorBoundary>} />
                            <Route path="/workflow-automation" element={<ErrorBoundary><WorkflowAutomation /></ErrorBoundary>} />
                            <Route path="/admin" element={<ErrorBoundary><Admin /></ErrorBoundary>} />
                            <Route path="/cart" element={<ErrorBoundary><Cart /></ErrorBoundary>} />
                            <Route path="/analytics-test" element={<ErrorBoundary><AnalyticsTest /></ErrorBoundary>} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </ErrorBoundary>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </CartProvider>
              </BrowserRouter>
            </TooltipProvider>
          </WordPressProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </SEOProvider>
  </HelmetProvider>
  </ErrorBoundary>
  );
};

export default App;
