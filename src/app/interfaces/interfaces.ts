export interface Skill {
  name: string;
  icon: string;
}

export interface Project {
  id: number;
  projectImg: string;
  title: string;
  set: string[];
  description: string;
  github: string;
  githubLink: string;
}

export interface Testimonial {
  id: number;
  name: string;
  project: string;
  text: string;
}
