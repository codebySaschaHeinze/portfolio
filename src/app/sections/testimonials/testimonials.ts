import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Testimonial } from './../../interfaces/interfaces';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      idT: 1,
      nameT: 'Daniel Luzius',
      projectKey: 'TESTIMONIALS.KOCHWELT',
      textKey: 'TESTIMONIALS.DANIEL',
    },
    {
      idT: 2,
      nameT: 'Patrick Schmidt',
      projectKey: 'TESTIMONIALS.KOCHWELT',
      textKey: 'TESTIMONIALS.PATRICK',
    },
    {
      idT: 3,
      nameT: 'David Hasselhoff',
      projectKey: 'TESTIMONIALS.BEACHAPP',
      textKey: 'TESTIMONIALS.DAVID',
    },
  ];
}
