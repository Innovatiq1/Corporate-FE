import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardComponent as StudentDashboard } from 'app/student/dashboard/dashboard.component';
import { DashboardComponent } from 'app/teacher/dashboard/dashboard.component';
import { CmDashboardComponent } from './cm-dashboard/cm-dashboard.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'student-analytics',
    component: MainComponent,
  },
  {
    path: 'instructor-analytics',
    component: Dashboard2Component,
  },
  {
    path: 'instructor-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard,
  },
  {
    path: 'coursemanager-dashboard',
    component: CmDashboardComponent,
  },
  {
    path: 'hod-dashboard',
    component: CmDashboardComponent,
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
