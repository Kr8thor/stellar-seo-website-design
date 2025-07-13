import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import CalendlyButton from '@/components/common/CalendlyButton';
const Footer = () => {
  return <footer className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/about" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/services" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Services</Link>
              <Link to="/portfolio" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link>
              <Link to="/blog" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <Link to="/app-building" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">App Building</Link>
              <Link to="/contact" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Book a Meeting</h4>
            <p className="text-muted-foreground mb-4">Ready to discuss your project? Schedule a free consultation.</p>
            <CalendlyButton 
              calendlyUrl={import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/marden-seo/30min'}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Schedule Meeting
            </CalendlyButton>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Marden SEO. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;