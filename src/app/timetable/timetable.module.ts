import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { TimetableRoutingModule } from './timetable-routing.module';
import { CourseTimetableComponent } from './course-timetable/course-timetable.component';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    CourseTimetableComponent,
    ProgramTimetableComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
    FullCalendarModule,
  ],
})
export class TimetableModule {}
