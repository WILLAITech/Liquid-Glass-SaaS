'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';
import LiquidGlassCard from './LiquidGlassCard';
import VanillaLiquidGlass from './VanillaLiquidGlass';

export default function Showcase() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const demos = [
    {
      title: 'E-commerce Website Transform',
      before: 'Traditional Flat Design',
      after: 'Liquid Glass Effect',
      category: 'E-commerce'
    },
    {
      title: 'Mobile App Transform',
      before: 'Material Design',
      after: 'Liquid Glass Interface',
      category: 'Mobile App'
    },
    {
      title: 'Dashboard Transform',
      before: 'Standard Dashboard',
      after: 'Liquid Glass Dashboard',
      category: 'Dashboard'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, demos.length]);

  return (
    <section id="showcase" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Transform</span>{' '}
            <span className="text-gradient">Showcase</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Watch how our AI transforms ordinary interfaces into stunning liquid glass effects
          </p>
        </div>


        {/* Main Demo Area */}
        <VanillaLiquidGlass 
          width={1200} 
          height={600} 
          borderRadius={24}
          draggable={false}
          fixed={false}
          className="mb-12 mx-auto max-w-full"
        >
          <div className="w-full h-full p-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
              {/* Before */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <h3 className="text-xl font-semibold text-white">Before - Traditional Design</h3>
                </div>
                <div className="aspect-[4/3] bg-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
                  {/* Header */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                      <div className="text-xs text-gray-500">●●●</div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                      <div className="text-sm font-bold text-gray-800">1.2K</div>
                      <div className="text-xs text-gray-500">Users</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                      <div className="text-sm font-bold text-gray-800">85%</div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 text-center">
                      <div className="text-sm font-bold text-gray-800">42</div>
                      <div className="text-xs text-gray-500">Sales</div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium">
                    Get Started
                  </div>
                </div>
                <p className="text-white/60 text-sm">Traditional flat design - functional but lacks visual depth</p>
              </div>

              {/* After */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <h3 className="text-xl font-semibold text-white">After - Liquid Glass Enhanced</h3>
                </div>
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl p-6 relative overflow-hidden">
                  {/* Header with Real Liquid Glass - Exactly corresponds to the header on the left */}
                  <div className="mb-4">
                    <VanillaLiquidGlass 
                      width={500} 
                      height={100} 
                      borderRadius={12}
                      draggable={false}
                      fixed={false}
                      className="w-full"
                    >
                      <div className="w-full h-full p-4 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                          <div className="text-xs text-white/60">●●●</div>
                        </div>
                        <div className="h-3 bg-gradient-to-r from-white/60 to-white/30 rounded mb-2"></div>
                        <div className="h-2 bg-white/40 rounded w-3/4"></div>
                      </div>
                    </VanillaLiquidGlass>
                  </div>
                  
                  {/* Stats Cards with Real Liquid Glass - Exactly corresponds to the 3-column layout on the left */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <VanillaLiquidGlass 
                      width={160} 
                      height={70} 
                      borderRadius={8}
                      draggable={false}
                      fixed={false}
                      className="w-full"
                    >
                      <div className="w-full h-full p-3 text-center flex flex-col justify-center">
                        <div className="text-sm font-bold text-white">1.2K</div>
                        <div className="text-xs text-white/60">Users</div>
                      </div>
                    </VanillaLiquidGlass>
                    <VanillaLiquidGlass 
                      width={160} 
                      height={70} 
                      borderRadius={8}
                      draggable={false}
                      fixed={false}
                      className="w-full"
                    >
                      <div className="w-full h-full p-3 text-center flex flex-col justify-center">
                        <div className="text-sm font-bold text-white">85%</div>
                        <div className="text-xs text-white/60">Growth</div>
                      </div>
                    </VanillaLiquidGlass>
                    <VanillaLiquidGlass 
                      width={160} 
                      height={70} 
                      borderRadius={8}
                      draggable={false}
                      fixed={false}
                      className="w-full"
                    >
                      <div className="w-full h-full p-3 text-center flex flex-col justify-center">
                        <div className="text-sm font-bold text-white">42</div>
                        <div className="text-xs text-white/60">Sales</div>
                      </div>
                    </VanillaLiquidGlass>
                  </div>
                  
                  {/* Action Button with Real Liquid Glass - Exactly corresponds to the button on the left */}
                  <VanillaLiquidGlass 
                    width={500} 
                    height={40} 
                    borderRadius={12}
                    draggable={false}
                    fixed={false}
                    className="cursor-pointer w-full"
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500/40 to-purple-500/40 text-white text-sm font-medium">
                      Get Started
                    </div>
                  </VanillaLiquidGlass>
                  
                  {/* Ambient Effects */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                  <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce shadow-lg shadow-purple-400/50"></div>
                  <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-ping"></div>
                </div>
                <p className="text-white/60 text-sm">Liquid glass transformation - immersive depth and premium feel</p>
              </div>
            </div>

            {/* Arrow - Absolutely positioned in the center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block z-10">
              <VanillaLiquidGlass 
                width={64} 
                height={64} 
                borderRadius={32}
                draggable={false}
                fixed={false}
              >
                <div className="w-full h-full flex items-center justify-center gradient-bg-2">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
              </VanillaLiquidGlass>
            </div>
          </div>
        </VanillaLiquidGlass>

        {/* Demo Selector */}
        <div className="flex justify-center space-x-4">
          {demos.map((demo, index) => (
            <VanillaLiquidGlass
              key={index}
              width={120}
              height={44}
              borderRadius={22}
              draggable={false}
              fixed={false}
              className="cursor-pointer"
            >
              <button
                onClick={() => setActiveDemo(index)}
                className={`w-full h-full flex items-center justify-center font-medium transition-all duration-300 ${
                  activeDemo === index 
                    ? 'text-white scale-105' 
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {demo.category}
              </button>
            </VanillaLiquidGlass>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <VanillaLiquidGlass 
            width={200} 
            height={120} 
            borderRadius={16}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-2xl font-bold text-gradient mb-2">98%</div>
              <div className="text-white/60 text-sm">User Satisfaction</div>
            </div>
          </VanillaLiquidGlass>
          <VanillaLiquidGlass 
            width={200} 
            height={120} 
            borderRadius={16}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-2xl font-bold text-gradient-2 mb-2">3.2s</div>
              <div className="text-white/60 text-sm">Average Processing</div>
            </div>
          </VanillaLiquidGlass>
          <VanillaLiquidGlass 
            width={200} 
            height={120} 
            borderRadius={16}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-2xl font-bold text-gradient-3 mb-2">50+</div>
              <div className="text-white/60 text-sm">Supported Components</div>
            </div>
          </VanillaLiquidGlass>
          <VanillaLiquidGlass 
            width={200} 
            height={120} 
            borderRadius={16}
            draggable={false}
            fixed={false}
            className="mx-auto"
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div className="text-2xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-white/60 text-sm">Cloud Service</div>
            </div>
          </VanillaLiquidGlass>
        </div>
      </div>
    </section>
  );
}