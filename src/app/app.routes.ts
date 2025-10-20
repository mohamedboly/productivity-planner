import { Routes } from '@angular/router';
import { HomePageComponent } from './visitor/home/home.page.component';
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
];
