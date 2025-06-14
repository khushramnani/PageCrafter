export interface Project {
  id: string;
  name: string;
  type: 'Landing Page' | 'Email Template' | 'Form';
  createdAt: string;
  slug: string;
  thumbnail?: string;
}