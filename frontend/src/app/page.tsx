'use client'
import StepperComponent from "./components/Stepper";
import Resume from "./components/Resume";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import axios from "axios";


export default function Home() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateResume = async (formData: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/resume/generate', formData);
      setResumeData(response.data.generatedResume); // Store response
      setLoading(false);

    } catch (error) {
      console.error('Error generating resume:', error);
      setLoading(false);
    }
  };


  return (
    <div>
      <Image src="/logo.svg" alt="main logo" width={200} height={30} />
      {!resumeData ? (
        <StepperComponent loading={loading} onSubmitData={handleGenerateResume} />
      ) : (
        <Resume resumeData={resumeData} />
      )}
    </div>
  );
}
