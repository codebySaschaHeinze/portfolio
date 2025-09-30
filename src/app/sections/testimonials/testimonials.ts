import { Component } from '@angular/core';
import { Project, Testimonial } from './../../interfaces/interfaces';

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Daniel Luzius',
      project: 'Kochwelt',
      text: 'Das ist ein Platzhalter! Die Zusammenarbeit war angenehm und professionell. Aufgaben wurden zuverlässig umgesetzt und das gemeinsame Ergebnis konnte sich sehen lassen.',
    },
    {
      id: 2,
      name: 'Patrick Schmidt',
      project: 'Kochwelt',
      text: 'Das ist ein Platzhalter! Die Zusammenarbeit war angenehm und professionell. Aufgaben wurden zuverlässig umgesetzt und das gemeinsame Ergebnis konnte sich sehen lassen.',
    },
    {
      id: 3,
      name: 'Pamela Anderson',
      project: 'BeachApp',
      text: 'Das ist ein Platzhalter! Die Zusammenarbeit war angenehm und professionell. Aufgaben wurden zuverlässig umgesetzt und das gemeinsame Ergebnis konnte sich sehen lassen.',
    },
  ];
}
