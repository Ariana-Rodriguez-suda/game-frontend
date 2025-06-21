import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register-form/register-form.component').then(m => m.RegisterComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login-form/login-form.component').then(m => m.LoginFormComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/user-profile/user-profile.component').then(m => m.UserProfileComponent),
  },
];
