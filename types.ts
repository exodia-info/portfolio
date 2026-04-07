
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullContent: string;
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  date: string;
  tags: string[];
  accentColor?: string;
  layout?: 'standard' | 'trike';
  links?: {
    demo?: string;
    caseStudy?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}
