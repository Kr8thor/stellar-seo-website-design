import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code, Palette, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Debug: Check if plugin attributes are being added
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Checking for data-lov attributes in navbar...');
      const elementsWithLovData = document.querySelectorAll('[data-lov-id]');
      console.log('Found elements with data-lov-id:', elementsWithLovData.length);
    }
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center font-bold text-lg md:text-2xl">
          {/* You can replace this with your logo */}
          YourBrand
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                isActive(item.href) ? 'text-primary font-semibold' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 py-2">
          <div className="flex flex-col items-center space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-700 hover:text-primary transition-colors duration-200 ${
                  isActive(item.href) ? 'text-primary font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="secondary">
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
