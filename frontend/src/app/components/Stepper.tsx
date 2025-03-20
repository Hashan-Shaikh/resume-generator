'use client';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  CircularProgress, // Add CircularProgress for the loading animation
} from '@mui/material';

const steps = ['Name', 'Email', 'Experience', 'Skills', 'Job Description'];

type FormValues = {
  name: string;
  email: string;
  experience: string;
  skills: string;
  jobDescription: string;
};

export default function StepperComponent({ onSubmitData, loading }: { onSubmitData: (data: FormValues) => void; loading: boolean }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      experience: '',
      skills: '',
      jobDescription: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (activeStep === steps.length - 1) {
      onSubmitData(data); // Call the API only on the last step
    }
    setActiveStep(activeStep + 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      case 1:
        return (
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      case 2:
        return (
          <Controller
            name="experience"
            control={control}
            rules={{ required: 'Experience is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Experience (years)"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      case 3:
        return (
          <Controller
            name="skills"
            control={control}
            rules={{ required: 'Skills are required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Skills"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      case 4:
        return (
          <Controller
            name="jobDescription"
            control={control}
            rules={{ required: 'Job description is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Job Description"
                multiline
                rows={4}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '600px', mx: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 3 }}>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Your resume is being generated... 🎉
                </Typography>
              </Box>
            ) : (
              <Typography variant="h6">All steps completed!</Typography>
            )}
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 2 }} key={`step-${activeStep}`}>
              {renderStepContent(activeStep)}
            </Box>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
              <Button type="submit" variant="contained">
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Box>
  );
}
