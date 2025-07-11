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
      maxWidth={false}
      sx={{
        px: { xs: 2, sm: 3 }, 
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Box sx={{ 
          width: '100%',
          mx: 'auto',
        }}>
        <Typography variant="h4" sx={{ py: 3, textAlign: 'center' }}>
          Available Jobs
        </Typography>
        
        <Box sx={{ 
            width: '100%',
            maxWidth: 1200,
            mb: 4,
            mx: 'auto',
            px: { xs: 0, sm: 2 }
          }}>
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