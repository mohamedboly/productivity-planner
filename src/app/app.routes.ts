import { Routes } from '@angular/router';
import { DashboardPageComponent } from './membership/dashboard/dashboard.page.component';
import { PlanningPageComponent } from './membership/planning/planning.page.component';
import { ProfilePageComponent } from './membership/profile/profile.page.component';
import { SettingPageComponent } from './membership/setting/setting.page.component';
import { WorkdayPageComponent } from './membership/workday/workday.page.component';
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
  {
    path: 'app/planning',
    component: PlanningPageComponent,
    title: 'Planning',
  },
  {
    path: 'app/settings',
    component: SettingPageComponent,
    title: 'Settings',
  },
  {
    path: 'app/workday',
    component: WorkdayPageComponent,
    title: 'Workday',
  },
  {
    path: 'app/profile',
    component: ProfilePageComponent,
    title: 'Profile',
  },
];
