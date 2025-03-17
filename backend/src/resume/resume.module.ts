import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
