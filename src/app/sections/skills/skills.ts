import { Component } from '@angular/core';
import { Skill } from './../../interfaces/interfaces';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skills: Skill[] = [
    { nameS: 'Angular', icon: '/icons/skill-icons/angular-icon.png' },
    { nameS: 'TypeScript', icon: '/icons/skill-icons/typescript-icon.png' },
    { nameS: 'JavaScript', icon: '/icons/skill-icons/javascript-icon.png' },
    { nameS: 'HTML', icon: '/icons/skill-icons/html-icon.png' },
    { nameS: 'CSS', icon: '/icons/skill-icons/css-icon.png' },
    { nameS: 'Git', icon: '/icons/skill-icons/git-icon.png' },
    { nameS: 'API', icon: '/icons/skill-icons/api-icon.png' },
  ];
}
