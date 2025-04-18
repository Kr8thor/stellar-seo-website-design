
// src/App.js or src/App.tsx

// --- Imports ---
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apolloClient';
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WordPressProvider } from "./providers/WordPressProvider";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
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

// --- Query Client Setup ---
const queryClient = new QueryClient();

// --- App Component ---
const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}> 
        <WordPressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPostDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/app-building" element={<AppBuilding />} />
                    <Route path="/case-study/:id" element={<CaseStudy />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </WordPressProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
