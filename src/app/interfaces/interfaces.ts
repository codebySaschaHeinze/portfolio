export interface Skill {
  nameS: string;
  icon: string;
}

export interface Project {
  idP: number;
  projectImg: string;
  title: string;
  description: string;
  set: string[];
  github: string;
  githubLink: string;
  liveLink: string;
}

export interface Testimonial {
  idT: number;
  nameT: string;
  projectKey: string;
  textKey: string;
}
