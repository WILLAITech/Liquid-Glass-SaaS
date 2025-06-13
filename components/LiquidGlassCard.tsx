import React, { useState } from 'react';
import LiquidGlassHeaderDecoration from './LiquidGlassHeaderDecoration';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'stats' | 'feature' | 'showcase';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  intensity?: number;
  showEffect?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  animated = false,
  intensity = 0.3,
  showEffect = true,
  onClick,
  style
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Size configuration
  const sizeConfig = {
    sm: { width: 200, height: 120, padding: 'p-4' },
    md: { width: 320, height: 180, padding: 'p-6' },
    lg: { width: 400, height: 240, padding: 'p-8' }
  };

  // Variant styles
  const variantStyles = {
    default: 'bg-white/10 border-white/20',
    stats: 'bg-gradient-to-br from-white/15 to-white/5 border-white/30',
    feature: 'bg-gradient-to-bl from-blue-500/10 via-white/10 to-purple-500/10 border-white/25',
    showcase: 'bg-gradient-to-tr from-purple-500/10 via-white/10 to-pink-500/10 border-white/25'
  };

  const { width, height, padding } = sizeConfig[size];
  const baseClasses = `
    relative backdrop-blur-xl rounded-2xl border transition-all duration-300 
    cursor-pointer overflow-hidden group hover:scale-105
    ${variantStyles[variant]}
    ${padding}
    ${animated ? 'liquid-float' : ''}
    ${className}
  `.trim();

  const cardStyle = {
    boxShadow: isHovered 
      ? '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
      : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    ...style
  };

  return (
    <div 
      className={baseClasses}
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-50" />
      
      {/* Liquid glass effect */}
      {showEffect && (
        <LiquidGlassHeaderDecoration
          width={width}
          height={height}
          intensity={isHovered ? intensity * 1.5 : intensity}
          opacity={isHovered ? 0.4 : 0.2}
          className="inset-0 rounded-2xl"
          style={{ 
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Pulse effect on hover */}
      <div className={`absolute inset-0 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isHovered ? 'animate-pulse' : ''
      }`} />

      {/* Content area */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default LiquidGlassCard; 