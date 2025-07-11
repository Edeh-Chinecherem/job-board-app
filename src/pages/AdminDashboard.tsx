import { useState } from 'react';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { JobCard } from '../components/JobCard';
import { useStore } from '../store/useStore';
import type { Job } from '../types/types';

export const AdminDashboard = () => {
  const { jobs, addJob, updateJob } = useStore();
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job> | null>(null);

  const handleOpen = (job: Job | null = null) => {
    setCurrentJob(job ? { ...job } : {
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      type: 'Full-time',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentJob(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!currentJob) return;
    
    if (currentJob.id) {
      updateJob(currentJob.id, currentJob);
    } else {
      addJob(currentJob as Omit<Job, 'id' | 'postedAt' | 'isBookmarked'>);
    }
    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 4 }}>
        Admin Dashboard
      </Typography>
      <Button variant="contained" onClick={() => handleOpen(null)} sx={{ mb: 4 }}>
        Add New Job
      </Button>
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job} 
          showActions={false}
        />
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentJob?.id ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Job Title"
            fullWidth
            value={currentJob?.title || ''}
            onChange={handleChange}
          />
          {/* Add more fields for company, location, etc. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};