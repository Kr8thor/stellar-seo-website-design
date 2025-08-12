import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Phone, MapPin } from 'lucide-react';
import CalendlyButton from '@/components/common/CalendlyButton';

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img alt="Marden SEO Logo" className="h-8 w-8" src="/lovable-uploads/e9f1c2da-1a67-40f7-834f-3329774e4abb.png" />
              <h3 className="font-heading text-2xl">Marden SEO</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Elevating your digital presence with data-driven SEO strategies and custom application development.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Kr8thor" className="text-foreground hover:text-accent-foreground transition-colors" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:hello@mardenseo.com" className="text-foreground hover:text-accent-foreground transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg mb-4">Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/services" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">SEO Services</Link>
              <Link to="/services-pricing" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">SEO Packages</Link>
              <Link to="/app-building" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">App Development</Link>
              <Link to="/workflow-automation" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Workflow Automation</Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-lg mb-4">Company</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/about" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
              <Link to="/portfolio" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
              <Link to="/blog" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">SEO Blog</Link>
              <Link to="/contact" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Contact & Meeting */}
          <div>
            <h4 className="font-heading text-lg mb-4">Get Started</h4>
            <p className="text-muted-foreground mb-4">Ready to boost your rankings? Schedule a free SEO consultation.</p>
            <CalendlyButton 
              calendlyUrl={import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/marden-seo/30min'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
            >
              Free SEO Audit
            </CalendlyButton>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@mardenseo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Professional Services</span>
              </div>
            </div>
          </div>
        </div>


        {/* Legal & Business Information */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Business Information</h4>
              <p>Marden SEO, LLC</p>
              <p>Wyoming Registered Entity</p>
              <p>Professional SEO & Development Services</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Contact</h4>
              <p>Email: hello@mardenseo.com</p>
              <p>Business Hours: Mon-Fri 9AM-6PM MST</p>
              <p>Response Time: Within 24 hours</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Legal</h4>
              <Link to="/privacy-policy" className="block hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="block hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/refund-policy" className="block hover:text-foreground transition-colors">Refund Policy</Link>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Resources</h4>
              <Link to="/blog" className="block hover:text-foreground transition-colors">SEO Blog</Link>
              <Link to="/portfolio" className="block hover:text-foreground transition-colors">Case Studies</Link>
              <Link to="/services-pricing" className="block hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Marden SEO, LLC. All rights reserved. | Wyoming Registered Entity | Professional SEO Services</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;