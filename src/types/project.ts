export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
}
