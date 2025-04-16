
// src/App.js or src/App.tsx

// --- Imports ---
import { ApolloProvider } from '@apollo/client';       // <-- Import ApolloProvider
import { client } from '../lib/apolloClient';         // <-- Fixed import path here
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";     // <-- Adjusted path assuming App.js is in src
import Footer from "./components/layout/Footer";     // <-- Adjusted path
import Home from "./pages/Home";                     // <-- Adjusted path
import About from "./pages/About";                   // <-- Adjusted path
import Services from "./pages/Services";               // <-- Adjusted path
import Portfolio from "./pages/Portfolio";             // <-- Adjusted path
import Blog from "./pages/Blog";                     // <-- Adjusted path
import BlogPostDetail from "./pages/BlogPostDetail";     // <-- Adjusted path
import Contact from "./pages/Contact";                 // <-- Adjusted path
import NotFound from "./pages/NotFound";               // <-- Adjusted path
import AppBuilding from "./pages/AppBuilding";           // <-- Adjusted path
import CaseStudy from "./pages/CaseStudy";             // <-- Adjusted path

// --- Query Client Setup ---
const queryClient = new QueryClient();

// --- App Component ---
const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}> {/* <--- ADD APOLLO PROVIDER HERE */}
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
      </ApolloProvider> {/* <--- CLOSE APOLLO PROVIDER HERE */}
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
