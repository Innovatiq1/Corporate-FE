import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';
import { CreateUserTypeComponent } from './create-user-type/create-user-type.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {
    path: 'create-all-users',
    component: CreateAllUsersComponent
  },
  {
    path: 'edit-all-users/:id',
    component:  CreateAllUsersComponent
  },
  {
    path: 'view-all-users/:id',
    component:  ViewUsersComponent
  },
  {
    path: 'create-user-type',
    component: CreateUserTypeComponent
  },
  {
    path: 'edit-user-type',
    component:  CreateUserTypeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { 

   
}
