import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ComponentsModule } from "../../shared/components/components.module";
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { ETmsRoutingModule } from './e-tms-routing.module';
import { CreateRequestComponent } from './create-request/create-request.component';



@NgModule({
  declarations: [
    EtmsDashboardComponent,
    EmployeeRequestComponent,
    EmployeeStatusComponent,
    AllRequestComponent,
    CreateRequestComponent
  ],
  imports: [
    CommonModule,SharedModule,ComponentsModule,
    ETmsRoutingModule
  ]
})
export class ETmsModule { }
