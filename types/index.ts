export interface Technology {
  icon: string;
  name: string;
}

export interface Project {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: Technology[];
  image: string;
  url: string;
  github: string;
  detail_url?: string;
  id?: string;
  likes?: number;
  comments?: Comment[];
}

export interface Experience {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  technologies?: Technology[];
}

export interface Training {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  certificate?: string;
}

export interface Extra {
  image: string;
  title: string;
  description: string;
  url: string;
}

export interface Media {
  email: string;
  cv: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  title: string;
  description: string;
  image: string;
  avatar: string;
  name: string;
  skill: string;
  location: string;
  media: Media;
  about: string;
  technologies: Technology[];
  experience: Experience[];
  projects: Project[];
  training: Training[];
  extras: Extra[];
}

export interface Comment {
  id: string;
  projectId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  points: number;
  achievements: Achievement[];
  visits: number;
  interactions: number;
}

