
import React from 'react';
import Hero from './Hero';
import PartnersSection from './PartnersSection';
import AboutSection from './AboutSection';
import CTASection from './CTASection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <PartnersSection />
      <AboutSection />
      <CTASection />
    </>
  );
};

export default HomePage;
