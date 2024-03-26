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
    component: TrainingReqestComponent
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
    path: 'create-request',
    component: CreateRequestComponent
  },
  {
    path: 'create-budget',
    component: CreateBudgetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
