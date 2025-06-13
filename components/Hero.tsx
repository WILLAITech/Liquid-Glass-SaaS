'use client';

import React from 'react';
import { ChevronDown, Sparkles, Zap, Wand2, Upload, Download } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';
import VanillaLiquidGlass from './VanillaLiquidGlass';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main content */}
        <div>
          <div className="flex justify-center mb-8">
            <VanillaLiquidGlass 
              width={400} 
              height={40} 
              borderRadius={20}
              draggable={false}
              fixed={false}
            >
              <div className="w-full h-full flex items-center justify-center px-4 py-2 whitespace-nowrap">
                <Wand2 className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                <span className="text-white/80 text-sm font-medium">AI-Powered UI Transformation & Generator</span>
              </div>
            </VanillaLiquidGlass>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gradient block mb-1">Transform Any UI Design</span>
            <span className="text-gradient-2 block mb-1">Or Generate Your Ideas</span>
            <span className="text-white block">Into Liquid Glass Style</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/70 mb-14 max-w-4xl mx-auto leading-relaxed">
            Upload your design or type your ideas and watch our AI instantly convert it into stunning liquid glass aesthetics. 
            No coding required, no design skills needed - just pure magic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* Upload Your Design button - Primary CTA */}
            <VanillaLiquidGlass 
              width={340} 
              height={52} 
              borderRadius={26}
              draggable={false}
              fixed={false}
              className="cursor-pointer w-full sm:w-auto max-w-md"
            >
              <a 
                href="#transform"
                className="w-full h-full flex items-center justify-center text-white font-semibold text-base transition-all duration-300 px-4 py-2 text-sm sm:text-base"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="whitespace-nowrap">Upload Your Design Or Type Your Ideas</span>
              </a>
            </VanillaLiquidGlass>
            
            {/* See Live Demo button - Secondary CTA */}
            <VanillaLiquidGlass 
              width={180} 
              height={52} 
              borderRadius={26}
              draggable={false}
              fixed={false}
              className="cursor-pointer w-full sm:w-auto max-w-xs"
            >
              <a 
                href="#showcase"
                className="w-full h-full flex items-center justify-center text-white font-semibold text-base transition-all duration-300 px-4 py-2 text-sm sm:text-base"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                Showcase
              </a>
            </VanillaLiquidGlass>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <VanillaLiquidGlass 
              width={320} 
              height={120} 
              borderRadius={16}
              draggable={false}
              fixed={false}
              className="mx-auto"
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl font-bold text-gradient mb-2">10,000+</div>
                <div className="text-white/70">UI Conversions</div>
              </div>
            </VanillaLiquidGlass>
            <VanillaLiquidGlass 
              width={320} 
              height={120} 
              borderRadius={16}
              draggable={false}
              fixed={false}
              className="mx-auto"
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl font-bold text-gradient-2 mb-2">5 Sec</div>
                <div className="text-white/70">Average Processing</div>
              </div>
            </VanillaLiquidGlass>
            <VanillaLiquidGlass 
              width={320} 
              height={120} 
              borderRadius={16}
              draggable={false}
              fixed={false}
              className="mx-auto"
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div className="text-3xl font-bold text-gradient-3 mb-2">98.7%</div>
                <div className="text-white/70">Accuracy Rate</div>
              </div>
            </VanillaLiquidGlass>
          </div>
        </div>

        {/* Process visualization */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <VanillaLiquidGlass 
            width={400} 
            height={240} 
            borderRadius={20}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 group">
              <div className="w-12 h-12 gradient-bg-1 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300 glass-morphism">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">1. Upload Design</h3>
              <p className="text-white/70">Support for Figma, Sketch, Adobe XD, or any image format</p>
            </div>
          </VanillaLiquidGlass>

          <VanillaLiquidGlass 
            width={400} 
            height={240} 
            borderRadius={20}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 group">
              <div className="w-12 h-12 gradient-bg-2 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300 glass-morphism">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">2. AI Analysis</h3>
              <p className="text-white/70">Automatically identify elements and apply liquid glass effects</p>
            </div>
          </VanillaLiquidGlass>

          <VanillaLiquidGlass 
            width={400} 
            height={240} 
            borderRadius={20}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 group">
              <div className="w-12 h-12 gradient-bg-3 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300 glass-morphism">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Export Code</h3>
              <p className="text-white/70">Get complete CSS/React/Vue code, ready to use instantly</p>
            </div>
          </VanillaLiquidGlass>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <VanillaLiquidGlass 
            width={48} 
            height={48} 
            borderRadius={24}
            draggable={false}
            fixed={false}
            className="cursor-pointer"
          >
            <div className="w-full h-full flex items-center justify-center">
              <ChevronDown className="w-6 h-6 text-white/60" />
            </div>
          </VanillaLiquidGlass>
        </div>
      </div>
    </section>
  );
}