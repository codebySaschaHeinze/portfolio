import { Component } from '@angular/core';
import { Skill } from './../../interfaces/interfaces';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skills: Skill[] = [
    { nameS: 'HTML', icon: '/icons/skill-icons/html-icon.png' },
    { nameS: 'CSS', icon: '/icons/skill-icons/css-icon.png' },
    { nameS: 'JavaScript', icon: '/icons/skill-icons/javascript-icon.png' },
    { nameS: 'TypeScript', icon: '/icons/skill-icons/typescript-icon.png' },
    { nameS: 'Angular', icon: '/icons/skill-icons/angular-icon.png' },
    { nameS: 'Python', icon: '/icons/skill-icons/python-icon.png' },
    { nameS: 'Django', icon: '/icons/skill-icons/django-icon.png' },
    { nameS: 'API', icon: '/icons/skill-icons/api-icon.png' },
    { nameS: 'Git', icon: '/icons/skill-icons/git-icon.png' },
    { nameS: 'Docker', icon: '/icons/skill-icons/docker-icon.png' },
  ];
}
