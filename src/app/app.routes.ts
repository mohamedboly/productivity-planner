import { Routes } from '@angular/router';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';
import { HomePageComponent } from './visitor/home/home.page.component';
import { LoginPageComponent } from './visitor/login/login.page.component';
import { SignupPageComponent } from './visitor/signup/signup.page.component';

export const routes: Routes = [
  {
    title: 'Productivity Planner',
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    title: 'Signup',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login',
  },
  {
    path: 'app/dashboard',
    component: DashboardPageComponent,
    title: 'Dashboard',
  },
];
