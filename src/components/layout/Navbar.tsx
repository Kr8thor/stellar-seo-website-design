import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <img alt="Marden SEO Logo" className="h-8 w-8 transition-transform group-hover:scale-110" src="/lovable-uploads/6bc582ad-ebe9-4438-9f37-6881cbeb14ec.png" />
          <span className="font-heading text-2xl font-medium">Marden SEO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover-underline text-sm uppercase tracking-wider">Home</Link>
          <Link to="/about" className="hover-underline text-sm uppercase tracking-wider">About</Link>
          <Link to="/services" className="hover-underline text-sm uppercase tracking-wider">Services</Link>
          <Link to="/workflow-automation" className="hover-underline text-sm uppercase tracking-wider">Workflow Automation</Link>
          <Link to="/portfolio" className="hover-underline text-sm uppercase tracking-wider">Portfolio</Link>
          <Link to="/blog" className="hover-underline text-sm uppercase tracking-wider">Blog</Link>
          <Link to="/app-building" className="hover-underline text-sm uppercase tracking-wider">App Building</Link>
          <Link to="/contact" className="hover-underline text-sm uppercase tracking-wider">Contact</Link>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Menu - ensuring solid white background regardless of scroll state */}
        <div className={`fixed inset-0 bg-white z-50 transition-transform transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <div className="container mx-auto px-4 py-4 flex flex-col h-full bg-white">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                <img src="/lovable-uploads/a103d7ea-fa9e-4582-9d36-828eb4472ece.png" alt="Marden SEO Logo" className="h-8 w-8" />
                <span className="font-heading text-2xl font-medium">Marden SEO</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-8 items-center justify-center flex-1 bg-white">
              <Link to="/" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/services" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link to="/workflow-automation" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Workflow Automation</Link>
              <Link to="/portfolio" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
              <Link to="/blog" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/app-building" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>App Building</Link>
              <Link to="/contact" className="font-heading text-2xl text-gray-800" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;