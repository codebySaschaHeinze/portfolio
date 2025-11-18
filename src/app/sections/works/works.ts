import { Component } from '@angular/core';
import { Project } from './../../interfaces/interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './works.html',
  styleUrl: './works.scss',
})
export class Works {
  projects: Project[] = [
    {
      idP: 1,
      projectImg: 'imgs/join.webP',
      title: 'PROJECTS.JOIN.TITLE',
      description: 'PROJECTS.JOIN.DESC',
      set: ['Angular', 'Firebase', 'TypeScript', 'HTML', 'SCSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/join.git',
      liveLink: 'https://join.saschaheinze.de',
    },
    {
      idP: 2,
      projectImg: 'imgs/elpolloloco.webP',
      title: 'PROJECTS.ELPOLLO.TITLE',
      description: 'PROJECTS.ELPOLLO.DESC',
      set: ['JavaScript', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/el-pollo-loco.git',
      liveLink: 'https://elpolloloco.saschaheinze.de',
    },
    {
      idP: 3,
      projectImg: 'imgs/pokedex.webP',
      title: 'PROJECTS.POKEDEX.TITLE',
      description: 'PROJECTS.POKEDEX.DESC',
      set: ['JavaScript', 'API', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/PokeDex.git',
      liveLink: 'https://pokedex.saschaheinze.de',
    },
  ];

  openExternal(url?: string) {
    if (!url) {
      return;
    }
    window.open(url, '_blank', 'noopener');
  }

  links = {
    elpolloloco: 'https://elpolloloco.saschaheinze.de',
    pokedex: 'https://pokedex.saschaheinze.de',
  };
}
