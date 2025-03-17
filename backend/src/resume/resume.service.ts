import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import axios from 'axios';
import { Resume } from './entities/resume.entity';
import { CreateResumeDto } from './dto/create-resume.dto';
import { z } from 'zod'; // Import Zod for validation
import ollama from 'ollama';
import { zodToJsonSchema } from 'zod-to-json-schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepo: Repository<Resume>,
  ) {}

  async generateResume(
    userData: CreateResumeDto,
  ): Promise<{ generatedResume: any }> {
    try {
      // Define the Zod schema for the generated resume
      const ResumeSchema = z.object({
        skills: z.array(z.string()), // Array of skills
        professionalExperience: z.array(
          z.object({
            jobTitle: z.string(),
            company: z.string(),
            yearsOfExperience: z.string(),
          }),
        ),
        education: z.array(
          z.object({
            degree: z.string(),
            institution: z.string(),
            graduationYear: z.string(),
          }),
        ),
        projects: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            technologiesUsed: z.array(z.string()),
          }),
        ),
      });

      // Construct the prompt for the Mistral model
      const prompt = `Generate a resume for ${userData.name}, who has the following experience: ${userData.experience}. Skills: ${userData.skills}. Job description: ${userData.jobDescription}.`;

      // Call Ollama's Mistral model to generate the resume text
      //   const res = await axios.post('http://localhost:11434/api/generate', {
      //     model: 'mistral',
      //     prompt: prompt,
      //   });
      const response = await ollama.chat({
        model: 'mistral',
        messages: [{ role: 'user', content: prompt }],
        format: zodToJsonSchema(ResumeSchema),
      });

      const resume = ResumeSchema.parse(JSON.parse(response.message.content));

      //   // Parse and validate the generated response using the ResumeSchema
      //   const parsedResponse = JSON.parse(res.data);
      //   const validatedResume = ResumeSchema.parse(parsedResponse); // Validate the generated resume

      //   // Save the generated resume in the database
      //   const newResume = this.resumeRepo.create({
      //     ...userData,
      //     generatedResume: JSON.stringify(validatedResume), // Save validated resume as a string
      //   });
      //   await this.resumeRepo.save(newResume);

      // Return the validated resume
      return { generatedResume: resume };
    } catch (error) {
      // Handle any errors from the Mistral API or validation
      throw new HttpException(
        error?.response?.data?.message ||
          'Resume generation failed due to internal error',
        error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
