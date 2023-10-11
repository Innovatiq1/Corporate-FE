import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared';
import { ProgramKitComponent } from './program-kit/program-kit.component';
import { StudentApprovalListComponent } from './student-approval-list/student-approval-list.component';
import { ProgaramCompletionListComponent } from './progaram-completion-list/progaram-completion-list.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { CreateProgramComponent } from './create-program/create-program.component';
import { ScheduleClassComponent } from './schedule-class/schedule-class.component';
import { ProgramRoutingModule } from './program-routing.module';
import { ProgramApprovalListComponent } from './program-approval-list/program-approval-list.component';
import { ComponentsModule } from "../../shared/components/components.module";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateProgramKitComponent } from './program-kit/create-program-kit/create-program-kit.component';
import { EditProgramKitComponent } from './program-kit/edit-program-kit/edit-program-kit.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { CreateTemplateComponent } from './program-kit/create-template/create-template.component';



@NgModule({
    declarations: [
        ProgramListComponent,
        CreateProgramComponent,
        ScheduleClassComponent,
        ProgramKitComponent,
        StudentApprovalListComponent,
        ProgaramCompletionListComponent,
        ProgramApprovalListComponent,
        CreateProgramKitComponent,
        EditProgramKitComponent,
        CreateClassComponent,
        CreateTemplateComponent
         ],
    imports: [
        CommonModule,
        SharedModule,
        ModalModule.forRoot(),
        ProgramRoutingModule,
        ComponentsModule,OwlDateTimeModule,OwlNativeDateTimeModule,
        CKEditorModule,

    ]
})
export class ProgramModule { }
