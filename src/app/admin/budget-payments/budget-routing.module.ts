import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { AllRequestComponent } from './all-request/all-request.component';
import { AllocationComponent } from './allocation/allocation.component';
import { TrainingReqestComponent } from './training-reqest/training-reqest.component';
import { CoursePaymentComponent } from './course-payment/course-payment.component';
import { ProgramPaymentComponent } from './program-payment/program-payment.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { CreateBudgetComponent } from './budget/create-budget/create-budget.component';
import { CreateDeptBudgetRequestComponent } from './allocation/create-dept-budget-request/create-dept-budget-request.component';
import { ViewCoursePaymentComponent } from './course-payment/view-course-payment/view-course-payment.component';
import { ViewProgramPaymentComponent } from './program-payment/view-program-payment/view-program-payment.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { TrainingApprovalReqComponent } from '../approval/training-approval-req/training-approval-req.component';
import { BudgetRequestComponent } from './budget-request/budget-request.component';
import { DeptBudgetRequestComponent } from './dept-budget-request/dept-budget-request.component';


const routes: Routes = [
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'all-requests',
    component: AllRequestComponent
  },
  {
    path: 'allocation',
    component: AllocationComponent
  },

  {
    path: 'training-request',
    component: EmployeeStatusComponent
  },
  {
    path: 'course-payment',
    component: CoursePaymentComponent
  },
  {
    path: 'program-payment',
    component: ProgramPaymentComponent
  },{
    path: 'create-dept-budget-request',
    component: CreateDeptBudgetRequestComponent
  },
  {
    path: 'edit-dept-budget-request',
    component: CreateDeptBudgetRequestComponent
  },
  {
    path: 'create-request',
    component: CreateRequestComponent
  },
  {
    path: 'create-budget',
    component: CreateBudgetComponent
  },
  {
    path: 'view-course-payment',
    component: ViewCoursePaymentComponent
  },
  {
    path: 'view-program-payment',
    component: ViewProgramPaymentComponent
  },
  {
    path:'training-approval-req', 
    component:TrainingApprovalReqComponent
  },
  {
    path: 'budget-request',
    component: BudgetRequestComponent,
  },
  {
    path: 'department-budget-request',
    component: DeptBudgetRequestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
