import { useState } from 'react';
import { Container, Typography, Box} from '@mui/material';
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
    <Container 
      maxWidth="lg" 
      sx={{
        py: 4,
        minHeight: 'calc(100vh - 64px)', // Adjust based on your navbar height
      }}
    >
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            textAlign: 'center',
            width: '100%'
          }}
        >
          Available Jobs
        </Typography>
        
        <Box sx={{ width: '100%', maxWidth: 800, mb: 4 }}>
          <JobFilter onFilter={handleFilter} />
        </Box>

        {jobs.length > 0 ? (
          <Grid container spacing={3} style = {{ width: '100%' }}>
            {jobs.map(job => (
              <Grid key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 4,
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            No jobs found matching your criteria.
          </Typography>
        )}
      </Box>
    </Container>
  );
};