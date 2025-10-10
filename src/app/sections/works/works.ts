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
      projectImg: 'imgs/elpolloloco.png',
      title: 'PROJECTS.ELPOLLO.TITLE',
      description: 'PROJECTS.ELPOLLO.DESC',
      set: ['JavaScript', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/el-pollo-loco.git',
      liveLink: 'https://elpolloloco.saschaheinze.dev',
    },
    {
      idP: 2,
      projectImg: 'imgs/pokedex.png',
      title: 'PROJECTS.POKEDEX.TITLE',
      description: 'PROJECTS.POKEDEX.DESC',
      set: ['JavaScript', 'API', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/PokeDex.git',
      liveLink: 'https://pokedex.saschaheinze.dev',
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
