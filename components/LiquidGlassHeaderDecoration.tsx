import React, { useRef, useEffect, useState, useCallback } from 'react';

// Utility functions
function smoothStep(a: number, b: number, t: number): number {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

function length(x: number, y: number): number {
  return Math.sqrt(x * x + y * y);
}

function generateId(): string {
  return 'liquid-header-' + Math.random().toString(36).substr(2, 9);
}

interface LiquidGlassHeaderDecorationProps {
  width?: number;
  height?: number;
  intensity?: number; // Distortion intensity 0-1
  opacity?: number; // Opacity 0-1
  className?: string;
  style?: React.CSSProperties;
}

const LiquidGlassHeaderDecoration: React.FC<LiquidGlassHeaderDecorationProps> = ({
  width = 200,
  height = 60,
  intensity = 0.3,
  opacity = 0.1,
  className = '',
  style
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const [id] = useState(generateId);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const canvasDPI = 1;

  // Create header-specific fragment shader
  const headerFragment = useCallback((uv: { x: number; y: number }, mouse: { x: number; y: number }) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;

    // Subtle mouse following effect
    const mouseInfluence = 0.05 * intensity;
    const mouseX = (mouse.x - 0.5) * mouseInfluence;
    const mouseY = (mouse.y - 0.5) * mouseInfluence;

    // Time-driven wave effect
    const time = Date.now() * 0.001;
    const wave1 = Math.sin(time * 0.8 + ix * 3) * 0.008 * intensity;
    const wave2 = Math.cos(time * 1.2 + iy * 4) * 0.006 * intensity;

    // Radial gradient effect
    const dist = Math.sqrt(ix * ix + iy * iy);
    const radial = smoothStep(0.5, 0, dist) * 0.02 * intensity;

    return {
      type: 't' as const,
      x: ix + mouseX + wave1 + radial + 0.5,
      y: iy + mouseY + wave2 + radial + 0.5
    };
  }, [intensity]);

  // Update shader
  const updateShader = useCallback(() => {
    const canvas = canvasRef.current;
    const feImage = feImageRef.current;
    const feDisplacementMap = feDisplacementMapRef.current;
    
    if (!canvas || !feImage || !feDisplacementMap) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const w = width * canvasDPI;
    const h = height * canvasDPI;
    const data = new Uint8ClampedArray(w * h * 4);

    let maxScale = 0;
    const rawValues: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = headerFragment(
        { x: x / w, y: y / h },
        mouse
      );
      const dx = pos.x * w - x;
      const dy = pos.y * h - y;
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;

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
    feDisplacementMap.setAttribute('scale', (maxScale / canvasDPI).toString());
  }, [mouse, width, height, canvasDPI, headerFragment]);

  // Mouse event handling
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    setMouse({ x: mouseX, y: mouseY });
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width * canvasDPI;
      canvas.height = height * canvasDPI;
    }
  }, [width, height, canvasDPI]);

  // Update shader
  useEffect(() => {
    updateShader();
  }, [updateShader]);

  // Periodically update to create animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      updateShader();
    }, 100); // Update every 100ms

    return () => clearInterval(interval);
  }, [updateShader]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    width: `${width}px`,
    height: `${height}px`,
    opacity,
    backdropFilter: `url(#${id}_filter) blur(2px) brightness(1.1)`,
    pointerEvents: 'none',
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
      {/* SVG filter */}
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
            width={width}
            height={height}
          >
            <feImage
              ref={feImageRef}
              id={`${id}_map`}
              width={width}
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

      {/* Decoration container */}
      <div
        ref={containerRef}
        className={`absolute ${className}`}
        style={containerStyle}
        onMouseMove={handleMouseMove}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-blue-500/5 to-purple-500/10 rounded-lg" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-lg" />
      </div>

      {/* Hidden canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default LiquidGlassHeaderDecoration; 