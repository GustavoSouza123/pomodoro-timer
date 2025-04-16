import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth-guard.service';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { form: 'login' },
  },
  {
    path: 'signup',
    component: LoginComponent,
    data: { form: 'signup' },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
		canActivate: [AuthGuard],
  },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
