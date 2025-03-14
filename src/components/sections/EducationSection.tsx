'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';

interface EducationItemProps {
  institution: string;
  degree: string;
  date: string;
  courses: string;
  isLast?: boolean;
}

const EducationItem = ({ institution, degree, date, courses, isLast = false }: EducationItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex">
      {/* Timeline */}
      <div className="flex flex-col items-center mr-6">
        <div className="w-4 h-4 rounded-full bg-[var(--highlight)] animate-pulse"></div>
        {!isLast && <div className="w-0.5 h-full bg-[var(--highlight)] bg-opacity-30 mt-2"></div>}
      </div>
      
      {/* Content */}
      <div className="card p-6 mb-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--highlight)]">{institution}</h3>
          <span className="text-sm text-[var(--accent)]">{date}</span>
        </div>
        <div className="mb-4">
          <span className="text-lg font-medium text-[var(--text)]">{degree}</span>
        </div>
        <div className="text-[var(--accent)]">
          {courses}
        </div>
      </div>
    </div>
  );
};

const EducationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Get resume data from window object
    if (typeof window !== 'undefined' && window.resumeData) {
      setResumeData(window.resumeData);
    }
  }, []);

  // Clean up education data from the resume
  const processEducationData = (educationData: any[]) => {
    if (!educationData) return [];
    
    return educationData.map(edu => {
      // Extract institution and date properly
      let institution = edu.institution;
      let date = '';
      
      if (institution.includes('University of Michigan')) {
        institution = 'University of Michigan, Dearborn';
        date = '09/2024 – 12/2025';
      } else if (institution.includes('Savitribai Phule')) {
        institution = 'Savitribai Phule Pune University';
        date = '08/2019 - 07/2023';
      }
      
      // Extract degree
      let degree = '';
      if (edu.date.includes('Masters')) {
        degree = 'Masters of Science in Artificial Intelligence';
      } else if (edu.date.includes('B. Tech')) {
        degree = 'B. Tech in Electronics and Telecommunication engineering';
      }
      
      return {
        institution,
        degree,
        date,
        courses: edu.courses
      };
    });
  };

  const educationData = resumeData ? processEducationData(resumeData.education) : [];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section bg-[var(--primary)] bg-opacity-30"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">Education</span>
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {educationData.length > 0 ? (
            educationData.map((edu: any, index: number) => (
              <ScrollReveal key={index} delay={index * 200}>
                <EducationItem
                  institution={edu.institution}
                  degree={edu.degree}
                  date={edu.date}
                  courses={edu.courses}
                  isLast={index === educationData.length - 1}
                />
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-[var(--accent)]">Loading education data...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
