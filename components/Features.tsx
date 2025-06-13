'use client';

import React from 'react';
import { Bot, Zap, Code, Palette, Settings, Shield } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';
import VanillaLiquidGlass from './VanillaLiquidGlass';

const features = [
  {
    icon: Bot,
    title: 'AI Recognition',
    description: 'Advanced computer vision technology automatically identifies UI elements and layout structures',
    gradient: 'gradient-bg-1',
    textGradient: 'text-gradient'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Complete complex UI liquid glass transformation in under 5 seconds',
    gradient: 'gradient-bg-2',
    textGradient: 'text-gradient-2'
  },
  {
    icon: Code,
    title: 'Multi-Framework',
    description: 'Export to React, Vue, Angular, CSS and multiple code formats',
    gradient: 'gradient-bg-3',
    textGradient: 'text-gradient-3'
  },
  {
    icon: Palette,
    title: 'Style Customization',
    description: 'Adjust transparency, blur, colors and other parameters to create unique styles',
    gradient: 'gradient-bg-1',
    textGradient: 'text-gradient'
  },
  {
    icon: Settings,
    title: 'Batch Processing',
    description: 'Process entire design systems at once while maintaining style consistency',
    gradient: 'gradient-bg-2',
    textGradient: 'text-gradient-2'
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'All processing completed in the cloud with automatic encryption protection',
    gradient: 'gradient-bg-3',
    textGradient: 'text-gradient-3'
  }
];

export default function Features() {

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Powerful Features</span>{' '}
            <span className="text-white">One-Click Transform</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            LiquidAI integrates cutting-edge AI technology to make UI transformation simpler and more efficient than ever before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <VanillaLiquidGlass
                key={index}
                width={400}
                height={320}
                borderRadius={20}
                draggable={false}
                fixed={false}
                className="mx-auto"
              >
                <div className="w-full h-full p-8 group flex flex-col">
                  <div className={`w-16 h-16 ${feature.gradient} glass-morphism rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 ${feature.textGradient}`}>
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed flex-1 mb-6">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-white/50 group-hover:text-white/80 transition-colors duration-300">
                    <span className="text-sm font-medium">Learn More</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </VanillaLiquidGlass>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="flex justify-center mt-16">
          <VanillaLiquidGlass 
            width={1024} 
            height={300} 
            borderRadius={24}
            draggable={false}
            fixed={false}
            className="max-w-4xl w-full"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Experience the Magic of AI?
              </h3>
              <p className="text-xl text-white/70 mb-8">
                Upload your first design or type your ideas and experience the liquid glass transformation for free
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                
                {/* Try It Now button */}
                <VanillaLiquidGlass 
                  width={160} 
                  height={52} 
                  borderRadius={26}
                  draggable={false}
                  fixed={false}
                  className="cursor-pointer"
                >
                  <a 
                    href="#transform"
                    className="w-full h-full flex items-center justify-center text-white font-semibold text-base transition-all duration-300"
                  >
                    Try It For Free!
                  </a>
                </VanillaLiquidGlass>
              </div>
            </div>
          </VanillaLiquidGlass>
        </div>
      </div>
    </section>
  );
}