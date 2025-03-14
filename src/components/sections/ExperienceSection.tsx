'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
  isLast?: boolean;
}

const ExperienceItem = ({ title, company, location, date, description, isLast = false }: ExperienceItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex">
      {/* Timeline */}
      <div className="flex flex-col items-center mr-6">
        <div className="w-4 h-4 rounded-full bg-[var(--secondary)] animate-pulse"></div>
        {!isLast && <div className="w-0.5 h-full bg-[var(--secondary)] bg-opacity-30 mt-2"></div>}
      </div>
      
      {/* Content */}
      <div className="card p-6 mb-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--secondary)]">{title}</h3>
          <span className="text-sm text-[var(--accent)]">{date}</span>
        </div>
        <div className="mb-4">
          <span className="text-lg font-medium">{company}</span>
          <span className="text-[var(--accent)] ml-2">• {location}</span>
        </div>
        <ul className="space-y-2">
          {description.map((item, index) => (
            <li key={index} className="text-[var(--accent)]">
              <span className="text-[var(--secondary)] mr-2">▹</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
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
      id="experience"
      ref={sectionRef}
      className="section"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">Work</span> Experience
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {resumeData?.experience ? (
            resumeData.experience.map((exp: any, index: number) => (
              <ScrollReveal key={index} delay={index * 200}>
                <ExperienceItem
                  title={exp.title}
                  company={exp.company}
                  location={exp.location_date}
                  date={exp.location_date}
                  description={exp.description}
                  isLast={index === resumeData.experience.length - 1}
                />
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-[var(--accent)]">Loading experience data...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
