
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  category: 'Full Stack' | 'AI/ML' | 'Frontend' | 'Mobile';
  featured?: boolean;
  capstone?: boolean;
  challenges?: string;
  outcomes?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Languages' | 'Frontend' | 'Backend & DB' | 'Cloud & Platforms' | 'AI/ML' | 'Tools';
  icon?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string | string[];
}

export interface Education {
  institution: string;
  qualification: string;
  period: string;
  description?: string;
  type: 'college' | 'school' | 'internship' | 'certification';
  category: 'formal' | 'additional';
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Generative AI' | 'Foundations' | 'Ethics' | 'Development';
  imageUrl?: string; // Optional for now
  credentialUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
