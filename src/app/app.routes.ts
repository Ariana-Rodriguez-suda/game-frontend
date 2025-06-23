import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { RegisterComponent } from './auth/register-form/register-form.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent }, 
];
