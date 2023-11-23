import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CoursePaymentsComponent } from './course-payments/course-payments.component';
import { ProgramPaymentsComponent } from './program-payments/program-payments.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';

@NgModule({
  declarations: [
    CoursePaymentsComponent,
    ProgramPaymentsComponent,
    ViewPaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    CKEditorModule,
    ModalModule.forRoot(),

  ],
})
export class PaymentModule {}
