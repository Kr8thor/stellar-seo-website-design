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
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AppBuilding from "./pages/AppBuilding";
import CaseStudy from "./pages/CaseStudy";
import WorkflowAutomation from "./pages/WorkflowAutomation";
import WhatsAppButton from "./components/common/WhatsAppButton";
import ServicesAndPricing from "./pages/ServicesAndPricing";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Billing from "./pages/Billing";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CartTest from "./pages/CartTest";
import AnalyticsTest from "./pages/AnalyticsTest";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're experiencing technical difficulties. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
const App = () => (
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
                    <Navbar />
                    <div className="flex-grow">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services-pricing" element={<ServicesAndPricing />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPostDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/app-building" element={<AppBuilding />} />
                        <Route path="/case-study/:id" element={<CaseStudy />} />
                        <Route path="/workflow-automation" element={<WorkflowAutomation />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                        <Route path="/billing" element={<Billing />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/refund-policy" element={<RefundPolicy />} />
                        <Route path="/analytics-test" element={<AnalyticsTest />} />
                        <Route path="/cart-test" element={<CartTest />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
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

export default App;
