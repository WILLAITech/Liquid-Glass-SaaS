'use client';

import { useState, useEffect } from 'react';
import { Droplets, Menu, X } from 'lucide-react';
import VanillaLiquidGlass from './VanillaLiquidGlass';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#showcase' },
    { name: 'Transform & Generate', href: '#transform' },
    { name: 'Docs', href: '#docs' }
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        position: 'fixed',
        top: 0,
        width: '100%'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <VanillaLiquidGlass 
          width={Math.min(typeof window !== 'undefined' ? window.innerWidth - 32 : 1200, 1200)} 
          height={64} 
          borderRadius={32}
          draggable={false}
          fixed={false}
          className="w-full"
        >
          <nav className="w-full h-full relative">
            <div className="flex items-center justify-between h-16 px-6">

              {/* Logo */}
              <div className="flex items-center space-x-2">
                <VanillaLiquidGlass 
                  width={32} 
                  height={32} 
                  borderRadius={8}
                  draggable={false}
                  fixed={false}
                  className="cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Droplets 
                      className="w-5 h-5 transition-all duration-300 drop-shadow-sm" 
                      fill="currentColor" 
                      stroke="none" 
                      style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))'
                      }}
                    />
                  </div>
                </VanillaLiquidGlass>
                <span 
                  className="text-xl font-bold text-white cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{
                    textShadow: '0 0 8px rgba(59, 130, 246, 0.4), 0 0 16px rgba(147, 51, 234, 0.3)',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                  }}
                >
                  LiquidAI
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* CTA Button with Vanilla Liquid Glass Effect */}
              <div className="hidden md:block relative">
                <VanillaLiquidGlass 
                  width={160} 
                  height={44} 
                  borderRadius={22}
                  draggable={false}
                  fixed={false}
                  className="cursor-pointer"
                >
                  <button
                    className="w-full h-full flex items-center justify-center text-white font-medium text-sm hover:text-white/90 transition-colors duration-200"
                    onClick={() => {
                      // Handle button click event
                      console.log('Experience Now clicked');
                      // Can add page navigation or other interaction logic
                    }}
                  >
                    Experience Now
                  </button>
                </VanillaLiquidGlass>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </VanillaLiquidGlass>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <VanillaLiquidGlass 
            width={Math.min(typeof window !== 'undefined' ? window.innerWidth - 32 : 400, 400)} 
            height={240} 
            borderRadius={16}
            draggable={false}
            fixed={false}
            className="mt-2"
          >
            <div className="w-full h-full p-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <VanillaLiquidGlass 
                  width={200} 
                  height={40} 
                  borderRadius={20}
                  draggable={false}
                  fixed={false}
                  className="cursor-pointer mx-auto"
                >
                  <button
                    className="w-full h-full flex items-center justify-center text-white font-medium text-sm hover:text-white/90 transition-colors duration-200"
                    onClick={() => {
                      // Handle mobile button click event
                      console.log('Mobile Experience Now clicked');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Experience Now
                  </button>
                </VanillaLiquidGlass>
              </div>
            </div>
          </VanillaLiquidGlass>
        )}
      </div>
    </header>
  );
}