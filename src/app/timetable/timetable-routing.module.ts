import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseTimetableComponent } from './course-timetable/course-timetable.component';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';
import { CreateProgramExamScheduleComponent } from './create-program-exam-schedule/create-program-exam-schedule.component';
import { AddComponent } from './add/add.component';
import { EditProgramExamScheduleComponent } from './edit-program-exam-schedule/edit-program-exam-schedule.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ProgramExamScheduleComponent } from './program-exam-schedule/program-exam-schedule.component';
const routes: Routes = [
    {
        path: 'course-timetable',
        component: CourseTimetableComponent
    },
    {
        path: 'program-timetable',
        component: ProgramTimetableComponent
    },
    {
        path: 'course-exam',
        component: ListComponent
      },
      {
        path: 'course-exam-add',
        component: AddComponent
      },
      {
        path: 'course-exam-edit/:id',
        component: EditComponent
      },
      {
        path: 'program-exam',
        component: ProgramExamScheduleComponent
      },
      {
        path: 'program-exam-add',
        component: CreateProgramExamScheduleComponent
      },
      {
        path: 'program-exam-edit/:id',
        component: EditProgramExamScheduleComponent
      }
    // {
    //     path: 'course-timetable/student',
    //     component: CourseTimetableComponent
    // },
    // {
    //     path: 'program-timetable/student',
    //     component: ProgramTimetableComponent
    // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule {}
