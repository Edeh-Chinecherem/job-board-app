import { Card, CardContent, Typography, Button, CardActions, IconButton, Tooltip, Box } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { useStore } from '../store/useStore';
import type { Job } from '../types/types';
import type { SxProps, Theme } from '@mui/material/styles';

interface JobCardProps {
  job: Job;
  showActions?: boolean;
  onBookmarkToggle?: (jobId: string) => void;
  sx?: SxProps<Theme>;
}

export const JobCard = ({ job, showActions = true, onBookmarkToggle, sx }: JobCardProps) => {
  const { user, toggleBookmark } = useStore();

  const handleBookmarkClick = () => {
    toggleBookmark(job.id);
    if (onBookmarkToggle) onBookmarkToggle(job.id);
  };

  return (
    <Card
      sx={{
        mb: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        ...sx, // allow sx override from parent
      }}
    >
      {user && (
        <Tooltip
          title={job.isBookmarked ? 'Remove bookmark' : 'Save job'}
          placement="top"
        >
          <IconButton
            onClick={handleBookmarkClick}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: job.isBookmarked ? 'primary.main' : 'action.active',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              },
            }}
          >
            {job.isBookmarked ? <Bookmark /> : <BookmarkBorder />}
          </IconButton>
        </Tooltip>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" noWrap>
          {job.title}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {job.company} • {job.location}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {job.description}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>Salary:</strong> {job.salary}
          </Typography>
          <Typography variant="body2">
            <strong>Type:</strong> {job.type}
          </Typography>
        </Box>
      </CardContent>
      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small" variant="contained">
            Apply Now
          </Button>
          <Typography variant="caption" color="text.secondary">
            Posted: {new Date(job.postedAt).toLocaleDateString()}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};