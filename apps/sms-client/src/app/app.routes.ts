import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/authenticated/authenticated.component').then(
        (m) => m.AuthenticatedComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dasboard/dasboard.component').then(
            (m) => m.DasboardComponent
          ),
      },
    ],
  },
];
