import React, { useRef, useEffect } from 'react';

interface LiquidGlassBackgroundProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  blurAmount?: number;
  speed?: number;
}

// Define bubble type
interface BubbleType {
  x: number;
  y: number;
  radius: number;
  xSpeed: number;
  ySpeed: number;
  color: string;
  opacity: number;
  update: () => void;
  draw: () => void;
}

const LiquidGlassBackground: React.FC<LiquidGlassBackgroundProps> = ({
  className,
  primaryColor = 'rgba(130, 100, 255, 0.4)',
  secondaryColor = 'rgba(80, 200, 255, 0.3)',
  blurAmount = 40,
  speed = 0.005
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to window size
    const handleResize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    };
    
    // Initialize and listen for window size changes
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create liquid glass effect bubbles/spots
    const bubbles: BubbleType[] = [];
    const bubbleCount = 15; // Number of bubbles
    
    // Define bubble class
    class Bubble implements BubbleType {
      x: number;
      y: number;
      radius: number;
      xSpeed: number;
      ySpeed: number;
      color: string;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 200 + 100; // Larger bubbles
        this.xSpeed = (Math.random() - 0.5) * speed;
        this.ySpeed = (Math.random() - 0.5) * speed;
        this.color = Math.random() > 0.5 ? primaryColor : secondaryColor;
        this.opacity = Math.random() * 0.5 + 0.2; // Opacity between 0.2-0.7
      }
      
      update() {
        // Move bubble
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
        // Boundary check
        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
      }
      
      draw() {
        // Create radial gradient
        const gradient = ctx!.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius
        );
        
        // Set gradient colors
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        // Draw bubble
        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
      }
    }
    
    // Initialize bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }
    
    // Add mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      
      // If mouse stops moving, set isMouseMoving to false
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      
      // Draw background
      ctx!.fillStyle = 'rgba(15, 15, 20, 0.9)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      
      // Update and draw all bubbles
      bubbles.forEach(bubble => {
        // If mouse is moving, add mouse interaction
        if (isMouseMoving) {
          const dx = mouseX - bubble.x;
          const dy = mouseY - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Bubbles slightly repel when mouse is nearby
          if (distance < 300) {
            const angle = Math.atan2(dy, dx);
            const repelForce = (300 - distance) / 10000;
            bubble.xSpeed -= Math.cos(angle) * repelForce;
            bubble.ySpeed -= Math.sin(angle) * repelForce;
          }
        }
        
        bubble.update();
        bubble.draw();
      });
      
      // Add glass effect blur overlay
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [primaryColor, secondaryColor, speed]);
  
  return (
    <div className={`fixed inset-0 -z-10 ${className || ''}`}>
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: `blur(${blurAmount}px)` }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/5"></div>
    </div>
  );
};

export default LiquidGlassBackground; 