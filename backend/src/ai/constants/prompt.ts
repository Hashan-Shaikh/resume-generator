export const generateResumePrompt = (
  name: string,
  experience: string,
  skills: string,
  jobDescription: string,
): string => {
  return `Generate a resume for ${name}, who has the following experience: ${experience}. 
    Skills: ${skills}. Job description: ${jobDescription}. 
    You should generate a JSON having four fields: skills, professionalExperience, education, and projects. The results would be descriptive like with professional experience write some example bullet points what person can achieve with these tools. Also write some demo company names. Dont leave anything blank. Also write some demo projects which can be achieved using following tools.`;
};
