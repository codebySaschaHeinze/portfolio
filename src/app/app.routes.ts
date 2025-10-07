import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Impressum } from './sections/impressum/impressum';
import { Datenschutz } from './sections/datenschutz/datenschutz';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
  { path: '**', redirectTo: '' },
];
