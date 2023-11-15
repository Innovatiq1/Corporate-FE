import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseTimetableComponent } from './course-timetable/course-timetable.component';
import { ProgramTimetableComponent } from './program-timetable/program-timetable.component';
const routes: Routes = [
    {
        path: 'course-timetable',
        component: CourseTimetableComponent
    },
    {
        path: 'program-timetable',
        component: ProgramTimetableComponent
    },
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
