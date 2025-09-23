import { Component, signal } from '@angular/core';

import { Header } from './shared/header/header';
import { Atf } from './sections/atf/atf';
import { About } from './sections/about/about';
import { Skills } from './sections/skills/skills';
import { Work } from './sections/work/work';
import { Testimonials } from './sections/testimonials/testimonials';
import { Contact } from './sections/contact/contact';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Atf, About, Skills, Work, Testimonials, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Sascha Heinze');
}
