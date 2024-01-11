import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { ETmsRoutingModule } from './e-tms-routing.module';



@NgModule({
  declarations: [
    EtmsDashboardComponent,
    EmployeeRequestComponent,
    EmployeeStatusComponent,
    AllRequestComponent
  ],
  imports: [
    CommonModule,
    ETmsRoutingModule
  ]
})
export class ETmsModule { }
