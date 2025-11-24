export interface Project {
  title: string;
  role?: string;
  date: string;
  description: string[];
  tech: string[];
  category: 'AI' | 'Data' | 'Web' | 'Vision';
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  date: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  details?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}
