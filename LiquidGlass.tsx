import React, { useRef, useEffect, useState, useCallback } from 'react';

// Utility functions
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

// Generate unique ID
function generateId(): string {
  return 'liquid-glass-' + Math.random().toString(36).substr(2, 9);
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

interface Position {
  x: number;
  y: number;
}

interface LiquidGlassProps {
  width?: number;
  height?: number;
  initialPosition?: Position;
  fragment?: (uv: UV, mouse: Mouse) => { type: 't'; x: number; y: number };
  className?: string;
  style?: React.CSSProperties;
  onPositionChange?: (position: Position) => void;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  width = 300,
  height = 200,
  initialPosition,
  fragment,
  className,
  style,
  onPositionChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const feImageRef = useRef<SVGFEImageElement>(null);
  const feDisplacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  const [id] = useState(generateId);
  const [position, setPosition] = useState<Position>(
    initialPosition || { x: window.innerWidth / 2 - width / 2, y: window.innerHeight / 2 - height / 2 }
  );
  const [mouse, setMouse] = useState<Mouse>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const mouseUsedRef = useRef(false);
  const canvasDPI = 1;
  const offset = 10; // Viewport boundary offset

  // Default fragment function
  const defaultFragment = useCallback((uv: UV, mouse: Mouse) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
    const scaled = smoothStep(0, 1, displacement);
    return texture(ix * scaled + 0.5, iy * scaled + 0.5);
  }, []);

  const fragmentFunction = fragment || defaultFragment;

  // Position constraint function
  const constrainPosition = useCallback((x: number, y: number): Position => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const minX = offset;
    const maxX = viewportWidth - width - offset;
    const minY = offset;
    const maxY = viewportHeight - height - offset;
    
    const constrainedX = Math.max(minX, Math.min(maxX, x));
    const constrainedY = Math.max(minY, Math.min(maxY, y));
    
    return { x: constrainedX, y: constrainedY };
  }, [width, height, offset]);

  // Update shader
  const updateShader = useCallback(() => {
    const canvas = canvasRef.current;
    const feImage = feImageRef.current;
    const feDisplacementMap = feDisplacementMapRef.current;
    
    if (!canvas || !feImage || !feDisplacementMap) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Create mouse proxy to detect usage
    const mouseProxy = new Proxy(mouse, {
      get: (target, prop) => {
        mouseUsedRef.current = true;
        return target[prop as keyof Mouse];
      }
    });

    mouseUsedRef.current = false;

    const w = width * canvasDPI;
    const h = height * canvasDPI;
    const data = new Uint8ClampedArray(w * h * 4);

    let maxScale = 0;
    const rawValues: number[] = [];

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % w;
      const y = Math.floor(i / 4 / w);
      const pos = fragmentFunction(
        { x: x / w, y: y / h },
        mouseProxy
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
  }, [mouse, width, height, canvasDPI, fragmentFunction]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    if (isDragging) {
      const rect = container.getBoundingClientRect();
      const newX = e.clientX - width / 2;
      const newY = e.clientY - height / 2;
      
      const constrained = constrainPosition(newX, newY);
      setPosition(constrained);
      onPositionChange?.(constrained);
    }

    // Update mouse position for shader
    const rect = container.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    setMouse({ x: mouseX, y: mouseY });
  }, [isDragging, width, height, constrainPosition, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Window resize handler
  const handleResize = useCallback(() => {
    const constrained = constrainPosition(position.x, position.y);
    if (position.x !== constrained.x || position.y !== constrained.y) {
      setPosition(constrained);
      onPositionChange?.(constrained);
    }
  }, [position, constrainPosition, onPositionChange]);

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleMouseMove, handleMouseUp, handleResize]);

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

  // Update shader when mouse is used
  useEffect(() => {
    if (mouseUsedRef.current) {
      updateShader();
    }
  }, [mouse, updateShader]);

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden',
    borderRadius: '150px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25), 0 -10px 25px inset rgba(0, 0, 0, 0.15)',
    cursor: isDragging ? 'grabbing' : 'grab',
    backdropFilter: `url(#${id}_filter) blur(0.25px) contrast(1.2) brightness(1.05) saturate(1.1)`,
    zIndex: 9999,
    pointerEvents: 'auto',
    ...style
  };

  const svgStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 9998,
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

      {/* Main container */}
      <div
        ref={containerRef}
        className={className}
        style={containerStyle}
        onMouseDown={handleMouseDown}
      />

      {/* Hidden canvas for generating displacement map */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default LiquidGlass; 