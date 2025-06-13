// Liquid glass effect component type definitions

export interface UV {
  x: number;
  y: number;
}

export interface Mouse {
  x: number;
  y: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface TextureResult {
  type: 't';
  x: number;
  y: number;
}

export type FragmentShader = (uv: UV, mouse: Mouse) => TextureResult;

export interface LiquidGlassProps {
  /** Glass effect width, default 300px */
  width?: number;
  /** Glass effect height, default 200px */
  height?: number;
  /** Initial position, default centered */
  initialPosition?: Position;
  /** Custom fragment shader function */
  fragment?: FragmentShader;
  /** Custom CSS class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
  /** Position change callback function */
  onPositionChange?: (position: Position) => void;
}

export interface LiquidGlassRef {
  /** Get current position */
  getPosition: () => Position;
  /** Set position */
  setPosition: (position: Position) => void;
  /** Update shader */
  updateShader: () => void;
}

// Utility function types
export type SmoothStepFunction = (a: number, b: number, t: number) => number;
export type LengthFunction = (x: number, y: number) => number;
export type RoundedRectSDFFunction = (
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  radius: number
) => number;
export type TextureFunction = (x: number, y: number) => TextureResult; 