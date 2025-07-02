import { Routes } from '@angular/router';
import { HomePlayerComponent } from './home/home-player/home-player.component';
import { HomeTeacherComponent } from './home/home-teacher/home-teacher.component';
import { LoginPlayerFormComponent } from './auth/login-form/login-player/login-player-form.component';
import { LoginTeacherFormComponent } from './auth/login-form/login-teacher/login-teacher.component';
import { RegisterPlayerFormComponent } from './auth/register-form/register-player/register-player-form.component';
import { RegisterTeacherFormComponent } from './auth/register-form/register-teacher/register-teacher.component';
import { PlayerProfileComponent } from './user/player/player-profile/player-profile.component';
import { TeacherProfileComponent } from './user/teacher/teacher-profile/teacher-profile.component';
import { CrazyForestComponent } from './map/Crazy-forest/crazy-forest.component';
import { Level1Component } from './map/Crazy-forest/level-1/level-1.component';
import { Level2Component } from './map/Crazy-forest/level-2/level-2.component';
import { Level3Component } from './map/Crazy-forest/level-3/level-3.component';
import { ShopComponent } from './map/Shop/shop.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home-player', pathMatch: 'full' },
  { path: 'home-player', component: HomePlayerComponent },
  { path: 'home-teacher', component: HomeTeacherComponent },
  { path: 'login-player', component: LoginPlayerFormComponent },
  { path: 'login-teacher', component: LoginTeacherFormComponent },
  { path: 'register-player', component: RegisterPlayerFormComponent },
  { path: 'register-teacher', component: RegisterTeacherFormComponent },
  { path: 'player-profile', component: PlayerProfileComponent },
  { path: 'teacher-profile', component: TeacherProfileComponent },
  { path: 'map/crazy-forest', component: CrazyForestComponent },
  { path: 'map/crazy-forest/level-1', component: Level1Component },
  { path: 'map/crazy-forest/level-2', component: Level2Component },
  { path: 'map/crazy-forest/level-3', component: Level3Component },
  { path: 'map/shop', component: ShopComponent }, 
];

