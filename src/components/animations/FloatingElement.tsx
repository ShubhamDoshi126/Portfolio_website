'use client';

import { useEffect, useRef } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  speed?: number;
  amplitude?: number;
  randomStart?: boolean;
}

const FloatingElement = ({
  children,
  speed = 3,
  amplitude = 15,
  randomStart = true,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Random starting point in the animation cycle
    const startPosition = randomStart ? Math.random() * Math.PI * 2 : 0;
    let animationFrame: number;
    let startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000; // seconds
      const position = startPosition + elapsed / speed;
      
      // Calculate vertical position using sine wave
      const yOffset = Math.sin(position) * amplitude;
      
      // Apply transform
      element.style.transform = `translateY(${yOffset}px)`;
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [speed, amplitude, randomStart]);
  
  return (
    <div ref={elementRef} className="transition-transform">
      {children}
    </div>
  );
};

export default FloatingElement;
