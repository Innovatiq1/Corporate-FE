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
import { ViewAllRequestComponent } from './all-request/view-all-request/view-all-request.component';
import { OverallBudgetListComponent } from './overall-budget-list/overall-budget-list.component';
import { DeptBudgetAllocationComponent } from './dept-budget-allocation/dept-budget-allocation.component';
import { DeptTrainingPlanComponent } from './dept-training-plan/dept-training-plan.component';
import { CreateBudgetComponent } from './overall-budget-list/create-budget/create-budget.component';
import { CreateDepartmentBudgetComponent } from './dept-budget-allocation/create-department-budget/create-department-budget.component';
import { CreateDeptTrainingComponent } from './dept-training-plan/create-dept-training/create-dept-training.component';
import { BudgetRequestComponent } from './budget-request/budget-request.component';
import { EditBudgetRequestComponent } from './budget-request/edit-budget-request/edit-budget-request.component';
import { DeptBudgetRequestComponent } from './dept-budget-request/dept-budget-request.component';
import { EditDeptBudgetRequestComponent } from './dept-budget-request/edit-dept-budget-request/edit-dept-budget-request.component';



@NgModule({
  declarations: [
    EtmsDashboardComponent,
    EmployeeRequestComponent,
    EmployeeStatusComponent,
    AllRequestComponent,
    CreateRequestComponent,
    EditRequestComponent,
    ViewAllRequestComponent,
    OverallBudgetListComponent,
    DeptBudgetAllocationComponent,
    DeptTrainingPlanComponent,
    CreateBudgetComponent,
    CreateDepartmentBudgetComponent,
    CreateDeptTrainingComponent,
    BudgetRequestComponent,
    EditBudgetRequestComponent,
    DeptBudgetRequestComponent,
    EditDeptBudgetRequestComponent
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
