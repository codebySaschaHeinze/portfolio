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
      idT: 1,
      nameT: 'Daniel Luzius',
      project: 'Kochwelt',
      text: 'Das ist ein Platzhalter! Die Zusammenarbeit war angenehm und professionell. Aufgaben wurden zuverlässig umgesetzt und das gemeinsame Ergebnis konnte sich sehen lassen.',
    },
    {
      idT: 2,
      nameT: 'Patrick Schmidt',
      project: 'Kochwelt',
      text: 'Sascha brachte in Teamarbeiten dank seiner kreativen Impulse, seiner Konzentrationsstärke und seines breiten Wissens einen besonderen Mehrwert ein.',
    },
    {
      idT: 3,
      nameT: 'Pamela Anderson',
      project: 'BeachApp',
      text: 'Das ist ein Platzhalter! Die Zusammenarbeit war angenehm und professionell. Aufgaben wurden zuverlässig umgesetzt und das gemeinsame Ergebnis konnte sich sehen lassen.',
    },
  ];
}
