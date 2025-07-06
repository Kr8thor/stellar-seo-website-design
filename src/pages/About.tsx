
import React from 'react';
import HeroSection from '@/components/about/HeroSection';
import ExpertiseSection from '@/components/about/ExpertiseSection';
import StorySection from '@/components/about/StorySection';
import ApproachSection from '@/components/about/ApproachSection';
import ServiceTeasers from '@/components/about/ServiceTeasers';
import { FAQSection } from '@/components/about/FAQ';
import CallToAction from '@/components/about/CallToAction';
import { useSEO, getEnhancedSEOConfig } from '@/hooks/useSEO';

const About = () => {
  // Add enhanced SEO for about page with breadcrumb schema
  useSEO(getEnhancedSEOConfig('about'));
  return (
    <main className="pt-24">
      <HeroSection />
      <ExpertiseSection />
      <StorySection />
      <ApproachSection />
      <ServiceTeasers />
      <FAQSection />
      <CallToAction />
    </main>
  );
};

export default About;
