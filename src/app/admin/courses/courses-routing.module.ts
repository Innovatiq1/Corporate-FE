import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCourseComponent } from './all-course/all-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { CompletionListComponent } from './completion-list/completion-list.component';
import { CreateClassComponent } from './create-class/create-class.component';
// import { ClassListComponent } from './class-list/class-list.component';
import { ViewClassComponent } from './class-list/view-class/view-class.component';
import { ViewCompletionComponent } from './completion-list/view-completion/view-completion.component';
import { CourseViewComponent } from './all-course/course-view/course-view.component';
import { CourseKitComponent } from './course-kit/course-kit.component';
import { CreateCourseKitComponent } from './course-kit/create-course-kit/create-course-kit.component';
import { CreateTemplateComponent } from './course-kit/create-template/create-template.component';
import { EditCourseKitComponent } from './course-kit/edit-course-kit/edit-course-kit.component';
import { ViewCourseKitComponent } from './course-kit/view-course-kit/view-course-kit.component';
import { ApproveListComponent } from '../approval/approve-list/approve-list.component';
import { ExamScoresComponent } from './exam-scores/exam-scores.component';
import { ActiveCoursesComponent } from './active-courses/active-courses.component';
import { InActiveCoursesComponent } from './in-active-courses/in-active-courses.component';
import { StudentPendingCoursesComponent } from './student-pending-courses/student-pending-courses.component';
const routes: Routes = [
  {
    path: 'all-courses/course',
    component: AllCourseComponent,
  },
  // {
  //   path: 'all-courses',
  //   component: AllCourseComponent,
  // },
  {
    path: 'all-courses/creator',
    component: AllCourseComponent,
  },
  {
    path: 'submitted-courses/approved-courses',
    component: ActiveCoursesComponent,
  },
  {
    path: 'submitted-courses/pending-courses',
    component: InActiveCoursesComponent,
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
  },
  {
    path: 'edit-course/:id',
    component: AddCourseComponent,
  },
  {
    path: 'view-course/:id',
    component: AddCourseComponent,
  },
  {
    path: 'edit-course',
    component: EditCourseComponent,
  },
  {
    path: 'about-course',
    component: AboutCourseComponent,
  },

  // {
  //   path:'class-list',
  //   component:ClassListComponent
  // },
  {
    path: 'create-class',
    component: CreateClassComponent,
  },
  {
    path: 'student-courses/completed-courses',
    component: CompletionListComponent,
  },
  {
    path: 'view-class/:id',
    component: ViewClassComponent,
  },
  {
    path: 'view-completion-list',
    component: ViewCompletionComponent,
  },
  {
    path: 'course-view',
    component: CourseViewComponent,
  },
  {
    path: 'course-kit',
    component: CourseKitComponent,
  },
  {
    path: 'create-course-kit',
    component: CreateCourseKitComponent,
  },
  {
    path: 'edit-course-kit/:id',
    component: EditCourseKitComponent,
  },
  {
    path: 'create-template',
    component: CreateTemplateComponent,
  },
  {
    path: 'view-course-kit/:id',
    component: ViewCourseKitComponent,
  },
  {
    path: 'student-courses/approved-courses',
    component: ApproveListComponent,
  },
  
  {
    path: 'exam-scores',
    component: ExamScoresComponent,
  },
  {
    path:'student-courses/pending-courses',
    component: StudentPendingCoursesComponent,
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
