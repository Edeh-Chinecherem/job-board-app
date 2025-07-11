import { create } from 'zustand';

interface StoreState {
  jobs: Job[];
  user: User | null;
  addJob: (job: Omit<Job, 'id' | 'postedAt' | 'isBookmarked'>) => void;
  updateJob: (id: string, updatedJob: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toggleBookmark: (jobId: string) => void;
  filteredJobs: (filters: { title?: string; location?: string; type?: string }) => Job[];
}

export const useStore = create<StoreState>((set, get) => ({
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'New York',
      salary: '$90,000 - $120,000',
      description: 'We are looking for a skilled frontend developer...',
      type: 'Full-time',
      postedAt: '2023-05-15',
      isBookmarked: false,
    },
    // More sample jobs...
  ],
  user: null,
  addJob: (job) => set((state) => ({
    jobs: [
      ...state.jobs,
      {
        ...job,
        id: Math.random().toString(36).substring(2, 9),
        postedAt: new Date().toISOString(),
        isBookmarked: false,
      },
    ],
  })),
  updateJob: (id, updatedJob) => set((state) => ({
    jobs: state.jobs.map((job) => 
      job.id === id ? { ...job, ...updatedJob } : job
    ),
  })),
  deleteJob: (id) => set((state) => ({
    jobs: state.jobs.filter((job) => job.id !== id),
  })),
  login: (email, password) => {
    // In a real app, this would be an API call
    const user = {
      id: '1',
      email: 'admin@example.com',
      password: 'admin123',
      isAdmin: true,
      bookmarks: [],
    };
    
    if (email === user.email && password === user.password) {
      set({ user });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null }),
  toggleBookmark: (jobId) => set((state) => {
    if (!state.user) return state;
    
    const isBookmarked = state.user.bookmarks.includes(jobId);
    const updatedBookmarks = isBookmarked
      ? state.user.bookmarks.filter(id => id !== jobId)
      : [...state.user.bookmarks, jobId];
    
    return {
      jobs: state.jobs.map(job => 
        job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      ),
      user: {
        ...state.user,
        bookmarks: updatedBookmarks,
      },
    };
  }),
  filteredJobs: (filters) => {
    const { jobs } = get();
    return jobs.filter((job) => {
      const matchesTitle = !filters.title || 
        job.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesType = !filters.type || 
        job.type === filters.type;
      
      return matchesTitle && matchesLocation && matchesType;
    });
  },
}));