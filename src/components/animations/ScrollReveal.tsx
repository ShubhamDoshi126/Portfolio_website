'use client';

import { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  threshold = 0.1,
  delay = 0,
  direction = 'up',
  distance = 50,
  once = true,
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial state - hidden
    element.style.opacity = '0';
    element.style.transition = `transform 0.8s ease ${delay}ms, opacity 0.8s ease ${delay}ms`;

    // Set initial transform based on direction
    switch (direction) {
      case 'up':
        element.style.transform = `translateY(${distance}px)`;
        break;
      case 'down':
        element.style.transform = `translateY(-${distance}px)`;
        break;
      case 'left':
        element.style.transform = `translateX(${distance}px)`;
        break;
      case 'right':
        element.style.transform = `translateX(-${distance}px)`;
        break;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal the element
          element.style.opacity = '1';
          element.style.transform = 'translate(0, 0)';

          // Unobserve if once is true
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          // Hide again if not once
          element.style.opacity = '0';
          switch (direction) {
            case 'up':
              element.style.transform = `translateY(${distance}px)`;
              break;
            case 'down':
              element.style.transform = `translateY(-${distance}px)`;
              break;
            case 'left':
              element.style.transform = `translateX(${distance}px)`;
              break;
            case 'right':
              element.style.transform = `translateX(-${distance}px)`;
              break;
          }
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, delay, direction, distance, once]);

  return <div ref={elementRef}>{children}</div>;
};

export default ScrollReveal;
