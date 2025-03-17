import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';

@Controller('api/resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('generate')
  @HttpCode(201) // Respond with 201 Created
  async generateResume(@Body() userData: CreateResumeDto) {
    return this.resumeService.generateResume(userData);
  }
}
