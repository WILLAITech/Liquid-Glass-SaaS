import React, { useRef, useEffect, useState, useCallback } from 'react';

// Utility functions - copied from LiquidGlass component
function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function roundedRectSDF(x: number, y: number, width: number, height: number, radius: number): number {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
}

function texture(x: number, y: number): { type: 't'; x: number; y: number } {
  return { type: 't', x, y };
}

function generateId(): string {
  return 'liquid-glass-btn-' + Math.random().toString(36).substr(2, 9);
}

// Type definitions
interface UV {
  x: number;
  y: number;
}

interface Mouse {
  x: number;
  y: number;
}

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  autoWidth?: boolean; // New: whether to automatically adjust width
}

const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  onClick,
  className = '',
  style,
  disabled = false,
  variant = 'primary',
  size = 'md',
  autoWidth = false
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const [id] = useState(generateId);
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const mouseUsedRef = useRef(false);
  const canvasDPI = 1;

  // Set button size based on size prop
  const sizeConfig = {
    sm: { width: 120, height: 32, padding: 'px-4 py-1.5', fontSize: 'text-sm' },
    md: { width: 160, height: 40, padding: 'px-6 py-2', fontSize: 'text-base' },
    lg: { width: 180, height: 48, padding: 'px-8 py-3', fontSize: 'text-lg' }
  };

  const { width: baseWidth, height } = sizeConfig[size];
  
  // If auto width is enabled, use wider base width
  const width = autoWidth ? Math.max(baseWidth, 200) : baseWidth;

  // Button fragment shader
  const buttonFragment = useCallback((uv: UV, mouse: Mouse) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;

    // Mouse influence strength
    const mouseInfluence = isHovered ? 0.08 : 0.03;
    const mouseX = (mouse.x - 0.5) * mouseInfluence;
    const mouseY = (mouse.y - 0.5) * mouseInfluence;

    // Button shape SDF (more suitable rounded rectangle for buttons)
    const distanceToEdge = roundedRectSDF(ix, iy, 0.45, 0.35, 0.4);
    const displacement = smoothStep(0.1, -0.1, distanceToEdge);
    const scaled = smoothStep(0, 1, displacement * 0.5);

    // Add subtle ripple effect
    const time = Date.now() * 0.002;
    const ripple = Math.sin(time + Math.sqrt(ix * ix + iy * iy) * 8) * 0.005;

    return texture(
      ix * (1 - scaled * 0.3) + mouseX + ripple + 0.5,
      iy * (1 - scaled * 0.3) + mouseY + ripple + 0.5
    );
  }, [isHovered]);

  // Update shader
  const updateShader = useCallback(() => {
    const canvas = canvasRef.current;
    const feImage = feImageRef.current;
    const feDisplacementMap = feDisplacementMapRef.current;
    const button = buttonRef.current;
    
    if (!canvas || !feImage || !feDisplacementMap || !button) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Get actual button width
    const actualWidth = autoWidth ? button.offsetWidth : width;
    const actualHeight = height;

    const mouseProxy = new Proxy(mouse, {
      get: (target, prop) => {
        mouseUsedRef.current = true;
        return target[prop as keyof Mouse];
      }
    });

    mouseUsedRef.current = false;

    const w = actualWidth * canvasDPI;
    const h = actualHeight * canvasDPI;
    const data = new Uint8ClampedArray(w * h * 4);

    let maxScale = 0;
    const rawValues: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = buttonFragment(
        { x: x / w, y: y / h },
        mouseProxy
      );
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.8; // Reduce distortion intensity, more suitable for buttons

    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    context.putImageData(new ImageData(data, w, h), 0, 0);
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvas.toDataURL());
    feImage.setAttribute('width', actualWidth.toString());
    feImage.setAttribute('height', actualHeight.toString());
    feDisplacementMap.setAttribute('scale', (maxScale / canvasDPI).toString());
  }, [mouse, width, height, canvasDPI, buttonFragment]);

  // Mouse event handling
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    setMouse({ x: mouseX, y: mouseY });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMouse({ x: 0.5, y: 0.5 }); // Reset to center
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (canvas && button) {
      const actualWidth = autoWidth ? button.offsetWidth : width;
      canvas.width = actualWidth * canvasDPI;
      canvas.height = height * canvasDPI;
    }
  }, [width, height, canvasDPI, autoWidth]);

  // Listen for button size change (only in autoWidth mode)
  useEffect(() => {
    if (!autoWidth) return;

    const button = buttonRef.current;
    if (!button) return;

    const resizeObserver = new ResizeObserver(() => {
      updateShader();
    });

    resizeObserver.observe(button);

    return () => {
      resizeObserver.disconnect();
    };
  }, [autoWidth, updateShader]);

  // Update shader
  useEffect(() => {
    updateShader();
  }, [updateShader]);

  // Update shader when mouse is used
  useEffect(() => {
    if (mouseUsedRef.current) {
      updateShader();
    }
  }, [mouse, updateShader]);

  // Variant styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/30 text-white hover:from-blue-400/30 hover:to-purple-400/30',
    secondary: 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'
  };

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    width: autoWidth ? 'auto' : `${width}px`,
    minWidth: autoWidth ? `${width}px` : undefined,
    height: `${height}px`,
    backdropFilter: `url(#${id}_filter) blur(8px) contrast(1.1) brightness(1.1) saturate(1.2)`,
    ...style
  };

  const svgStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: -1,
    width: 0,
    height: 0
  };

  return (
    <>
      {/* SVG Filter */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        <defs>
          <filter
            id={`${id}_filter`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={autoWidth ? "300" : width}
            height={height}
          >
            <feImage
              ref={feImageRef}
              id={`${id}_map`}
              width={autoWidth ? "300" : width}
              height={height}
            />
            <feDisplacementMap
              ref={feDisplacementMapRef}
              in="SourceGraphic"
              in2={`${id}_map`}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Button */}
      <button
        ref={buttonRef}
        className={`
          ${sizeConfig[size].padding} ${sizeConfig[size].fontSize}
          rounded-full font-medium transition-all duration-300
          border backdrop-blur-sm
          ${variantStyles[variant]}
          ${isHovered ? 'scale-105 shadow-lg shadow-white/10' : 'scale-100'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl hover:shadow-white/5'}
          relative overflow-hidden
          ${className}
        `}
        style={buttonStyle}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
      >
        {/* Internal glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
        
        {/* Additional glow effect when hovered */}
        {isHovered && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none animate-pulse" />
        )}
        
        {/* Button content */}
        <span className="relative z-10 drop-shadow-sm">
          {children}
        </span>
      </button>

      {/* Hidden canvas for generating displacement map */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default LiquidGlassButton; 