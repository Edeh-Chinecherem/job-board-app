import { useState } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export const JobFilter = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    type: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({ title: '', location: '', type: '' });
    onFilter({ title: '', location: '', type: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        name="title"
        label="Job Title"
        value={filters.title}
        onChange={handleChange}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        name="location"
        label="Location"
        value={filters.location}
        onChange={handleChange}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        select
        name="type"
        label="Job Type"
        value={filters.type}
        onChange={handleChange}
        sx={{ mr: 2, mb: 2, minWidth: 120 }}
      >
        <MenuItem value="">
          <em>All Types</em>
        </MenuItem>
        {jobTypes.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mr: 2 }}>
        Filter
      </Button>
      <Button onClick={handleReset} variant="outlined">
        Reset
      </Button>
    </Box>
  );
};