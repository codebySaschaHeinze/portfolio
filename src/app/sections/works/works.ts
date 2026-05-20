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
      projectImg: 'imgs/videoflix.webP',
      title: 'PROJECTS.VIDEOFLIX.TITLE',
      description: 'PROJECTS.VIDEOFLIX.DESC',
      set: ['Django', 'REST API', 'Python', 'Angular', 'TypeScript', 'Docker'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/videoflix-backend.git',
      liveLink: 'https://videoflix.saschaheinze.de',
    },
    {
      idP: 2,
      projectImg: 'imgs/coderr.webP',
      title: 'PROJECTS.CODERR.TITLE',
      description: 'PROJECTS.CODERR.DESC',
      set: ['Django', 'REST API', 'Python', 'Angular', 'TypeScript', 'Docker'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/coderr-backend.git',
      liveLink: 'https://www.coderr.saschaheinze.de',
    },
    {
      idP: 3,
      projectImg: 'imgs/join.webP',
      title: 'PROJECTS.JOIN.TITLE',
      description: 'PROJECTS.JOIN.DESC',
      set: ['Angular', 'Firebase', 'TypeScript', 'HTML', 'SCSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/join.git',
      liveLink: 'https://join.saschaheinze.de',
    },
    {
      idP: 4,
      projectImg: 'imgs/pokedex.webP',
      title: 'PROJECTS.POKEDEX.TITLE',
      description: 'PROJECTS.POKEDEX.DESC',
      set: ['JavaScript', 'REST API', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/PokeDex.git',
      liveLink: 'https://pokedex.saschaheinze.de',
    },
    {
      idP: 5,
      projectImg: 'imgs/elpolloloco.webP',
      title: 'PROJECTS.ELPOLLO.TITLE',
      description: 'PROJECTS.ELPOLLO.DESC',
      set: ['JavaScript', 'HTML', 'CSS'],
      github: 'GitHub',
      githubLink: 'https://github.com/codebySaschaHeinze/el-pollo-loco.git',
      liveLink: 'https://elpolloloco.saschaheinze.de',
    },
  ];

  /**
   * Opens an external URL in a new browser tab.
   * Uses `noopener` to prevent the opened page from accessing `window.opener`.
   *
   * @param {string} [url] - External URL to open. If no URL is provided,
   * the function exits without performing any action.
   */
  openExternal(url?: string): void {
    if (!url) {
      return;
    }
    window.open(url, '_blank', 'noopener');
  }

  links = {
    join: 'https://join.saschaheinze.de',
    elpolloloco: 'https://elpolloloco.saschaheinze.de',
    pokedex: 'https://pokedex.saschaheinze.de',
  };
}
