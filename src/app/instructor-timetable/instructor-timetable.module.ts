import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorTimetableRoutingModule } from './instructor-timetable-routing.module';
import { InstructorTimetableComponent } from './instructor-timetable.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';



@NgModule({
  declarations: [
    InstructorTimetableComponent,
    ProgramTimetableComponent
  ],
  imports: [
    CommonModule,
    InstructorTimetableRoutingModule,
    CommonModule,
    //TimetableRoutingModule,
    CKEditorModule,
    ComponentsModule,
    SharedModule,
    FullCalendarModule,
  ]
})
export class InstructorTimetableModule { }
