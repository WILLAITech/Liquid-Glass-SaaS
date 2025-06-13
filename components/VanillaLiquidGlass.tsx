'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VanillaLiquidGlassProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  scale?: number;
  children?: React.ReactNode;
  className?: string;
  draggable?: boolean; // Controls whether it can be dragged
  fixed?: boolean; // Controls whether to use fixed positioning
}

// Utility functions - migrated from vanilla JS
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

function texture(x: number, y: number) {
  return { x, y };
}

export default function VanillaLiquidGlass({
  width = 300,
  height = 200,
  borderRadius = 150,
  scale = 1,
  children,
  className = '',
  draggable = true,
  fixed = true
}: VanillaLiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [filterId] = useState(() => `liquid-glass-${Math.random().toString(36).substr(2, 9)}`);
  
  const canvasDPI = 1;
  const offset = 10;

  // Constrain position within viewport boundaries
  const constrainPosition = (x: number, y: number) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const minX = offset;
    const maxX = viewportWidth - width - offset;
    const minY = offset;
    const maxY = viewportHeight - height - offset;
    
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y))
    };
  };

  // Update shader - core logic migrated from vanilla JS
  const updateShader = () => {
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

    // Fragment shader logic
    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      
      const uv = { x: x / w, y: y / h };
      
      // Liquid glass deformation logic
      const ix = uv.x - 0.5;
      const iy = uv.y - 0.5;
      
      const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
      const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
      const scaled = smoothStep(0, 1, displacement);
      
      const result = texture(ix * scaled + 0.5, iy * scaled + 0.5);
      
      const dx = result.x * w - x;
      const dy = result.y * h - y;
      
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
      rawValues.push(dx, dy);
    }

    maxScale *= 0.5;

    // Generate displacement map data
    let index = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = rawValues[index++] / maxScale + 0.5;
      const g = rawValues[index++] / maxScale + 0.5;
      data[i] = r * 255;
      data[i + 1] = g * 255;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }

    // Update Canvas and SVG filter
    context.putImageData(new ImageData(data, w, h), 0, 0);
    feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', canvas.toDataURL());
    feDisplacementMap.setAttribute('scale', (maxScale / canvasDPI).toString());
  };

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (draggable) {
      setIsDragging(true);
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && draggable && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newX = e.clientX - width / 2;
        const newY = e.clientY - height / 2;
        
        const constrained = constrainPosition(newX, newY);
        setPosition(constrained);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging && draggable) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggable, width, height]);

  // Initialize and update shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width * canvasDPI;
      canvas.height = height * canvasDPI;
    }
    
    updateShader();
  }, [width, height, mouse]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (draggable && fixed) {
        const constrained = constrainPosition(position.x, position.y);
        if (position.x !== constrained.x || position.y !== constrained.y) {
          setPosition(constrained);
        }
      }
    };

    if (draggable && fixed) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [position, draggable, fixed]);

  return (
    <>
      {/* SVG filter definition */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998
        }}
      >
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x="0"
            y="0"
            width={width}
            height={height}
          >
            <feImage
              ref={feImageRef}
              id={`${filterId}_map`}
              width={width}
              height={height}
            />
            <feDisplacementMap
              ref={feDisplacementMapRef}
              in="SourceGraphic"
              in2={`${filterId}_map`}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Hidden Canvas used to generate displacement map */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />

      {/* Liquid glass container */}
      <div
        ref={containerRef}
        className={`${fixed ? 'fixed' : 'relative'} ${className}`}
        style={{
          ...(fixed && draggable ? {
            left: position.x || '50%',
            top: position.y || '50%',
            transform: position.x ? 'none' : 'translate(-50%, -50%)',
          } : {}),
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
          backdropFilter: `url(#${filterId}) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`,
          boxShadow: `
            0 4px 8px rgba(0, 0, 0, 0.25),
            0 -10px 25px inset rgba(0, 0, 0, 0.15)
          `,
          zIndex: fixed ? 9999 : 'auto',
          pointerEvents: 'auto'
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      >
        {children && (
          <div className="w-full h-full text-white font-medium">
            {children}
          </div>
        )}
      </div>
    </>
  );
} 