'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';

interface ProjectCardProps {
  title: string;
  description: string[];
  technologies?: string[];
  publication?: string;
  deployedOn?: {
    url: string;
    platform: string;
  };
  index: number;
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies = [], 
  publication, 
  deployedOn,
  index 
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  // Tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease',
    });
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  return (
    <div 
      ref={cardRef} 
      className={`card p-6 h-full`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[var(--secondary)] mb-2">{title}</h3>
          <div className="space-y-2 mb-4">
            {description.map((para, i) => (
              <p key={i} className="text-[var(--accent)]">{para}</p>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            {publication && (
              <a 
                href={publication} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--highlight)] hover:underline inline-flex items-center"
              >
                <span>Publication</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            
            {deployedOn && (
              <a 
                href={deployedOn.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--highlight)] hover:underline inline-flex items-center"
              >
                <span>Project - {deployedOn.platform}</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, i) => (
              <span key={i} className="skill-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Get resume data from window object
    if (typeof window !== 'undefined' && window.resumeData) {
      setResumeData(window.resumeData);
    }
  }, []);

  // Define technologies for each project based on their descriptions
  const projectTechnologies = {
    "Aura sense - Identity and Mood Recognition system": ["CNN", "MobileNetV2", "Transfer Learning", "Computer Vision", "TensorFlow"],
    "Sentiment analysis on Mental Health dataset": ["NLP", "LSTM", "Sentiment Analysis", "Machine Learning", "Gemini API"],
    "SchedulrAI – Computer vision and GPU optimized Image to schedule system": ["OCR", "Tesseract", "GPU Acceleration", "Google Calendar API", "Computer Vision"],
    "DockAssist: AI-Powered Dockerfile Generator": ["Python", "Flask", "Werkzeug", "Huggingface", "Gemini"],
    "Voice-Controlled AI Virtual Assistant": ["ChatGPT API", "Python", "PyQT", "Pyttsx3", "Whisper", "Speech Recognition"]
  };

  // Define deployment info for projects
  const projectDeployments = {
    "SchedulrAI – Computer vision and GPU optimized Image to schedule system": {
      url: "https://github.com/ShubhamDoshi126/SchedulrAI",
      platform: "GitHub"
    },
    "Sentiment analysis on Mental Health dataset": {
      url: "https://huggingface.co/spaces/ShubhamDoshi/sentiment-analysis",
      platform: "Hugging Face"
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section bg-[var(--primary)] bg-opacity-30"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">Featured</span> Projects
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-12"></div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData?.projects ? (
            resumeData.projects.map((project: any, index: number) => (
              <ScrollReveal key={index} delay={index * 200} direction={index % 2 === 0 ? 'left' : 'right'}>
                <ProjectCard
                  index={index}
                  title={project.title}
                  description={project.description}
                  technologies={projectTechnologies[project.title as keyof typeof projectTechnologies] || []}
                  publication={project.publication}
                  deployedOn={projectDeployments[project.title as keyof typeof projectDeployments]}
                />
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-[var(--accent)] col-span-2">Loading project data...</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
