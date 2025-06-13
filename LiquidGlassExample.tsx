import React, { useState } from 'react';
import LiquidGlass from './LiquidGlass';

// Custom fragment shader example
const customFragment = (uv: { x: number; y: number }, mouse: { x: number; y: number }) => {
  const ix = uv.x - 0.5;
  const iy = uv.y - 0.5;
  
  // Add mouse interaction effect
  const mouseInfluence = 0.1;
  const mouseX = (mouse.x - 0.5) * mouseInfluence;
  const mouseY = (mouse.y - 0.5) * mouseInfluence;
  
  // Create ripple effect
  const time = Date.now() * 0.001;
  const wave = Math.sin(time * 2 + Math.sqrt(ix * ix + iy * iy) * 10) * 0.02;
  
  return {
    type: 't' as const,
    x: ix + mouseX + wave + 0.5,
    y: iy + mouseY + wave + 0.5
  };
};

const LiquidGlassExample: React.FC = () => {
  const [showCustom, setShowCustom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div style={{ 
      height: '100vh', 
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Liquid Glass Effect Demo
      </h1>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        color: 'white'
      }}>
        <p>Drag the glass effect around the page</p>
        <p>Current position: x: {Math.round(position.x)}, y: {Math.round(position.y)}</p>
        
        <button 
          onClick={() => setShowCustom(!showCustom)}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            background: showCustom ? '#ff6b6b' : '#4ecdc4',
            color: 'white',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {showCustom ? 'Switch to Default Effect' : 'Switch to Custom Effect'}
        </button>
      </div>

      {/* Default liquid glass effect */}
      {!showCustom && (
        <LiquidGlass
          width={300}
          height={200}
          onPositionChange={setPosition}
          style={{ border: '2px solid rgba(255, 255, 255, 0.3)' }}
        />
      )}

      {/* Custom liquid glass effect */}
      {showCustom && (
        <LiquidGlass
          width={250}
          height={250}
          fragment={customFragment}
          onPositionChange={setPosition}
          style={{ 
            borderRadius: '50%',
            border: '3px solid rgba(255, 255, 255, 0.5)'
          }}
        />
      )}

      {/* Multiple small liquid glass effects */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[1, 2, 3].map((id) => (
          <LiquidGlass
            key={id}
            width={120}
            height={80}
            initialPosition={{ 
              x: window.innerWidth / 2 - 60 + (id - 2) * 150, 
              y: window.innerHeight - 150 
            }}
            style={{ 
              borderRadius: '40px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LiquidGlassExample; 