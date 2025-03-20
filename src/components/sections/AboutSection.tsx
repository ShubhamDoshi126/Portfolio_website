'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';
import FloatingElement from '../animations/FloatingElement';
import profileImage from '../animations/IMG_4363.jpg'; // Import your image

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Get resume data from window object
    if (typeof window !== 'undefined' && window.resumeData) {
      setResumeData(window.resumeData);
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-[var(--primary)] bg-opacity-30"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">About</span> Me
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" delay={200} className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4">
              AI & Machine Learning Engineer
            </h3>
            <p className="text-[var(--accent)] mb-6">
              I'm a passionate AI and Machine Learning Engineer with experience in developing
              intelligent systems and applications. Currently pursuing a Master's in Artificial
              Intelligence at the University of Michigan, Dearborn, I specialize in deep learning,
              natural language processing, and computer vision.
            </p>
            <p className="text-[var(--accent)] mb-6">
              With a background in Electronics and Telecommunication engineering from Savitribai
              Phule Pune University, I've developed a strong foundation in both hardware and
              software aspects of technology. My professional experience includes working on
              AI-based projects, data processing, automation and developing web apps and dashboards.
            </p>
            <p className="text-[var(--accent)] mb-6">
              I'm particularly interested in the intersection of AI with real-world applications,
              having worked on projects like sentiment analysis, computer vision systems, and
              voice-controlled AI assistants.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <GlowEffect>
                <a
                  href="#experience"
                  className="px-6 py-3 rounded-md bg-[var(--secondary)] text-[var(--primary)] font-medium hover:bg-opacity-80 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  My Experience
                </a>
              </GlowEffect>
              <a
                href="#skills"
                className="px-6 py-3 rounded-md border border-[var(--secondary)] text-[var(--secondary)] font-medium hover:bg-[var(--secondary)] hover:bg-opacity-10 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                My Skills
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={400} className="order-1 md:order-2 flex justify-center">
            <FloatingElement>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--secondary)] shadow-lg shadow-[var(--secondary)]/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FloatingElement>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
