'use client';

import { useEffect, useRef } from 'react';

interface CursorProps {
  color?: string;
}

const CustomCursor = ({ color = 'var(--secondary)' }: CursorProps) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Main cursor follows with delay
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Dot cursor follows immediately
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
      
      // Check if hovering over links or buttons
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button')
      ) {
        cursor.classList.add('cursor-expanded');
      } else {
        cursor.classList.remove('cursor-expanded');
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor hidden md:block"
        style={{ backgroundColor: color }}
      ></div>
      <div 
        ref={cursorDotRef} 
        className="fixed w-1 h-1 rounded-full bg-white pointer-events-none z-50 hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      <style jsx>{`
        .custom-cursor {
          transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        .cursor-expanded {
          width: 2rem;
          height: 2rem;
          background-color: var(--highlight) !important;
          mix-blend-mode: difference;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
