import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtmsDashboardComponent } from './etms-dashboard/etms-dashboard.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ViewAllRequestComponent } from './all-request/view-all-request/view-all-request.component';
import { OverallBudgetListComponent } from './overall-budget-list/overall-budget-list.component';
import { DeptBudgetAllocationComponent } from './dept-budget-allocation/dept-budget-allocation.component';
import { DeptTrainingPlanComponent } from './dept-training-plan/dept-training-plan.component';
import { CreateBudgetComponent } from './overall-budget-list/create-budget/create-budget.component';
import { CreateDepartmentBudgetComponent } from './dept-budget-allocation/create-department-budget/create-department-budget.component';
import { CreateDeptTrainingComponent } from './dept-training-plan/create-dept-training/create-dept-training.component';
import { BudgetRequestComponent } from './budget-request/budget-request.component';
import { DeptBudgetRequestComponent } from './dept-budget-request/dept-budget-request.component';
import { NewCourseApprovalComponent } from './new-course-approval/new-course-approval.component';
import { NewCourseRequestComponent } from './new-course-request/new-course-request.component';


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
    path: 'create-course-request',
    component: CreateRequestComponent
  },

  {
    path: 'copy-request',
    component: CreateRequestComponent
  },
  {
    path: 'edit-request',
    component: CreateRequestComponent
  },
  {
    path: 'view-request',
    component: ViewAllRequestComponent
  },
  {
    path: 'overall-budget-list',
    component: OverallBudgetListComponent,
    
  },
  {
    path: 'department-budget-allocation',
    component: DeptBudgetAllocationComponent,
  },
  {
    path: 'department-training-plan',
    component: DeptTrainingPlanComponent,
  },
  {
    path: 'create-budget',
    component: CreateBudgetComponent,
  },
  {
    path: 'create-department-budget',
    component: CreateDepartmentBudgetComponent,
  },
  {
    path: 'edit-department-budget',
    component: CreateDepartmentBudgetComponent,
  },
  {
    path: 'create-department-training',
    component: CreateDeptTrainingComponent,
  },
  {
    path: 'budget-request',
    component: BudgetRequestComponent,
  },
  {
    path: 'dapartment-budget-request',
    component: DeptBudgetRequestComponent,
  },
  {
    path: 'new-course-approval',
    component: NewCourseApprovalComponent,
  },
  {
    path: 'new-course-request',
    component: NewCourseRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ETmsRoutingModule { }
