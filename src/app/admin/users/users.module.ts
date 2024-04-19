import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ComponentsModule } from "../../shared/components/components.module";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { UsersRoutingModule } from './users-routing.module';
import { CreateAllUsersComponent } from './create-all-users/create-all-users.component';
import { CreateUserTypeComponent } from './create-user-type/create-user-type.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateRoleTypeComponent } from './create-role-type/create-role-type.component';

@NgModule({
    declarations: [
        CreateAllUsersComponent,
        CreateUserTypeComponent,
        ViewUsersComponent,
        CreateRoleTypeComponent,
    ],
    imports: [
        CommonModule, UsersRoutingModule,
        ComponentsModule,SharedModule,OwlDateTimeModule,OwlNativeDateTimeModule
    ],
})
export class UsersModule { }
