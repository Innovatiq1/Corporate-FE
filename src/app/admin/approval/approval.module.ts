import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { CourseApprovalComponent } from './course-approval/course-approval.component';
import { ApproveListComponent } from './approve-list/approve-list.component';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ComponentsModule } from '@shared/components/components.module';
import { SharedModule } from '@shared';
import { MatStepperModule } from '@angular/material/stepper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { StudentApprovalListComponent } from './student-approval-list/student-approval-list.component';
import { ProgramApprovalListComponent } from './program-approval-list/program-approval-list.component';
import { TrainingApprovalReqComponent } from './training-approval-req/training-approval-req.component';
import { EditRequestComponent } from './training-approval-req/edit-request/edit-request.component';




@NgModule({
  declarations: [
    CourseApprovalComponent,
    ApproveListComponent,
    ProgramApprovalListComponent,
    TrainingApprovalReqComponent,
    EditRequestComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApprovalRoutingModule,
    ComponentsModule,
    SharedModule,
    MatStepperModule,
    ModalModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    CKEditorModule,
    AngularEditorModule
  ],
})
export class ApprovalModule {}
