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

const routes: Routes = [
  {
    path: 'all-courses',
    component: AllCourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },
  {
    path: 'edit-course/:id',
    component: AddCourseComponent
  },
  {
    path: 'view-course/:id',
    component: AddCourseComponent
  },
  {
    path: 'edit-course',
    component: EditCourseComponent
  },
  {
    path: 'about-course',
    component: AboutCourseComponent
  },

  // {
  //   path:'class-list',
  //   component:ClassListComponent
  // },
  {
    path:'create-class',
    component:CreateClassComponent
  },
  {
    path:'completion-list',
    component:CompletionListComponent
  },
  {
    path:'view-class/:id',
    component:ViewClassComponent
  },
  {
    path:'view-completion-list/:id',
    component:ViewCompletionComponent
  },
  {
    path:'course-view',
    component:CourseViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
