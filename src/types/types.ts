export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  postedAt: string;
  isBookmarked: boolean;
}

export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookmarks: string[];
}