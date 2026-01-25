import React from 'react';
import Hero from '../components/Hero';
import CosmicVisualization from '../components/CosmicVisualization';
import FrequencyEnergySection from '../components/FrequencyEnergySection';
import BlogSection from '../components/BlogSection';
import Testimonials from '../components/Testimonials';
import ClinicalStats from '../components/ClinicalStats';
import ProductList from '../components/ProductList';
import AppSection from '../components/AppSection';
import AIAssistant from '../components/AIAssistant';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-praana-dark">
      <Hero />
      <CosmicVisualization />
      <FrequencyEnergySection />
      <BlogSection />
      <Testimonials />
      <ClinicalStats />
      <ProductList />
      <AppSection />
      <AIAssistant />
    </div>
  );
};

export default Home;