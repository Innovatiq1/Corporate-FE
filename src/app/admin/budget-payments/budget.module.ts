import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { NgxGaugeModule } from 'ngx-gauge';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetComponent } from './budget/budget.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { AllocationComponent } from './allocation/allocation.component';
import { TrainingReqestComponent } from './training-reqest/training-reqest.component';
import { CoursePaymentComponent } from './course-payment/course-payment.component';
import { ProgramPaymentComponent } from './program-payment/program-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { TrainingAprovalReqComponent } from './training-aproval-req/training-aproval-req.component';
import { EditRequestComponent } from './training-aproval-req/edit-request/edit-request.component';
import { CreateDeptBudgetRequestComponent } from './allocation/create-dept-budget-request/create-dept-budget-request.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { CreateBudgetComponent } from './budget/create-budget/create-budget.component';


@NgModule({
  declarations: [
    BudgetComponent,
    AllRequestComponent,
    AllocationComponent,
    TrainingReqestComponent,
    CoursePaymentComponent,
    ProgramPaymentComponent,
    EmployeeStatusComponent,
    TrainingAprovalReqComponent,
    EditRequestComponent,
    CreateDeptBudgetRequestComponent,
    CreateRequestComponent,
    CreateBudgetComponent,
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgxEchartsModule,
    NgApexchartsModule,
    NgxGaugeModule
  ]
})
export class BudgetModule { }
