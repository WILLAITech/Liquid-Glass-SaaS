'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Showcase from '@/components/Showcase';
import Transform from '@/components/Transform';
import Footer from '@/components/Footer';
import LiquidGlassBackground from '@/components/LiquidGlassBackground';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen relative overflow-hidden pt-16">
      {/* Liquid glass background */}
      <LiquidGlassBackground 
        primaryColor="rgba(130, 100, 255, 0.4)"
        secondaryColor="rgba(80, 200, 255, 0.3)"
        blurAmount={40}
        speed={0.005}
      />

      <Header />
      <Hero />
      <Features />
      <Showcase />
      <Transform />
      <Footer />
    </main>
  );
}