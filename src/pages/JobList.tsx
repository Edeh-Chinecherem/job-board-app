import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { JobCard } from '../components/JobCard';
import { JobFilter } from '../components/JobFilter';
import { useStore } from '../store/useStore';
import type { Job } from '../types/types';

export const JobList = () => {
  const { filteredJobs } = useStore();
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleFilter = (filters: any) => {
    const filtered = filteredJobs(filters);
    setJobs(filtered);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1600,
          px: { xs: 0, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            py: 3,
            textAlign: 'center',
            fontWeight: 600,
            width: '100%',
          }}
        >
          Available Jobs
        </Typography>

        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mb: 4,
            px: { xs: 1, sm: 0 },
          }}
        >
          <JobFilter onFilter={handleFilter} />
        </Box>

        {jobs.length > 0 ? (
          <Grid
            container
            spacing={3}
            sx={{
              width: '100%',
              margin: 0,
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            {jobs.map((job) => (
              <Grid
                
                key={job.id}
                
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: 350,
                }}
              >
                <JobCard
                  job={job}
                  sx={{
                    width: '100%',
                    maxWidth: 400,
                    height: '100%',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h5"
            sx={{
              mt: 8,
              textAlign: 'center',
              color: 'text.secondary',
              width: '100%',
            }}
          >
            No jobs found matching your criteria.
          </Typography>
        )}
      </Container>
    </Box>
  );
};