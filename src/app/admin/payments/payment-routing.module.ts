import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePaymentsComponent } from './course-payments/course-payments.component';
import { ProgramPaymentsComponent } from './program-payments/program-payments.component';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';

const routes: Routes = [
    {
        path: 'course-payments',
        component: CoursePaymentsComponent,
    },
    {
        path: 'view-payments',
        component: ViewPaymentsComponent
      },
    {
        path: 'program-payments',
        component: ProgramPaymentsComponent,
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
