import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app.component').then(m => m.AppComponent),
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
