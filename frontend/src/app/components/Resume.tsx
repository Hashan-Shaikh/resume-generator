import React from "react";

type ResumeProps = {
  resumeData: {
    skills: string[];
    professionalExperience: {
      jobTitle: string;
      company: string;
      yearsOfExperience: string;
      achievements: string[];
    }[];
    education: {
      degree: string;
      institution: string;
      graduationYear: string;
    }[];
    projects: {
      title: string;
      description: string;
      technologiesUsed: string[];
    }[];
  };
};

const Resume: React.FC<ResumeProps> = ({ resumeData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Skills</h2>
        <ul className="list-disc list-inside text-gray-700">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Professional Experience</h2>
        {resumeData.professionalExperience.map((exp, index) => (
          <div key={index} className="mb-4 p-4 border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
            <p className="text-gray-600">{exp.company} ({exp.yearsOfExperience})</p>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {exp.achievements.map((achieve, i) => (
                <li key={i}>{achieve}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Education</h2>
        {resumeData.education.map((edu, index) => (
          <p key={index} className="text-gray-700">
            <strong>{edu.degree}</strong> - {edu.institution} ({edu.graduationYear})
          </p>
        ))}
      </section>

      {/* Projects Section */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
            <p className="text-gray-600 mt-1">
              <strong>Technologies:</strong> {project.technologiesUsed.join(", ")}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Resume;
