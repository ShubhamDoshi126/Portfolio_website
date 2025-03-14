'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';
import FloatingElement from '../animations/FloatingElement';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

const SkillCategory = ({ title, skills }: SkillCategoryProps) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={categoryRef}
      className="card p-6"
    >
      <h3 className="text-xl font-bold text-[var(--secondary)] mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <FloatingElement key={index} speed={3 + index % 3} amplitude={5} randomStart={true}>
            <span 
              className="skill-badge"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {skill}
            </span>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
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
      id="skills"
      ref={sectionRef}
      className="section"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">Technical</span> Skills
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData?.skills ? (
            Object.entries(resumeData.skills).map(([category, skillsList]: [string, any], index: number) => (
              <ScrollReveal key={index} delay={index * 200} direction={index % 2 === 0 ? 'left' : 'right'}>
                <SkillCategory
                  title={category}
                  skills={skillsList}
                />
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-[var(--accent)] col-span-2">Loading skills data...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
