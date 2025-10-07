import { Component } from '@angular/core';
import { Atf } from '../sections/atf/atf';
import { About } from '../sections/about/about';
import { Skills } from '../sections/skills/skills';
import { Works } from '../sections/works/works';
import { Testimonials } from '../sections/testimonials/testimonials';
import { Contact } from '../sections/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Atf, About, Skills, Works, Testimonials, Contact],
  templateUrl: './home.html',
})
export class Home {}
