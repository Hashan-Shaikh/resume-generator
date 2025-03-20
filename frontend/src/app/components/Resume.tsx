import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";

// Define the prop types
interface ResumeProps {
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
}

// Resume Component
const Resume: React.FC<ResumeProps> = ({ resumeData }) => {
  return (
    <Card sx={{ maxWidth: 800, mx: "auto", my: 4, p: 3 }}>
      <CardContent>
        {/* Resume Header */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Resume
        </Typography>

        {/* Skills Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Skills
        </Typography>
        <List>
          {resumeData.skills.map((skill, index) => (
            <ListItem key={index}>
              <ListItemText primary={`• ${skill}`} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />

        {/* Professional Experience */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Professional Experience
        </Typography>
        {resumeData.professionalExperience.map((exp, index) => (
          <Card key={index} sx={{ my: 2, p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {exp.jobTitle} @ {exp.company}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {exp.yearsOfExperience}
            </Typography>
            <List>
              {exp.achievements.map((ach, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`• ${ach}`} />
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
        <Divider sx={{ my: 2 }} />

        {/* Education */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Education
        </Typography>
        {resumeData.education.map((edu, index) => (
          <Typography key={index} variant="body1">
            🎓 {edu.degree} - {edu.institution} ({edu.graduationYear})
          </Typography>
        ))}
        <Divider sx={{ my: 2 }} />

        {/* Projects Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Projects
        </Typography>
        <Grid container spacing={2}>
          {resumeData.projects.map((project, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {project.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Tech Stack:</strong> {project.technologiesUsed.join(", ")}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Resume;
