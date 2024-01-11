import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';

const routes: Routes = [
  {
    path: 'etms-dashboard',
    component: EtmsDashboardComponent
  },
  {
    path: 'employee-request',
    component: EmployeeRequestComponent
  },
  {
    path: 'employee-status',
    component: EmployeeStatusComponent
  },
  {
    path: 'all-requests',
    component: AllRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ETmsRoutingModule { }
