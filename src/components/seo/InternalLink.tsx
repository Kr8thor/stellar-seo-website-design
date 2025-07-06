/**
 * Internal Link Component - SEO Optimized
 * Strategic internal linking with optimized anchor text
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  rel?: string;
  onClick?: () => void;
}

export const InternalLink: React.FC<InternalLinkProps> = ({
  to,
  children,
  className,
  title,
  rel,
  onClick
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-primary hover:text-primary/80 transition-colors duration-200",
        className
      )}
      title={title}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

// Pre-configured SEO links with optimized anchor text
export const SEOLinks = {
  services: {
    seo: (
      <InternalLink to="/services" title="Professional SEO Services">
        SEO services
      </InternalLink>
    ),
    appDevelopment: (
      <InternalLink to="/app-building" title="Custom React App Development">
        app development
      </InternalLink>
    ),
    workflowAutomation: (
      <InternalLink to="/workflow-automation" title="n8n Workflow Automation">
        workflow automation
      </InternalLink>
    ),
    consultation: (
      <InternalLink to="/contact" title="Free SEO Consultation">
        free consultation
      </InternalLink>
    )
  },
  pages: {
    home: (
      <InternalLink to="/" title="Marden SEO - Strategic SEO Solutions">
        home
      </InternalLink>
    ),
    about: (
      <InternalLink to="/about" title="About Our SEO & Development Team">
        about us
      </InternalLink>
    ),
    portfolio: (
      <InternalLink to="/portfolio" title="SEO Case Studies & Results">
        portfolio
      </InternalLink>
    ),
    blog: (
      <InternalLink to="/blog" title="SEO Tips & Industry Insights">
        blog
      </InternalLink>
    ),
    contact: (
      <InternalLink to="/contact" title="Contact Marden SEO">
        contact
      </InternalLink>
    )
  },
  cta: {
    getStarted: (
      <InternalLink 
        to="/contact" 
        title="Start Your SEO Journey Today"
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 inline-block font-semibold"
      >
        Get Started Today
      </InternalLink>
    ),
    learnMore: (
      <InternalLink to="/services" title="Learn More About Our SEO Services">
        Learn More
      </InternalLink>
    ),
    viewPortfolio: (
      <InternalLink to="/portfolio" title="View Our SEO Success Stories">
        View Our Work
      </InternalLink>
    )
  }
};

export default InternalLink;