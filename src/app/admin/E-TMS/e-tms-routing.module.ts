import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ViewAllRequestComponent } from './all-request/view-all-request/view-all-request.component';


const routes: Routes = [
  {
    path: 'etms-dashboard',
    component: EtmsDashboardComponent
  },
  {
    path: 'course-request',
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
  {
    path: 'create-request',
    component: CreateRequestComponent
  },
  {
    path: 'view-request',
    component: ViewAllRequestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ETmsRoutingModule { }
