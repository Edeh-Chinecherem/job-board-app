import { Typography, Box, Grid, Container } from '@mui/material';
import { JobCard } from '../components/JobCard';
import { useStore } from '../store/useStore';

export const BookmarksPage = () => {
  const { jobs, user } = useStore();
  
  const bookmarkedJobs = jobs.filter(job => 
    user?.bookmarks.includes(job.id)
  );

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      py: 4,
      px: { xs: 2, sm: 4 },
      backgroundColor: 'background.default'
    }}>
      <Container maxWidth={false} sx={{ 
        maxWidth: 1600,
        px: { xs: 0, sm: 2 }
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            fontWeight: 600,
            textAlign: 'center',
            width: '100%'
          }}
        >
          Your Bookmarked Jobs
        </Typography>
        
        {bookmarkedJobs.length > 0 ? (
          <Grid 
            container 
            spacing={3} 
            sx={{
              width: '100%',
              margin: 0,
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}
          >
            {bookmarkedJobs.map(job => (
              <Grid 
        
                key={job.id} 
                
              >
                <JobCard job={job} />
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
              width: '100%'
            }}
          >
            You haven't bookmarked any jobs yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
};