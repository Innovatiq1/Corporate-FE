import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { DashboardComponent as StudentDashboard } from 'app/student/dashboard/dashboard.component';
import { DashboardComponent } from 'app/teacher/dashboard/dashboard.component';
import { CmDashboardComponent } from './cm-dashboard/cm-dashboard.component';
import { SupervisorDashboardComponent } from './supervisor-dashboard/supervisor-dashboard.component';
import { PmDashboardComponent } from './pm-dashboard/pm-dashboard.component';
import { TrainingAdministratorComponent } from './training-administrator/training-administrator.component';
import { HodDashboardComponent } from './hod-dashboard/hod-dashboard.component';
import { TrainingCoordinatorDbComponent } from './training-coordinator-db/training-coordinator-db.component';
import { TrainingApprovalTabComponent } from './training-approval-tab/training-approval-tab.component';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { CeoDashboardComponent } from './ceo-dashboard/ceo-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
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
    component: HodDashboardComponent,
  },
  {
    path: 'trainingadministrator-dashboard',
    component: TrainingAdministratorComponent,
  },
  {
    path: 'supervisor-dashboard',
    component: SupervisorDashboardComponent,
  },
  {
    path: 'programmanager-dashboard',
    component: PmDashboardComponent,
  },
  {
    path: 'trainingcoordinator-dashboard',
    component: TrainingCoordinatorDbComponent,
  },
  {
    path: 'training-approval-tab',
    component: TrainingApprovalTabComponent,
  },
  {
    path: 'ceo-dashboard',
    component: CeoDashboardComponent,
  },
  {
    path: 'etms-dashboard',
    component: EtmsDashboardComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
