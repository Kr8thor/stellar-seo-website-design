
import React from 'react';
import HeroSection from '@/components/about/HeroSection';
import ExpertiseSection from '@/components/about/ExpertiseSection';
import StorySection from '@/components/about/StorySection';
import ApproachSection from '@/components/about/ApproachSection';
import ServiceTeasers from '@/components/about/ServiceTeasers';
import CallToAction from '@/components/about/CallToAction';
import { useSEO, seoConfigs } from '@/hooks/useSEO';

const About = () => {
  // Add SEO for this page
  useSEO(seoConfigs.about);
  return (
    <main className="pt-24">
      <HeroSection />
      <ExpertiseSection />
      <StorySection />
      <ApproachSection />
      <ServiceTeasers />
      <CallToAction />
    </main>
  );
};

export default About;
