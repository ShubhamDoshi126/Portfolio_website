'use client';

import { useEffect, useRef, useState } from 'react';
import TypewriterEffect from '../animations/TypewriterEffect';
import ParticleBackground from '../animations/ParticleBackground';
import FloatingElement from '../animations/FloatingElement';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';

const HeroSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Get resume data from window object
    if (typeof window !== 'undefined' && window.resumeData) {
      setResumeData(window.resumeData);
    }
  }, []);

  const handleScrollClick = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Define roles based on skills from resume
  const roles = resumeData ? [
    "Machine Learning Engineer",
    "AI Developer",
    "Software Developer",
    "Data Scientist"
  ] : ["Developer"];

  return (
    <section id="home" className="section relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <ScrollReveal delay={200} direction="down">
            <p className="text-[var(--secondary)] mb-4 font-mono">Hi, my name is</p>
          </ScrollReveal>
          
          <ScrollReveal delay={400} direction="down">
            <FloatingElement>
              <GlowEffect>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                  {resumeData?.personal?.name || "Shubham Doshi"}
                </h1>
              </GlowEffect>
            </FloatingElement>
          </ScrollReveal>
          
          <ScrollReveal delay={600} direction="down">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--accent)] mb-6">
              I'm a{' '}
              <span className="text-[var(--highlight)]">
                <TypewriterEffect texts={roles} />
              </span>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={800} direction="down">
            <p className="text-[var(--accent)] max-w-xl mb-8">
              Specializing in AI, machine learning, and software development. 
              Currently pursuing a Master's in Artificial Intelligence at the University of Michigan.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={1000} direction="down">
            <div className="flex flex-wrap gap-4">
              <GlowEffect>
                <a 
                  href="#projects" 
                  className="px-6 py-3 rounded-md bg-[var(--secondary)] text-[var(--primary)] font-medium hover:bg-opacity-80 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Projects
                </a>
              </GlowEffect>
              
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-md border border-[var(--secondary)] text-[var(--secondary)] font-medium hover:bg-[var(--secondary)] hover:bg-opacity-10 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={handleScrollClick}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p className="text-xs mt-2 text-[var(--secondary)]">Scroll Down</p>
      </div>
    </section>
  );
};

export default HeroSection;
