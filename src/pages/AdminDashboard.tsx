import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions,
  MenuItem,
  IconButton,
  Container
} from '@mui/material';
import { JobCard } from '../components/JobCard';
import { useStore } from '../store/useStore';
import type { Job } from '../types/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const AdminDashboard = () => {
  const { jobs, addJob, updateJob, deleteJob } = useStore();
  const [open, setOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<Job> | null>(null);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'];
  const experienceLevels = ['Entry', 'Mid', 'Senior', 'Lead'];

  const handleOpen = (job: Job | null = null) => {
    setCurrentJob(job ? { ...job } : {
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      type: 'Full-time',
      experienceLevel: 'Mid',
      contactEmail: '',
      applicationLink: ''
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
      updateJob(currentJob.id, currentJob as Job);
    } else {
      addJob(currentJob as Omit<Job, 'id' | 'postedAt' | 'isBookmarked'>);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(id);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      py: 4,
      px: { xs: 2, sm: 4, md: 6 } // Responsive padding
    }}>
      <Container maxWidth={false} sx={{ 
        maxWidth: 1600, 
        px: { xs: 2, sm: 3 } 
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4">
            Admin Dashboard
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => handleOpen(null)}
            sx={{ ml: 'auto' }}
          >
            Add New Job
          </Button>
        </Box>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: 3,
          width: '100%'
        }}>
          {jobs.map(job => (
            <Box key={job.id} sx={{ 
              position: 'relative',
              height: '100%'
            }}>
              <JobCard job={job} />
              <Box sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                display: 'flex', 
                gap: 1,
                backgroundColor: 'background.paper',
                borderRadius: 1,
                p: 0.5,
                boxShadow: 1
              }}>
                <IconButton 
                  onClick={() => handleOpen(job)} 
                  color="primary"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(job.id)} 
                  color="error"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>{currentJob?.id ? 'Edit Job' : 'Add New Job'}</DialogTitle>
          <DialogContent>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { sm: '1fr 1fr' },
              gap: 2,
              pt: 1
            }}>
              <TextField
                autoFocus
                margin="dense"
                name="title"
                label="Job Title"
                fullWidth
                value={currentJob?.title || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="company"
                label="Company"
                fullWidth
                value={currentJob?.company || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="location"
                label="Location"
                fullWidth
                value={currentJob?.location || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="salary"
                label="Salary"
                fullWidth
                value={currentJob?.salary || ''}
                onChange={handleChange}
              />
              <TextField
                select
                margin="dense"
                name="type"
                label="Job Type"
                fullWidth
                value={currentJob?.type || 'Full-time'}
                onChange={handleChange}
              >
                {jobTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                margin="dense"
                name="experienceLevel"
                label="Experience Level"
                fullWidth
                value={currentJob?.experienceLevel || 'Mid'}
                onChange={handleChange}
              >
                {experienceLevels.map(level => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={currentJob?.description || ''}
                onChange={handleChange}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                margin="dense"
                name="requirements"
                label="Requirements"
                fullWidth
                multiline
                rows={3}
                value={currentJob?.requirements || ''}
                onChange={handleChange}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                margin="dense"
                name="responsibilities"
                label="Responsibilities"
                fullWidth
                multiline
                rows={3}
                value={currentJob?.responsibilities || ''}
                onChange={handleChange}
                sx={{ gridColumn: '1 / -1' }}
              />
              <TextField
                margin="dense"
                name="contactEmail"
                label="Contact Email"
                fullWidth
                value={currentJob?.contactEmail || ''}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="applicationLink"
                label="Application Link"
                fullWidth
                value={currentJob?.applicationLink || ''}
                onChange={handleChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {currentJob?.id ? 'Update' : 'Add'} Job
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};