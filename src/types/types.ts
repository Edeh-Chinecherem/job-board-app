export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  postedAt: string;
  isBookmarked: boolean;
  requirements?: string;
  responsibilities?: string;
  experienceLevel?: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  contactEmail?: string;
  applicationLink?: string;
};

export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  bookmarks: string[];
}