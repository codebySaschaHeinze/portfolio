import { Component } from '@angular/core';
import { Project } from './../../interfaces/interfaces';

@Component({
  selector: 'app-works',
  imports: [],
  templateUrl: './works.html',
  styleUrl: './works.scss',
})
export class Works {
  projects: Project[] = [
    {
      id: 1,
      projectImg: 'imgs/elpolloloco.png',
      title: 'El Pollo Loco',
      set: ['HTML', 'CSS', 'JavaScript'],
      description:
        'El Pollo Loco ist ein kleines Jump-and-Run-Spiel im Browser, bei dem man eine Figur steuert, Münzen und Flaschen sammelt und Hühner als Gegner hat. Am Ende wartet ein großer Endboss, den man mit den gesammelten Flaschen besiegen muss.',
      github: 'GitHub',
    },

    {
      id: 2,
      projectImg: 'imgs/pokedex.png',
      title: 'PokeDex',
      set: ['HTML', 'CSS', 'JavaScript', 'API'],
      description:
        'Der Pokédex ist eine Web-App, in der man Pokémon mit Bild, Namen und Details wie Typ oder Fähigkeiten anzeigen kann. Über eine Schnittstelle zur PokéAPI werden die Daten geladen und übersichtlich in Kartenform dargestellt.',
      github: 'GitHub',
    },
  ];

  openGithub(url: string) {
    window.open(url, '_blank');
  }
}
