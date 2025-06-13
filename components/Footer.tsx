'use client';

import { Droplets, Github, Twitter, Linkedin } from 'lucide-react';
import VanillaLiquidGlass from './VanillaLiquidGlass';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <VanillaLiquidGlass 
          width={1152} 
          height={660} 
          borderRadius={24}
          draggable={false}
          fixed={false}
          className="max-w-full"
        >
          <div className="w-full h-full p-12 flex flex-col">
            {/* Top Grid with Columns */}
            <div className="grid lg:grid-cols-5 gap-8 mb-16">
              {/* Brand Column */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl flex items-center justify-center hover:scale-110 hover:bg-white/15 transition-all duration-300 cursor-pointer shadow-lg shadow-white/5" style={{boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.3), 0 4px 16px rgba(255,255,255,0.05)'}}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl"></div>
                    <Droplets 
                      className="w-6 h-6 transition-all duration-300 relative z-10 drop-shadow-sm" 
                      fill="currentColor" 
                      stroke="none" 
                      style={{
                        color: 'rgba(255, 255, 255, 0.35)',
                        filter: 'blur(0.2px)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)';
                        e.currentTarget.style.filter = 'blur(0px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.35)';
                        e.currentTarget.style.filter = 'blur(0.2px)';
                      }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">LiquidAI</span>
                </div>
                <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-md">
                  The future of design. Where liquid meets glass, and technology becomes art.
                </p>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <VanillaLiquidGlass
                        key={index}
                        width={40}
                        height={40}
                        borderRadius={12}
                        draggable={false}
                        fixed={false}
                        className="cursor-pointer"
                      >
                        <a
                          href={social.href}
                          className="w-full h-full flex items-center justify-center text-white/60 hover:text-white hover:scale-110 transition-all duration-300"
                          aria-label={social.label}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      </VanillaLiquidGlass>
                    );
                  })}
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-3">
                  {['Features', 'Innovation', 'Design', 'Security'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Developers Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Developers</h3>
                <ul className="space-y-3">
                  {['Documentation', 'API Reference', 'SDK', 'Community'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  {['About', 'Careers', 'Press', 'Contact'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Support</h3>
                <ul className="space-y-3">
                  {['Help Center', 'Guidelines', 'Privacy', 'Terms'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            

            {/* Flex Spacer */}
            <div className="flex-grow"></div>

            {/* Bottom */}
            <div className="border-t border-white/20 pt-10 mt-16">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/50 text-sm">
                  © 2025 LiquidAI. All rights reserved. Built with liquid glass technology.
                </p>
                <div className="flex items-center space-x-8 mt-4 md:mt-0">
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </VanillaLiquidGlass>

        {/* Final CTA */}
        <div className="text-center mt-8">
          <VanillaLiquidGlass 
            width={520} 
            height={48} 
            borderRadius={24}
            draggable={false}
            fixed={false}
            className="inline-block"
          >
            <div className="w-full h-full flex items-center justify-between px-4">
              <span className="text-white/80">Ready to experience the future?</span>
              <VanillaLiquidGlass 
                width={120} 
                height={36} 
                borderRadius={18}
                draggable={false}
                fixed={false}
                className="cursor-pointer"
              >
                <button className="w-full h-full flex items-center justify-center text-white font-semibold hover:scale-105 transition-transform duration-200 text-sm">
                  Get Started →
                </button>
              </VanillaLiquidGlass>
            </div>
          </VanillaLiquidGlass>
        </div>
      </div>
    </footer>
  );
}