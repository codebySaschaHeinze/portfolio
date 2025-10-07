import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Legalnotice } from './sections/legalnotice/legalnotice';
import { Datapolicy } from './sections/datapolicy/datapolicy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'impressum', component: Legalnotice },
  { path: 'datenschutz', component: Datapolicy },
  { path: '**', redirectTo: '' },
];
