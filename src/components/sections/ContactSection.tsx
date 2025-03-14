'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import GlowEffect from '../animations/GlowEffect';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    // Get resume data from window object
    if (typeof window !== 'undefined' && window.resumeData) {
      setResumeData(window.resumeData);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            <span className="text-[var(--secondary)]">Contact</span> Me
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary)] mx-auto mb-6"></div>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <p className="text-center text-[var(--accent)] max-w-2xl mx-auto mb-12">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
            I'll do my best to get back to you!
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={400}>
            <div className="card p-8 backdrop-blur-md">
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--secondary)] mb-2">Message Sent!</h3>
                  <p className="text-[var(--accent)]">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-[var(--text)] mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--primary)] bg-opacity-50 border border-[var(--accent)] border-opacity-30 rounded-md px-4 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[var(--text)] mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[var(--primary)] bg-opacity-50 border border-[var(--accent)] border-opacity-30 rounded-md px-4 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-[var(--text)] mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-[var(--primary)] bg-opacity-50 border border-[var(--accent)] border-opacity-30 rounded-md px-4 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-[var(--text)] mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[var(--primary)] bg-opacity-50 border border-[var(--accent)] border-opacity-30 rounded-md px-4 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--secondary)] transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <GlowEffect>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-md bg-[var(--secondary)] text-[var(--primary)] font-medium hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--primary)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : 'Send Message'}
                      </button>
                    </GlowEffect>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
              <a 
                href={`mailto:${resumeData?.personal?.email || 'shubhamdoshi126@gmail.com'}`} 
                className="flex items-center text-[var(--accent)] hover:text-[var(--secondary)] transition-colors"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {resumeData?.personal?.email || 'shubhamdoshi126@gmail.com'}
              </a>
              <a 
                href={`https://${resumeData?.personal?.linkedin || 'linkedin.com/in/shubham-doshi-/'}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-[var(--accent)] hover:text-[var(--secondary)] transition-colors"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                {resumeData?.personal?.linkedin || 'linkedin.com/in/shubham-doshi-/'}
              </a>
              <a 
                href={`https://${resumeData?.personal?.github || 'github.com/ShubhamDoshi126'}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-[var(--accent)] hover:text-[var(--secondary)] transition-colors"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {resumeData?.personal?.github || 'github.com/ShubhamDoshi126'}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
