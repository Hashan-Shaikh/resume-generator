"use client";
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import Resume from "@/app/components/Resume";
import axios from "axios";

export default function Home() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: "",
    jobDescription: "",
  });

  const [resumeData, setResumeData] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const generateResume = async () => {
    const response = await axios.post("http://localhost:3000/api/resume/generate", userData);
    setResumeData(response.data.generatedResume);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">AI Resume Generator</h1>
      <div className="w-1/2">
        <Input name="name" label="Name" onChange={handleChange} />
        <Input name="email" label="Email" onChange={handleChange} />
        <Textarea name="experience" label="Experience" onChange={handleChange} />
        <Textarea name="skills" label="Skills" onChange={handleChange} />
        <Textarea name="jobDescription" label="Job Description" onChange={handleChange} />
        <Button onPress={generateResume}>Generate Resume</Button>

        <div className="min-h-screen bg-gray-100 py-10">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">{userData.name}</h1>
          {resumeData ? <Resume resumeData={resumeData} /> : <p className="text-center">Loading...</p>}
        </div>
      </div>
    </div>
  );
}
