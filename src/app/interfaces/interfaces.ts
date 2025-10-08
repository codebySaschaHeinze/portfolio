export interface Skill {
  nameS: string;
  icon: string;
}

export interface Project {
  idP: number;
  projectImg: string;
  title: string;
  set: string[];
  description: string;
  github: string;
  githubLink: string;
  liveLink: string;
}

export interface Testimonial {
  idT: number;
  nameT: string;
  project: string;
  text: string;
}
