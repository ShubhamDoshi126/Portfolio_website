'use client';

import { useEffect, useRef } from 'react';

interface GlowEffectProps {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  hoverEffect?: boolean;
}

const GlowEffect = ({
  children,
  color = 'var(--secondary)',
  intensity = 20,
  hoverEffect = true,
}: GlowEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hoverEffect) return;
      
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      // Calculate intensity based on distance from center
      const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
      const normalizedDistance = 1 - Math.min(distanceFromCenter / maxDistance, 1);
      const dynamicIntensity = intensity * normalizedDistance;
      
      container.style.boxShadow = `0 0 ${dynamicIntensity}px ${color}`;
    };
    
    const handleMouseLeave = () => {
      if (hoverEffect) {
        container.style.boxShadow = `0 0 5px ${color}`;
      }
    };
    
    if (hoverEffect) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    } else {
      container.style.boxShadow = `0 0 ${intensity}px ${color}`;
    }
    
    return () => {
      if (hoverEffect) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [color, intensity, hoverEffect]);

  return (
    <div 
      ref={containerRef} 
      className="transition-all duration-300"
      style={{ boxShadow: `0 0 5px ${color}` }}
    >
      {children}
    </div>
  );
};

export default GlowEffect;
