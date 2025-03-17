import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  experience: string;

  @Column({ type: 'text' })
  skills: string;

  @Column({ type: 'text' })
  jobDescription: string;

  @Column({ type: 'text' })
  generatedResume: string;
}
