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
    { name: 'Angular', icon: '/icons/skill-icons/angular-icon.png' },
    { name: 'TypeScript', icon: '/icons/skill-icons/typescript-icon.png' },
    { name: 'JavaScript', icon: '/icons/skill-icons/javascript-icon.png' },
    { name: 'HTML', icon: '/icons/skill-icons/html-icon.png' },
    { name: 'CSS', icon: '/icons/skill-icons/css-icon.png' },
    { name: 'Git', icon: '/icons/skill-icons/git-icon.png' },
    { name: 'API', icon: '/icons/skill-icons/api-icon.png' },
  ];
}
