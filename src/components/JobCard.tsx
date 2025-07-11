import { Card, CardContent, Typography, Button, CardActions, IconButton } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useStore } from '../store/useStore';
import type { Job } from '../types/types';

interface JobCardProps {
  job: Job;
  showActions?: boolean;
}

export const JobCard = ({ job, showActions = true }: JobCardProps) => {
  const { user, toggleBookmark } = useStore();
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography color="text.secondary">
          {job.company} • {job.location}
        </Typography>
        <Typography sx={{ mt: 1 }}>{job.description}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Salary:</strong> {job.salary} • <strong>Type:</strong> {job.type}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions>
          <Button size="small" variant="contained">
            Apply Now
          </Button>
          {user && (
            <IconButton onClick={() => toggleBookmark(job.id)}>
              {job.isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};