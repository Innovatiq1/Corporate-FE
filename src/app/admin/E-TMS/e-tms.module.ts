import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { ETmsRoutingModule } from './e-tms-routing.module';

import { CreateRequestComponent } from './create-request/create-request.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgxGaugeModule } from 'ngx-gauge';
import { EditRequestComponent } from './employee-request/edit-request/edit-request.component';



@NgModule({
  declarations: [
    EtmsDashboardComponent,
    EmployeeRequestComponent,
    EmployeeStatusComponent,
    AllRequestComponent,
    CreateRequestComponent,
    EditRequestComponent
  ],
  imports: [

    CommonModule,
    ETmsRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgApexchartsModule,
    ComponentsModule,
    SharedModule,
    NgxGaugeModule,
  ]
})
export class ETmsModule { }
