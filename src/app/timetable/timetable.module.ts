import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { TimetableRoutingModule } from './timetable-routing.module';
import { CourseTimetableComponent } from './course-timetable/course-timetable.component';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddComponent } from './add/add.component';
import { CreateProgramExamScheduleComponent } from './create-program-exam-schedule/create-program-exam-schedule.component';
import { EditProgramExamScheduleComponent } from './edit-program-exam-schedule/edit-program-exam-schedule.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ProgramExamScheduleComponent } from './program-exam-schedule/program-exam-schedule.component';
import { ExamScheduleService } from './exam-schedule.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
@NgModule({
  declarations: [
    CourseTimetableComponent,
    ProgramTimetableComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    ProgramExamScheduleComponent,
    CreateProgramExamScheduleComponent,
    EditProgramExamScheduleComponent

  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule

  ],
  providers: [ExamScheduleService],

})
export class TimetableModule {}
