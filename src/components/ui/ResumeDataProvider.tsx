'use client';

import { useEffect, useState } from 'react';
import resumeData from '../../lib/resume-data.json';

const ResumeDataProvider = () => {
  const [data, setData] = useState(resumeData);

  // This component doesn't render anything visible
  // It just provides the resume data to the global window object
  // for components to access
  useEffect(() => {
    // @ts-ignore
    window.resumeData = data;
  }, [data]);

  return null;
};

export default ResumeDataProvider;
