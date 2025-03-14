'use client';

import { useEffect } from 'react';
import ResumeDataProvider from '../components/ui/ResumeDataProvider';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import SkillsSection from '../components/sections/SkillsSection';
import EducationSection from '../components/sections/EducationSection';
import ContactSection from '../components/sections/ContactSection';
import CustomCursor from '../components/animations/CustomCursor';
import ThreeDBackground from '../components/animations/ThreeDBackground';
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showThreeD, setShowThreeD] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Delay showing 3D background for better performance
    const threeTimer = setTimeout(() => {
      setShowThreeD(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(threeTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[var(--primary)] flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--secondary)] mb-4">
            Shubham Doshi
          </h1>
          <div className="w-64 h-1 bg-[var(--secondary)] mx-auto mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[var(--highlight)] animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
          <p className="text-[var(--accent)]">Loading experience...</p>
        </div>
        <style jsx>{`
          @keyframes loading {
            0% {
              width: 0%;
              left: 0;
            }
            50% {
              width: 100%;
              left: 0;
            }
            100% {
              width: 0%;
              left: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="relative">
      {/* Resume Data Provider */}
      <ResumeDataProvider />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Background Effects */}
      {showThreeD && <ThreeDBackground />}
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
