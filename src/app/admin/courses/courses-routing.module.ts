import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCourseComponent } from './all-course/all-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { CourseKitComponent } from './course-kit/course-kit.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';
import { CreateCourseKitComponent } from './course-kit/create-course-kit/create-course-kit.component';
import { EditCourseKitComponent } from './course-kit/edit-course-kit/edit-course-kit.component';
import { EditCategoriesComponent } from './categories/edit-categories/edit-categories.component';
import { CreateTemplateComponent } from './course-kit/create-template/create-template.component';
import { CompletionListComponent } from './completion-list/completion-list.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ViewCategoriesComponent } from './categories/view-categories/view-categories.component';
import { ViewClassComponent } from './class-list/view-class/view-class.component';
import { ViewCompletionComponent } from './completion-list/view-completion/view-completion.component';
import { ViewCourseKitComponent } from './course-kit/view-course-kit/view-course-kit.component';

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
  {
    path: 'course-kit',
    component: CourseKitComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'create-categories',
    component:  CreateCategoriesComponent
  },
  {
    path: 'edit-categories/:id',
    component:  EditCategoriesComponent
  },
  {
    path: 'create-course-kit',
    component: CreateCourseKitComponent
  },
  {
    path: 'edit-course-kit/:id',
    component:  EditCourseKitComponent
  },
  // {
  //   path: 'view-course-kit/:id',
  //   component:  EditCourseKitComponent
  // },
  {
    path: 'create-template',
    component: CreateTemplateComponent
  },
  {
    path:'class-list',
    component:ClassListComponent
  },
  {
    path:'create-class',
    component:CreateClassComponent
  },
  {
    path:'completion-list',
    component:CompletionListComponent
  },
  {
    path:'view-categories/:id',
    component:ViewCategoriesComponent
  },
  {
    path:'view-categories',
    component:ViewCategoriesComponent
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
    path:'view-course-kit/:id',
    component:ViewCourseKitComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
