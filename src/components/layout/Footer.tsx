
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-2xl mb-4">SEO Expert</h3>
            <p className="text-muted-foreground mb-6">
              Elevating your digital presence with data-driven SEO strategies that generate real results.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-foreground hover:text-accent-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-foreground hover:text-accent-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-foreground hover:text-accent-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
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
              <Link to="/contact" className="hover:underline text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p className="mb-1">123 SEO Street</p>
              <p className="mb-1">Digital City, DC 12345</p>
              <p className="mb-3">United States</p>
              <p className="mb-1">
                <a href="mailto:hello@seoexpert.com" className="hover:underline hover:text-foreground transition-colors">
                  hello@seoexpert.com
                </a>
              </p>
              <p>
                <a href="tel:+11234567890" className="hover:underline hover:text-foreground transition-colors">
                  +1 (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SEO Expert. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
